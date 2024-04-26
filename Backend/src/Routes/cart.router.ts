import { Router } from "express";
import { verifyToken } from "../Middlewares/verifyToken";
import { addToCart } from "../Controllers/cart.controller";

const cartRouter = Router()

cartRouter.post('/addToCart', verifyToken, addToCart)


export default cartRouter