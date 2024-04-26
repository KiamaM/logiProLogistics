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
exports.removeFromCart = exports.addToCart = void 0;
const uuid_1 = require("uuid");
const dbHelper_1 = __importDefault(require("../dbHelpers/dbHelper"));
const dbHelper = new dbHelper_1.default;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = (0, uuid_1.v4)();
        const { productId, userId, quantity } = req.body;
        const result = (yield dbHelper.execute('addToCart', {
            cartId: cartId, productId, userId, quantity
        })).rowsAffected;
        if (result[0] < 1) {
            return res.json({
                error: 'Unable to add product to cart'
            });
        }
        else {
            return res.json({
                message: 'Product added to cart successfully'
            });
        }
    }
    catch (error) {
        return res.json({
            error: error.originalError.info.message
        });
    }
});
exports.addToCart = addToCart;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = (yield dbHelper.execute('removeFromCart', { productId: id })).rowsAffected;
    if (result[0] < 1) {
        return res.json({
            error: 'Unable to remove item from cart'
        });
    }
    else {
        return res.json({
            message: 'Item removed from cart successfully'
        });
    }
});
exports.removeFromCart = removeFromCart;
