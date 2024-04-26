"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../Middlewares/verifyToken");
const cart_controller_1 = require("../Controllers/cart.controller");
const cartRouter = (0, express_1.Router)();
cartRouter.post('/addToCart', verifyToken_1.verifyToken, cart_controller_1.addToCart);
cartRouter.delete('/removeItemFromCart/:id', verifyToken_1.verifyToken, cart_controller_1.removeFromCart);
exports.default = cartRouter;