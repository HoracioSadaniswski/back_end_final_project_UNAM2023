import productosRouter from './productosRouter.js';
import usuariosRouter from './usuariosRouter.js';
import categoriasRouter from './categoriasRouter.js';
import carritoRouter from './carritoRouter.js';

function routerApi(app) {
	app.use('/productos', productosRouter);
	app.use('/usuarios', usuariosRouter);
	app.use('/categorias', categoriasRouter);
	app.use('/carrito', carritoRouter);
}

export default routerApi;

