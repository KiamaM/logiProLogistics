import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getOneProduct } from "../Controllers/inventory.controller";
import { verifyToken } from "../Middlewares/verifyToken";


const inventoryRouter = Router()

inventoryRouter.post('/addProduct',verifyToken, addProduct)
inventoryRouter.get('/allProducts', getAllProducts)
inventoryRouter.get('/product/:id', getOneProduct)
inventoryRouter.delete('/deleteProduct/:id',verifyToken, deleteProduct)

export default inventoryRouter