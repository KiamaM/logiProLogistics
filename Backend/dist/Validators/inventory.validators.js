"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.inventoryValidator = joi_1.default.object({
    image: joi_1.default.string().required().min(10).message('Please add an image'),
    productName: joi_1.default.string().required().min(3).message('The product name cannot be less than 3 characters'),
    description: joi_1.default.string().required(),
    category: joi_1.default.string().required().min(3).message('The category cannot be less than 3 characters'),
    quantity: joi_1.default.number().required().min(1).message('Minimum quantity is 1 product'),
    currentPrice: joi_1.default.number().required().min(0).message('Price cannot be a negative number'),
    formerPrice: joi_1.default.number().required().min(0).message('Price cannot be a negative number')
});
