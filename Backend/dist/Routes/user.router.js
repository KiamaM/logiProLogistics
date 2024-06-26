"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../Controllers/users.controller");
const verifyToken_1 = require("../Middlewares/verifyToken");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', users_controller_1.registerUser);
userRouter.get('/allCustomers', verifyToken_1.verifyToken, users_controller_1.getAllCustomers);
userRouter.delete('/deactivateUser/:id', verifyToken_1.verifyToken, users_controller_1.deactivateUser);
userRouter.get('/customer/:id', verifyToken_1.verifyToken, users_controller_1.getOneCustomer);
userRouter.get('/allCouriers', verifyToken_1.verifyToken, users_controller_1.getAllCouriers);
userRouter.get('/courier/:id', verifyToken_1.verifyToken, users_controller_1.getOneCourier);
exports.default = userRouter;
