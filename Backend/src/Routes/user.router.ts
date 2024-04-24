import { Router } from "express";
import { deactivateUser, getAllCouriers, getAllCustomers, getOneCourier, getOneCustomer, registerUser } from "../Controllers/users.controller";



const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.get('/allCustomers', getAllCustomers)
userRouter.delete('/deactivateUser/:id', deactivateUser)
userRouter.get('/customer/:id', getOneCustomer)
userRouter.get('/allCouriers', getAllCouriers)
userRouter.get('/courier/:id', getOneCourier)


export default userRouter