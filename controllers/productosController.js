import Producto from '../models/producto.js';

//lista completa de productos
export async function getAllProducts (req, res) {
	try {
		const allProducts = await Producto.findAll();

		res.status(200).json(allProducts);

	} catch (error) {
		res.status(204).json({'message': error});
	}
};

//búsqueda producto por id
export async function getOneProductById (req, res) {
	try {
		let productoId = parseInt(req.params.id);
		let productoEncontrado = await Producto.findByPk(productoId);

		res.status(200).json(productoEncontrado);

	} catch (error) {
		res.status(204).json({'message': error});
	}
};

//agregar un nuevo producto
export async function saveProduct (req, res) {
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
};

//editar el parámetro de un producto por su id
export async function editProductById (req, res) {
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
};

//eliminar un producto de la db
export async function deleteProduct (req, res) {
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
};
