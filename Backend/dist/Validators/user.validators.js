"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserValidation = exports.regusterUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.regusterUserValidation = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().required().email({
        minDomainSegments: 2, tlds: {
            allow: ['com', 'ke']
        }
    }).message('Invalid email format'),
    role: joi_1.default.string(),
    phoneNumber: joi_1.default.string().required().min(10).message('Phone number should be at least 10 characters'),
    password: joi_1.default.string().required().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'"|,.<>\\/\\\\]{8,30}$'))
        .message('Password must be 8-30 characters and must contain a special character.')
});
exports.loginUserValidation = joi_1.default.object({
    email: joi_1.default.string().required().email({
        minDomainSegments: 2, tlds: {
            allow: ['com', 'ke']
        }
    }).message('Invalid email format'),
    password: joi_1.default.string().required().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'"|,.<>\\/\\\\]{8,30}$')).message('Password must be 8-30 characters and must contain a special character.')
});
