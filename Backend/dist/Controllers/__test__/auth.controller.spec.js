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
const mssql_1 = __importDefault(require("mssql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_controller_1 = require("../auth.controller");
describe('User authentication test suite', () => {
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    it('Successfully logs in a user and returns a token', () => __awaiter(void 0, void 0, void 0, function* () {
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
        };
        const req = {
            body: {
                email: expectedUser.email,
                password: expectedUser.password
            }
        };
        jest.spyOn(mssql_1.default, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockRejectedValueOnce({
                recordset: [expectedUser]
            })
        });
        jest.spyOn(bcrypt_1.default, 'compare').mockResolvedValueOnce(true);
        jest.spyOn(jsonwebtoken_1.default, 'sign').mockReturnValueOnce('generated-tokenqwertyhjs21345twfscvdfd');
        yield (0, auth_controller_1.loginUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Login success',
            token: 'generated-tokenqwertyhjs21345twfscvdfd'
        });
    }));
});
