import express, { NextFunction, Request, Response, json, request } from 'express'
import cors from 'cors'
import userRouter from './Routes/user.router'
import auth_router from './Routes/auth.router'
import inventoryRouter from './Routes/inventory.router'
import cartRouter from './Routes/cart.router'

const app = express()
app.use(json())
app.use(cors())


//App Routes
app.use('/users', userRouter)
app.use('/auth', auth_router)
app.use('/inventory', inventoryRouter)
app.use('/cart', cartRouter)



app.use((error:Error, request:Request, response:Response, next:NextFunction)=>{
    response.json({
        message:error.message
    })
})


let port = 4500

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);    
})