import express, { NextFunction, Request, Response, json, request } from 'express'
import cors from 'cors'
import userRouter from './Routes/user.router'

const app = express()
app.use(json())
app.use(cors())


//App Routes
app.use('/users', userRouter)



app.use((error:Error, request:Request, response:Response, next:NextFunction)=>{
    response.json({
        message:error.message
    })
})


let port = 4500

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);    
})