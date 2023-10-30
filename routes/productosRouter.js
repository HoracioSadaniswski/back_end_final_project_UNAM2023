import express from 'express';

const productosRouter = express.Router();

import { getAllProducts, getOneProductById, saveProduct, editProductById, deleteProduct } from '../controllers/productosController.js';

productosRouter.get('/', getAllProducts);
productosRouter.get('/:id', getOneProductById);
productosRouter.post('/', saveProduct);
productosRouter.patch('/:id', editProductById);
productosRouter.delete('/:id', deleteProduct);

export default productosRouter;

