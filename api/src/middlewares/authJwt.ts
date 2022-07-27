import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
    id: string
  }

export const verifyToken = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(403).json({ message: 'No token provided' })

        const decoded = jwt.verify(token as string,  'secret') as JwtPayload
        
        const user = await User.findById(decoded.id, { passsword: 0 })
        if (!user) return res.status(404).json({ message: 'User Not Found' })
        next();

    } catch (err) {
        return res.status(401).json({ message: 'You need to login to access this route' })
    }
};