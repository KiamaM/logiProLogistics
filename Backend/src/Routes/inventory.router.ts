import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getOneProduct } from "../Controllers/inventory.controller";


const inventoryRouter = Router()

inventoryRouter.post('/addProduct', addProduct)
inventoryRouter.get('/allProducts', getAllProducts)
inventoryRouter.get('/product/:id', getOneProduct)
inventoryRouter.delete('/deleteProduct/:id', deleteProduct)

export default inventoryRouter