import express, { NextFunction, Request, Response, json, request } from 'express'
import cors from 'cors'

const app = express()

app.use(json())
app.use(cors())



app.use((error:Error,req:Request, res:Response, next:NextFunction)=>{
    return res.json({
        message:error.message
    })
})

const port = 4600

app.listen(port, ()=>{
    console.log('Server is running...');    
})