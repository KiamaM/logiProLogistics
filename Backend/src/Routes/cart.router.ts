import { Router } from "express";
import { verifyToken } from "../Middlewares/verifyToken";
import { addToCart, removeFromCart } from "../Controllers/cart.controller";

const cartRouter = Router()

cartRouter.post('/addToCart', verifyToken, addToCart)
cartRouter.delete('/removeItemFromCart/:id', verifyToken, removeFromCart)


export default cartRouter