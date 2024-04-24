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
exports.addProduct = void 0;
const dbHelper_1 = __importDefault(require("../dbHelpers/dbHelper"));
const uuid_1 = require("uuid");
const inventory_validators_1 = require("../Validators/inventory.validators");
const dbHelper = new dbHelper_1.default;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = (0, uuid_1.v4)();
        const { image, productName, description, category, quantity, currentPrice, formerPrice } = req.body;
        const { error } = inventory_validators_1.inventoryValidator.validate(req.body);
        if (error) {
            return res.json({
                error: error.details[0].message
            });
        }
        else {
            let result = (yield dbHelper.execute('addProduct', {
                productId: productId, image, productName, description, category, quantity, currentPrice, formerPrice
            })).rowsAffected;
            if (result[0] < 1) {
                return res.json({
                    error: 'Unable to add product'
                });
            }
            else {
                return res.json({
                    message: 'Product added successfully'
                });
            }
        }
    }
    catch (error) {
        return res.json({
            error: error.originalError.info.message
        });
    }
});
exports.addProduct = addProduct;
