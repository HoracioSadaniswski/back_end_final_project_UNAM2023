import express from 'express';
import Producto from '../models/producto.js';

const router = express.Router();

//Productos
//lista completa de productos
router.get('/', async (req, res) =>{
	try {
		const allProducts = await Producto.findAll();

		res.status(200).json(allProducts);

	} catch (error) {
		res.status(204).json({'message': error});
	}
});
//Búsqueda de producto por ID
router.get('/:id', async (req, res) => {
	try {
		let productoId = parseInt(req.params.id);
		let productoEncontrado = await Producto.findByPk(productoId);

		res.status(200).json(productoEncontrado);

	} catch (error) {
		res.status(204).json({'message': error});
	}
});
//agregar un nuevo producto
router.post('/', (req, res) => {
	try {
		let bodyTemp = '';

		req.on('data', (chunk) => {
			bodyTemp += chunk.toString();
		});

		req.on('end', async () => {
			const data = JSON.parse(bodyTemp);
			req.body = data;
			const productSave = new Producto(req.body);
			await productSave.save();
		});

		res.status(201).json({'message': 'success"'});

	} catch (error) {
		res.status(204).json({'message': 'error'});
	}
});
// modificar parámetro de un producto por su id
router.patch('/:id', async (req, res) => {
	let idProductoAEditar = parseInt(req.params.id);
	let productoAActualizar = await Producto.findByPk(idProductoAEditar);

	if (!productoAActualizar) {
		res.status(204).json({'message':'Producto no encontrado'});
	}

	let bodyTemp = '';

	req.on('data', (chunk) => {
		bodyTemp += chunk.toString();
	});

	req.on('end', async () => {
		const data = JSON.parse(bodyTemp);
		req.body = data;

		await productoAActualizar.update(req.body);

		res.status(200).send('Producto actualizado');;
	});
});
// eliminar un producto por su id
router.delete('/:id', async (req, res) => {
	let idProductoABorrar = parseInt(req.params.id);
	let productoABorrar = await Producto.findByPk(idProductoABorrar);

	if (!productoABorrar){
		res.status(204).json({'message':'Producto no encontrado'});
	};

	try {
		await productoABorrar.destroy();
		res.status(200).json({'message': 'success'});

	} catch (error) {
		res.status(204).json({'message': 'error'});
	}
});

export default router;

