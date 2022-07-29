import { Router } from "express";
import Product from "../models/Product"
import { Request, Response} from "express";

const route= Router()




// ********* GET products *********
route.get("/",async(req:Request,res:Response)=>{
    try {
        const AllProducts=await Product.find()
        res.status(200).json(AllProducts)
    } catch (error) {
        res.status(404).json({message:"No products found"})
    }
})

// ********* GET product by id *********
route.get("/:id",async(req:Request,res:Response)=>{
    try {
        const product=await Product.findById(req.params.id)
        if(product)res.status(200).json(product)
        else res.status(404).json({message:'Product not found'})
    } catch (error) {
        res.status(404).json({message:'Product not found'})
    }
})

// ********* POST product *********
route.post("/",async(req:Request,res:Response)=>{
    try {
        const {name,description,price,image_url}=req.body
        const newProduct=new Product({name,description,price,image_url})
        await newProduct.save()
        res.status(200).json("Product created successfully")
    } catch (error) {
        res.status(404).json({message:"Product could not be created"})
    }
})

// ********* PUT product *********
route.put("/:id",async(req:Request,res:Response)=>{
    try {
        const {name,description,price,image_url}=req.body
        await Product.findByIdAndUpdate(req.params.id,{name,description,price,image_url})
        const modifiedProduct=await Product.findById(req.params.id)
        res.status(200).json(modifiedProduct)
    } catch (error) {
        res.status(404).json({message:"Product could not be modified"})
    }
})

// ********* DELETE product *********
route.delete("/:id",async(req:Request,res:Response)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Product deleted successfully"})
    } catch (error) {
        res.status(404).json({message:"Product could not be deleted"})
    }
})

export default route