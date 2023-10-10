const productosRouter = require('./productosRouter');
const usuariosRouter = require('./usuariosRouter');


function routerApi(app) {
	app.use('/productos', productosRouter);
	app.use('/usuarios', usuariosRouter);
}

module.exports = routerApi;
