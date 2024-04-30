import { Request, Response } from "express";
import { v4 } from "uuid";
import Connection from "../dbHelpers/dbHelper";

const dbHelper = new Connection


export const addToCart = async(req:Request, res:Response)=>{
    try {
        const cartId = v4()

        const{productId,userId, quantity}= req.body
    
        const result = (await dbHelper.execute('addToCart', {
            cartId:cartId,productId,userId, quantity
        })).rowsAffected
    
        if(result[0]< 1){
            return res.json({
                error:'Unable to add product to cart'
            })
        }else{
            return res.json({
                message:'Product added to cart successfully'
            })
        }      

    } catch (error:any) {
        return res.json({
            error:error.originalError.info.message
        })
    }
}


export const removeFromCart = async(req:Request, res:Response)=>{
    const id = req.params.id

    const result = (await dbHelper.execute('removeFromCart',{productId:id})).rowsAffected

    if(result[0]<1){
        return res.json({
            error:'Unable to remove item from cart'
        })
    }else{
        return res.json({
            message:'Item removed from cart successfully'
        })
    }
}



export const itemsInCart = async(req:Request, res:Response)=>{
    try {
        const{userId}=req.body

        const cartItems = ((await dbHelper.execute('itemsInCart', {userId})).recordset)

        console.log(cartItems[0].quantity);
        

        return res.json({
            cartItems:cartItems
        })
        
    } catch (error:any) {
        return res.json({
            error:error.originalError.info.message
        })
    }
}