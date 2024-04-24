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
exports.deactivateUser = exports.getOneCourier = exports.getAllCouriers = exports.getOneCustomer = exports.getAllCustomers = exports.registerUser = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_validators_1 = require("../Validators/user.validators");
const dbHelper_1 = __importDefault(require("../dbHelpers/dbHelper"));
const dbhelper = new dbHelper_1.default;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, uuid_1.v4)();
        const { firstName, lastName, email, role, phoneNumber, password } = req.body;
        const { error } = user_validators_1.regusterUserValidation.validate(req.body);
        if (error) {
            return res.json({
                error: error.details[0].message
            });
        }
        const hashedPwd = yield bcrypt_1.default.hash(password, 5);
        let result = yield dbhelper.execute('registerUser', {
            userId: userId, firstName, lastName, email, role, phoneNumber, hashedPwd
        });
        if (result.rowsAffected[0] < 1) {
            return res.json({
                error: 'Account creation failed'
            });
        }
        else {
            return res.json({
                message: 'Account created successfully'
            });
        }
    }
    catch (error) {
        return res.json({
            error: error.originalError.info.message
        });
    }
});
exports.registerUser = registerUser;
//  Customer controllers
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let customers = (yield dbhelper.execute('getAllCustomers')).recordset;
        return res.json({
            customers: customers
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.getAllCustomers = getAllCustomers;
const getOneCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let customer = (yield dbhelper.execute('getOneCustomer', { userId: id })).recordset;
        return res.json({
            customer: customer
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.getOneCustomer = getOneCustomer;
//Courier controllers
const getAllCouriers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courier = (yield dbhelper.execute('getAllCouriers')).recordset;
        return res.json({
            courier: courier
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.getAllCouriers = getAllCouriers;
const getOneCourier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let courier = (yield dbhelper.execute('getOneCourier', { userId: id })).recordset;
        return res.json({
            courier: courier
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.getOneCourier = getOneCourier;
const deactivateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = (yield dbhelper.execute('deactivateUser', { userId: id })).rowsAffected;
        if (result[0] < 1) {
            return res.json({
                error: 'Could not deactivate user'
            });
        }
        else {
            return res.json({
                message: 'Account deactivated successfully'
            });
        }
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.deactivateUser = deactivateUser;
