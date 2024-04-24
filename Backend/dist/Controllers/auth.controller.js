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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserDetails = exports.loginUser = void 0;
const user_validators_1 = require("../Validators/user.validators");
const dbHelper_1 = __importDefault(require("../dbHelpers/dbHelper"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbHelper = new dbHelper_1.default;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        console.log(req.body);
        let { error } = user_validators_1.loginUserValidation.validate(req.body);
        if (error) {
            return res.json({
                error: error.details[0].message
            });
        }
        let user = (yield dbHelper.execute('login', { email })).recordset;
        console.log(user);
        if (((_a = user[0]) === null || _a === void 0 ? void 0 : _a.email) == email) {
            const correctPwd = yield bcrypt_1.default.compare(password, user[0].password);
            console.log(user[0].password);
            console.log(password);
            console.log(correctPwd);
            if (!correctPwd) {
                return res.json({
                    error: 'Incorrect password'
                });
            }
            else {
                const loginCredentials = user.map((response) => {
                    const { isDeleted, isWelcomed, password } = response, rest = __rest(response, ["isDeleted", "isWelcomed", "password"]);
                    return rest;
                });
                const token = jsonwebtoken_1.default.sign(loginCredentials[0], process.env['SECRET'], {
                    expiresIn: '3d'
                });
                return res.json({
                    message: 'Login success',
                    token
                });
            }
        }
        else {
            console.log('Hi');
            return res.json({
                error: 'User not found'
            });
        }
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.loginUser = loginUser;
const checkUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        return res.json({
            info: req.info
        });
    }
});
exports.checkUserDetails = checkUserDetails;
