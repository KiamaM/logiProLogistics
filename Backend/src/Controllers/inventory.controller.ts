import { Request, Response } from "express";
import Connection from "../dbHelpers/dbHelper";
import {v4} from 'uuid'
import { inventoryValidator } from "../Validators/inventory.validators";


const dbHelper = new Connection

export const addProduct = async(req:Request, res:Response)=>{
    try {
        const productId = v4()

        const{image, productName, description, category, quantity, currentPrice, formerPrice} = req.body
    
        const{error} = inventoryValidator.validate(req.body)
    
        if(error){
            return res.json({
                error:error.details[0].message
            })
        }else{
            let result = (await dbHelper.execute('addProduct', {
                productId:productId,image, productName, description, category, quantity, currentPrice, formerPrice 
            })).rowsAffected
    
            if(result[0] < 1){
                return res.json({
                    error: 'Unable to add product'
                })
            }else{
                return res.json({
                    message:'Product added successfully'
                })
            }
    
        }
        
    } catch (error:any) {
        return res.json({
            error:error.originalError.info.message
        })
    }

}