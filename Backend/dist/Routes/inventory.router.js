"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_controller_1 = require("../Controllers/inventory.controller");
const inventoryRouter = (0, express_1.Router)();
inventoryRouter.post('/addProduct', inventory_controller_1.addProduct);
exports.default = inventoryRouter;
