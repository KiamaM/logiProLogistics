import { Request, Response } from "express";
import {v4} from 'uuid'
import bcrypt from 'bcrypt'
import { regusterUserValidation } from "../Validators/user.validators";
import Connection from "../dbHelpers/dbHelper";

const dbhelper = new Connection


export const registerUser = async(req:Request, res:Response)=>{
    try {
        const userId = v4()

        const{firstName,lastName, email,role, phoneNumber, password } = req.body  
        
        const{error} = regusterUserValidation.validate(req.body)

    
        if(error){
            return res.json({
                error:error.details[0].message
            })
        }

        const hashedPwd = await  bcrypt.hash(password, 5) 

        let result = await dbhelper.execute('registerUser',{
           userId:userId, firstName,lastName, email, role, phoneNumber, hashedPwd 
        })

        if(result.rowsAffected[0] < 1){
            return res.json({
                error:'Account creation failed'
                })
        }else{
            return res.json({
                message: 'Account created successfully'
            })
        }
    
        
    } catch (error:any) {
        return res.json({
            error:error.originalError.info.message
        })
    }

}

