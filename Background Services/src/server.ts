import express, { NextFunction, Request, Response, json, request } from 'express'
import nodecron from 'node-cron'
import { welcomeUser } from './MailServices/welcomeUser'

const app = express()


const run = async()=>{
    nodecron.schedule('*/5 * * * * *', async()=>{
        console.log('checking for a new user');
        
        await welcomeUser()
    })
    
}

run()

const port = 4600

app.listen(port, ()=>{
    console.log('Server is running...');    
})