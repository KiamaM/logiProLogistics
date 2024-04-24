import { Router } from "express";
import { checkUserDetails, loginUser } from "../Controllers/auth.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const auth_router = Router()

auth_router.post('/login', loginUser)
auth_router.get('/checkUserDetails',verifyToken, checkUserDetails)

export default auth_router