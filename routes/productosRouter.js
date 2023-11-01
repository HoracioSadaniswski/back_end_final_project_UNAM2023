import express from 'express';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';
const productosRouter = express.Router();

import { getAllProducts, getOneProductById, getProductsStock, saveProduct, editProductById, editProductStockById, deleteProduct } from '../controllers/productosController.js';

productosRouter.get('/', getAllProducts);
productosRouter.get('/total-stock', tokenAuthentication, getProductsStock);
productosRouter.get('/:id', getOneProductById);
productosRouter.post('/', tokenAuthentication, saveProduct);
productosRouter.patch('/stock/:id', tokenAuthentication, editProductStockById);
productosRouter.patch('/:id', tokenAuthentication, editProductById);
productosRouter.delete('/:id', tokenAuthentication, deleteProduct);

export default productosRouter;

