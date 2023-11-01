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

// Obtencón cantidad stock productos
export async function getProductsStock(req, res) {
	if (req.nivelUsuario == 1) {
		return res.status(401).json({'message':'Debes ser Administrador para realizar esta acción'});
	} else {
		try {
			const productos = await Producto.findAll({
				attributes: ['id', 'nombre', 'stock'],
			});

			res.status(200).json(productos);
		} catch (error) {
			console.error('Error al obtener la información:', error);
			res.status(500).json({ error: 'Error al obtener la información de los productos' });
		}
	};
};

//agregar un nuevo producto (solo administradores)
export async function saveProduct (req, res) {
	if (req.nivelUsuario !== 3) {
		return res.status(401).json({'message':'Debes ser Administrador para realizar esta acción'});
	} else {
		try {
			//datos.productos.push(req.body)
			const productSave = new Producto(req.body);
			//guardado nuevo producto
			await productSave.save();

			res.status(201).json({'message': 'success'});

		} catch (error) {
			res.status(204).json({'message': 'error'});
		};
	};
};

//editar el parámetro de un producto por su id (solo administradores)
export async function editProductById (req, res) {
	if (req.nivelUsuario !== 3) {
		return res.status(401).json({'message':'Debes ser Administrador para realizar esta acción'});
	} else {
		let idProductoAEditar = parseInt(req.params.id);
		let productoAActualizar = await Producto.findByPk(idProductoAEditar);

		if (!productoAActualizar) {
			res.status(204).json({'message':'Producto no encontrado'});
		}
		await productoAActualizar.update(req.body);

		res.status(200).send('Producto actualizado');;
	};
};

//editar stock de un producto por su id
export async function editProductStockById(req, res) {
	if (req.nivelUsuario == 1) {
		return res.status(401).json({ message: 'Debes ser Administrador para realizar esta acción' });
	}

	const idProductoAEditar = parseInt(req.params.id);
	const nuevoStock = req.body.stock;

	try {
		const productoAActualizar = await Producto.findByPk(idProductoAEditar);

		if (!productoAActualizar) {
			return res.status(404).json({ message: 'Producto no encontrado' });
		}

		await productoAActualizar.update({ stock: nuevoStock });

		return res.status(200).json({ message: 'Stock del producto actualizado' });
	} catch (error) {
		console.error('Error al actualizar el stock del producto:', error);
		return res.status(500).json({ error: 'Error al actualizar el stock del producto' });
	}
};


//eliminar un producto de la db (solo administradores)
export async function deleteProduct (req, res) {
	if (req.nivelUsuario !== 3) {
		return res.status(401).json({'message':'Debes ser Administrador para realizar esta acción'});
	} else {
		let idProductoABorrar = parseInt(req.params.id);
		let productoABorrar = await Producto.findByPk(idProductoABorrar);

		if (!productoABorrar){
			res.status(204).json({'message':'Producto no encontrado'});
		};

		try {
			await productoABorrar.destroy();
			res.status(200).json({'message': 'Producto eliminado de la base de datos'});

		} catch (error) {
			res.status(204).json({'message': 'error'});
		}
	}
};
