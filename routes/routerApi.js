import productosRouter from './productosRouter.js';
import usuariosRouter from './usuariosRouter.js';

function routerApi(app) {
	app.use('/productos', productosRouter);
	app.use('/usuarios', usuariosRouter);
}

export default routerApi;

