import mssql from 'mssql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { loginUser } from '../auth.controller'
import { Request } from 'express'
import { assert } from 'joi'


describe('User authentication test suite', ()=>{


    let res:any

    beforeEach(()=>{
        res={
            status:jest.fn().mockReturnThis(),
            json:jest.fn().mockReturnThis()
        }
    })

it('Successfully logs in a user and returns a token',
    async()=>{
        let expectedUser = {
            userId: "85d9b39d-75b6-4496-a9ed-39960469606d",
            firstName: "John",
            lastName: "Doe",
            email: "muriithikiamad1+456@gmail.com",
            role: "customer",
            phoneNumber: "03655644567",
            password: "$2b$05$QH29qQBf.HtOM1x8m6GE..rTfd631CyK.v5kAuNzBRkt5KOgeoszK",
            isWelcomed: false,
            isDeleted: false,
            registerDate: "2024-05-07T00:00:00.000Z"
        }
    
        const req = {
            body:{
                email:expectedUser.email,
                password:expectedUser.password
            }
        }
    
        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input:jest.fn().mockReturnThis(),
            execute:jest.fn().mockRejectedValueOnce({
                recordset:[expectedUser]
            })
        }as never)
    
        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never)
    
        jest.spyOn(jwt, 'sign').mockReturnValueOnce('generated-tokenqwertyhjs21345twfscvdfd' as never)
    
        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({
            message:'Login success',
            token:'generated-tokenqwertyhjs21345twfscvdfd'
        })
    }
)


})