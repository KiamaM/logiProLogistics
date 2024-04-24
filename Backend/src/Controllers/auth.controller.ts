import { NextFunction, Request, Response, } from "express"
import { loginUserValidation } from "../Validators/user.validators"
import Connection from "../dbHelpers/dbHelper"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { extendedUserRequest } from "../Middlewares/verifyToken"

const dbHelper = new Connection


export const loginUser = async(req:Request, res:Response)=>{
    try {

        const {email, password} = req.body

        console.log(req.body);
        
        

        let{error} = loginUserValidation.validate(req.body)

        if(error){
            return res.json({
                error:error.details[0].message
            })
        }

        let user = (await dbHelper.execute('login', {email})).recordset
        
        console.log(user);
        


        if(user[0]?.email == email){
            const correctPwd = await bcrypt.compare(password, user[0].password)
            
            console.log(user[0].password);
            
            console.log(password);
            console.log(correctPwd);
            
            
            if(!correctPwd){
                return res.json({
                    error:'Incorrect password'
                })
            }else{
                const loginCredentials = user.map((response:any)=>{
                    const{isDeleted, isWelcomed,password, ...rest} = response

                    return rest
                })

                const token = jwt.sign(loginCredentials[0], process.env['SECRET'] as string, {
                    expiresIn:'3d'
                })

                return res.json({
                    message:'Login success',
                    token
                })
            }
        }else{
            console.log('Hi');
            
            return res.json({
                error:'User not found'
            })
        }
        
    } catch (error) {
        return  res.json({
            error:error
        })      
    }
}



export const checkUserDetails = async(req:extendedUserRequest,res:Response, next:NextFunction )=>{
    if(req.info){
        return res.json({
            info:req.info
        })
    }
}