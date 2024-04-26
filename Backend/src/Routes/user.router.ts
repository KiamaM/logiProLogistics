import { Router } from "express";
import { deactivateUser, getAllCouriers, getAllCustomers, getOneCourier, getOneCustomer, registerUser } from "../Controllers/users.controller";
import { verifyToken } from "../Middlewares/verifyToken";



const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.get('/allCustomers',verifyToken, getAllCustomers)
userRouter.delete('/deactivateUser/:id',verifyToken, deactivateUser)
userRouter.get('/customer/:id',verifyToken, getOneCustomer)
userRouter.get('/allCouriers',verifyToken, getAllCouriers)
userRouter.get('/courier/:id',verifyToken, getOneCourier)


export default userRouter