import { loginUserDetails } from "../Interfaces/user.interface";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'




export interface extendedUserRequest extends Request{
    info?:loginUserDetails
}



export const verifyToken = async(req:extendedUserRequest, res:Response, next:NextFunction)=>{
    try {
        const token = req.headers['token'] as string

        if(!token){
            return res.json({
                error:'You do not have access. Kindly login'
            })
        }else{
            const data = jwt.verify(token, process.env.SECRET as string) as loginUserDetails

            req.info = data



        }
        
    } catch (error) {
        return res.json({
            error:error
        })
    }

    next()
}

