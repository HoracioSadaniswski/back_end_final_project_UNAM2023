import productosRouter from './productosRouter.js';
import usuariosRouter from './usuariosRouter.js';
import categoriasRouter from './categoriasRouter.js';
import carritoRouter from './carritoRouter.js';
import ventaRouter from './ventasRouter.js';

function routerApi(app) {
	app.use('/productos', productosRouter);
	app.use('/usuarios', usuariosRouter);
	app.use('/categorias', categoriasRouter);
	app.use('/carrito', carritoRouter);
	app.use('/ventas', ventaRouter);
}

export default routerApi;

