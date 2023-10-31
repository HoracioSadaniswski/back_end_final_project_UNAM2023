import express from 'express';
import { createVenta } from '../controllers/ventasController.js';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';

const ventaRouter = express.Router();


ventaRouter.post('/:usuario_id', tokenAuthentication, createVenta);

export default ventaRouter;
