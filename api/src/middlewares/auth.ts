import User from '../models/User';
import jwt from 'jsonwebtoken';
var bcrypt = require('bcryptjs');
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';

dotenv.config();

const encryptPassword = async (password:string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt);
}


const comparePasswords = async (receivedPassword:string, savedPassword:string) => {
    return await bcrypt.compare(receivedPassword, savedPassword)
}

export const signUp = async (req:Request, res:Response, next:NextFunction) => {
    const { username, password } = req.body

    try {
        const found = await User.find({ username });
        if (found.length > 0) {
            res.send('There is an account already created with this username')
        } else {

            const user=new User({ username, password: await encryptPassword(password) });
            await user.save()
            res.json({message:"Successfully registered"})
        }
    } catch (err) {
        next(err)
    }
};



export const logIn = async (req:Request, res:Response) => {
    try {
        const { username,password } = req.body
        const found = await User.findOne({ username })

        if(!found)return res.json({message:"User not found"})

        const match=await comparePasswords(password,found!.password)

        if(!match){
            res.json({message: 'Passwords do not match'});
        }
        else{
            const token = jwt.sign({ id: found!._id },`${process.env.JWT_SECRET}`, { expiresIn: 86400 })
            return res.json({ user : found, token });
        }
    } catch (error) {
        res.status(404).json({message:error})
    }
    
}