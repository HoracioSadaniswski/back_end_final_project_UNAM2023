import express from 'express';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';
const carritoRouter = express.Router();

import { addProductToCart, contentToCartById, deleteProductToCart } from '../controllers/carritoController.js';

carritoRouter.get('/:id', tokenAuthentication, contentToCartById);
carritoRouter.post('/:id', tokenAuthentication, addProductToCart);
carritoRouter.delete('/:usuario_id/:producto_id', tokenAuthentication, deleteProductToCart);



export default carritoRouter;
