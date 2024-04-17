"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../Controllers/users.controller");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', users_controller_1.registerUser);
exports.default = userRouter;
