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
exports.deleteProduct = exports.getOneProduct = exports.getAllProducts = exports.addProduct = void 0;
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
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products = (yield dbHelper.execute('getAllProducts')).recordset;
        return res.json({
            products: products
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.getAllProducts = getAllProducts;
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let product = (yield dbHelper.execute('getOneProduct', { productId: id })).recordset;
        return res.json({
            product: product
        });
    }
    catch (error) {
        return res.json({
            error: error.originalError.message
        });
    }
});
exports.getOneProduct = getOneProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = (yield dbHelper.execute('deleteProduct', { productId: id })).rowsAffected;
        if (result[0] < 1) {
            return res.json({
                error: 'Could not delete product'
            });
        }
        else {
            return res.json({
                message: 'Product deleted successfully'
            });
        }
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.deleteProduct = deleteProduct;
