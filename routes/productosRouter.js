const express = require ('express');
const datos = require('../datos.json');

const router = express.Router();

//lista de productos
router.get('/', (req, res) =>{
	try {
		let allProducts = datos.productos;

		res.status(200).json(allProducts);

	} catch (error) {
		res.status(204).json({'message': error});
	}
});
// devuelve un producto específico por id
router.get('/:id', (req, res) => {
	try {
		let productoId = parseInt(req.params.id);
		let productoEncontrado = datos.productos.find((producto) => producto.id === productoId);

		res.status(200).json(productoEncontrado);

	} catch (error) {
		res.status(204).json({'message': error});
	}
});
// agregar un producto nuevo
router.post('/', (req, res) => {
	try {
		let bodyTemp = '';

		req.on('data', (chunk) => {
			bodyTemp += chunk.toString();
		});

		req.on('end', () => {
			const data = JSON.parse(bodyTemp);
			req.body = data;
			datos.productos.push(req.body);
		});

		res.status(201).json({'message': 'success'});

	} catch (error) {
		res.status(204).json({'message': 'error'});
	}
});
// modificar un producto
router.patch('/:id', (req, res) => {
	let idProductoAEditar = parseInt(req.params.id);
	let productoAActualizar = datos.productos.find((producto) => producto.id === idProductoAEditar);

	if (!productoAActualizar) {
		res.status(204).json({'message':'Producto no encontrado'});
	}

	let bodyTemp = '';

	req.on('data', (chunk) => {
		bodyTemp += chunk.toString();
	});

	req.on('end', () => {
		const data = JSON.parse(bodyTemp);
		req.body = data;

		if(data.nombre){
			productoAActualizar.nombre = data.nombre;
		}

		if (data.tipo){
			productoAActualizar.tipo = data.tipo;
		}

		if (data.precio){
			productoAActualizar.precio = data.precio;
		}

		res.status(200).send('Producto actualizado');
	});
});
// eliminar un producto específico
router.delete('/:id', (req, res) => {
	let idProductoABorrar = parseInt(req.params.id);
	let productoABorrar = datos.productos.find((producto) => producto.id === idProductoABorrar);

	if (!productoABorrar){
		res.status(204).json({'message':'Producto no encontrado'});
	}

	let indiceProductoABorrar = datos.productos.indexOf(productoABorrar);
	try {
		datos.productos.splice(indiceProductoABorrar, 1);
		res.status(200).json({'message': 'success'});

	} catch (error) {
		res.status(204).json({'message': 'error'});
	}
});

module.exports = router;
