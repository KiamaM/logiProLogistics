"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mssql_1 = __importDefault(require("mssql"));
const users_controller_1 = require("../users.controller");
describe('User registration test suite', () => {
    //Arranging 
    //The function has a request and a response as its arguments. 
    //We start by defining them
    let res;
    //Make the response chainable
    //define json for the responses in res.json return
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    //Our test cases
    it('Registers a user successfully', 
    //The create user function is asynchronous in nature
    () => __awaiter(void 0, void 0, void 0, function* () {
        //Define the request body
        const req = {
            body: {
                firstName: "David",
                lastName: "Doe",
                email: "djj@mail.com",
                phoneNumber: "03655644567",
                password: "password12344"
            }
        };
        jest.spyOn(bcrypt_1.default, 'hash').mockResolvedValueOnce('hashedpwdwertyuidfghjjgh');
        //Chained inputs since we aren't using db helpers
        const mockedInput = jest.fn().mockReturnThis();
        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
        const mockedDbRequest = {
            input: mockedInput,
            execute: mockedExecute
        };
        const mockedPool = {
            req: jest.fn().mockReturnValue(mockedDbRequest)
        };
        jest.spyOn(mssql_1.default, 'connect').mockResolvedValue(mockedPool);
        //Call the function in our Act stage of testing
        yield (0, users_controller_1.registerUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            message: "Account created successfully"
        });
    }));
});
