import { Router } from "express";
import { addProduct } from "../Controllers/inventory.controller";


const inventoryRouter = Router()

inventoryRouter.post('/addProduct', addProduct)

export default inventoryRouter