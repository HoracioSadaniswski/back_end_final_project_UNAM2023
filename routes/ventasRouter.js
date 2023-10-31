import express from 'express';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';

const ventaRouter = express.Router();

import { listSalesByUserId, createVenta, deleteVentaById } from '../controllers/ventasController.js';

ventaRouter.get('/:usuario_id', tokenAuthentication, listSalesByUserId);
ventaRouter.post('/:usuario_id', tokenAuthentication, createVenta);
ventaRouter.delete('/:usuario_id/:venta_id', tokenAuthentication, deleteVentaById);

export default ventaRouter;
