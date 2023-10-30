import express from 'express';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';
const productosRouter = express.Router();

import { getAllProducts, getOneProductById, saveProduct, editProductById, deleteProduct } from '../controllers/productosController.js';

productosRouter.get('/', getAllProducts);
productosRouter.get('/:id', getOneProductById);
productosRouter.post('/', tokenAuthentication, saveProduct);
productosRouter.patch('/:id', tokenAuthentication, editProductById);
productosRouter.delete('/:id', tokenAuthentication, deleteProduct);

export default productosRouter;

