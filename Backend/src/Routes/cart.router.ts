import { Router } from "express";
import { verifyToken } from "../Middlewares/verifyToken";
import { addToCart, itemsInCart, removeFromCart } from "../Controllers/cart.controller";

const cartRouter = Router()

cartRouter.post('/addToCart', verifyToken, addToCart)
cartRouter.delete('/removeItemFromCart/:id', verifyToken, removeFromCart)
cartRouter.get('/cartItems',verifyToken, itemsInCart)


export default cartRouter