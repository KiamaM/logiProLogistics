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


//  Customer controllers


export const getAllCustomers = async(req:Request, res:Response)=>{

    try {

        let customers = (await dbhelper.execute('getAllCustomers')).recordset

        return res.json({
            customers:customers
        })
        
    } catch (error:any) {
        return res.json({
            error:error.originalError.message
        })
    }
     
}


export const getOneCustomer = async(req:Request, res:Response)=>{
    try {

    const id = req.params.id;

    let customer = (await dbhelper.execute('getOneCustomer', {userId:id})).recordset


    return res.json({
        customer:customer
    })
        
    } catch (error:any) {
        return res.json({
            error:error.originalError.message
        })
    }

}



//Courier controllers
export const getAllCouriers = async(req:Request, res:Response)=>{

    try {

        let courier = (await dbhelper.execute('getAllCouriers')).recordset

        return res.json({
            courier:courier
        })
        
    } catch (error:any) {
        return res.json({
            error:error.originalError.message
        })
    }
     
}


export const getOneCourier = async(req:Request, res:Response)=>{
    try {

    const id = req.params.id;

    let courier = (await dbhelper.execute('getOneCourier', {userId:id})).recordset


    return res.json({
        courier:courier
    })
        
    } catch (error:any) {
        return res.json({
            error:error.originalError.message
        })
    }

}



export const deactivateUser = async(req:Request, res:Response)=>{
    try {

        const id = req.params.id

        const result = (await dbhelper.execute('deactivateUser', {userId:id})).rowsAffected

        if(result[0] <1){
            return res.json({
                error:'Could not deactivate user'
            })
        }else{
            return res.json({
                message:'Account deactivated successfully'
            })
        }
        
    } catch (error) {
        return res.json({
            error:error
        })
    }
}



