import bcrypt from 'bcrypt'
import mssql from 'mssql'
import { registerUser } from '../users.controller'
describe('User registration test suite', ()=>{
    //Arranging 
    //The function has a request and a response as its arguments. 
    //We start by defining them

    let res:any

    //Make the response chainable
    //define json for the responses in res.json return

    beforeEach(()=>{
        res={
            status:jest.fn().mockReturnThis(),
            json:jest.fn().mockReturnThis()
        }
    })

    //Our test cases
    it('Registers a user successfully', 
        //The create user function is asynchronous in nature
        async()=>{
            //Define the request body
            const req={
                body:{
                    firstName:"David",
                    lastName:"Doe",
                    email:"djj@mail.com" ,
                    phoneNumber:"03655644567",
                    password:"password12344"
                }
            }

            jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedpwdwertyuidfghjjgh' as never)

            //Chained inputs since we aren't using db helpers
            const mockedInput = jest.fn().mockReturnThis()

            const mockedExecute = jest.fn().mockResolvedValue({rowsAffected:[1]})

            const mockedDbRequest = {
                input:mockedInput,
                execute:mockedExecute
            }

            const mockedPool = {
                req:jest.fn().mockReturnValue(mockedDbRequest)
            }

            jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

            //Call the function in our Act stage of testing
            await registerUser(req as any, res)

            expect(res.json).toHaveBeenCalledWith({
                message:"Account created successfully"
            })

        }
    )
})

