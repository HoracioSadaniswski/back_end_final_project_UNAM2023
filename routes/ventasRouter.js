import express from 'express';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';

const ventaRouter = express.Router();

import { listAllSales, listSalesByUserId, createVenta, deleteVentaById } from '../controllers/ventasController.js';

ventaRouter.get('/all', tokenAuthentication, listAllSales);
ventaRouter.get('/:usuario_id', tokenAuthentication, listSalesByUserId);
ventaRouter.post('/:usuario_id', tokenAuthentication, createVenta);
ventaRouter.delete('/:usuario_id/:venta_id', tokenAuthentication, deleteVentaById);

export default ventaRouter;
