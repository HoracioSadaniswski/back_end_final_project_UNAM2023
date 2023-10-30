import express from 'express';
//import tokenAuthentication from '../middlewares/tokenAuthentication.js';
const carritoRouter = express.Router();

import { addProductToCart, contentToCartById } from '../controllers/carritoController.js';

carritoRouter.get('/:id', contentToCartById);
carritoRouter.post('/:id', addProductToCart);



export default carritoRouter;
