import {Router} from "express";
import products from "./products"

const route=Router() ;

route.use("/products", products)
 
export default route