import {Router} from "express";
import { logIn, signUp } from "../middlewares/auth";
import products from "./products"

const route=Router() ;

route.use("/products", products) 
route.post('/signup', signUp); 
route.post('/login', logIn);
export default route