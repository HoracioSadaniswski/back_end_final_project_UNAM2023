import Carrito from '../models/carrito.js';
import Usuario from '../models/usuario.js';
import Producto from '../models/producto.js';

// ver contenido del carrito de un usuario
export async function contentToCartById (req, res) {
	const userId = req.params.id;

	try {
		// Verificar si el usuario existe
		const usuario = await Usuario.findByPk(userId);

		if (!usuario) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		//consulta del carrito
		const carrito = await Carrito.findAll({
			where: {
				cliente_id: userId // Utiliza cliente_id en lugar de usuario_id
			},
			include: {
				model: Producto,
				attributes: [
					'nombre',
					'precio',
				],
				required: false,
			},
		});

		res.json(carrito);
	} catch (error) {
		console.error('Error al obtener el contenido del carrito:', error);
		res.status(500).json({ error: 'Error al obtener el contenido del carrito' });
	}
};

// Agregar productos al carrito de un usuario
export async function addProductToCart(req, res) {
	try {
		const usuario_id  = req.params.id;
		const producto_id = parseInt(req.body.producto_id); // Convertir a número entero
		const cantidad = parseInt(req.body.cantidad); // Convertir a número entero

		// Paso 1: Verificar si el usuario existe en la base de datos
		const usuario = await Usuario.findByPk(usuario_id);
		if (!usuario) {
			return res.status(404).json({ message: 'Usuario no encontrado' });
		}

		// Paso 2: Verificar si el producto existe en la base de datos
		const producto = await Producto.findByPk(producto_id);
		if (!producto) {
			return res.status(404).json({ message: 'Producto no encontrado' });
		}

		// Paso 3: Verificar si el producto ya está en el carrito del usuario
		const carritoExistente = await Carrito.findOne({
			where: {
				cliente_id: usuario_id,
				producto_id: producto_id,
			}
		});

		if (carritoExistente) {
			// Si el producto ya está en el carrito, actualiza la cantidad
			carritoExistente.cantidad += cantidad;
			await carritoExistente.save();
		} else {
			// Si el producto no está en el carrito, crea un nuevo registro en el carrito
			await Carrito.create({
				cliente_id: usuario_id,
				producto_id: producto_id,
				cantidad: cantidad,
			});
		}

		res.status(201).json({ message: 'Producto agregado al carrito' });
	} catch (error) {
		res.status(500).json({ message: 'Error al agregar producto al carrito' });
	}
};






