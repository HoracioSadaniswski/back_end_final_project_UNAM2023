import Carrito from '../models/carrito.js';
import Usuario from '../models/usuario.js';
import Producto from '../models/producto.js';

// ver contenido del carrito de un usuario
export async function contentToCartById(req, res) {
	if (req.nivelUsuario == 2) {
		return res.status(401).json({ 'message': 'No tienes acceso al carrito de un usuario' });
	} else {
		const userId = req.params.id;

		try {
			// Verificar si el usuario existe
			const usuario = await Usuario.findByPk(userId);

			if (!usuario) {
				return res.status(404).json({ error: 'Usuario no encontrado' });
			}

			// Consulta del carrito
			const carrito = await Carrito.findAll({
				where: {
					cliente_id: userId,
				},
				include: {
					model: Producto,
					attributes: ['nombre', 'precio'],
					required: false,
				},
			});

			// Calcular la sumatoria total de productos y precios
			let totalCantidad = 0;
			let totalPrecio = 0;

			carrito.forEach((item) => {
				totalCantidad += item.cantidad;
				totalPrecio += item.Producto.precio * item.cantidad;
			});

			// Crear un objeto que incluye el carrito y las sumatorias
			const carritoConTotales = {
				carrito,
				totalCantidad,
				totalPrecio,
			};

			res.json(carritoConTotales);
		} catch (error) {
			console.error('Error al obtener el contenido del carrito:', error);
			res.status(500).json({ error: 'Error al obtener el contenido del carrito' });
		}
	}
}

// Agregar productos al carrito de un usuario
export async function addProductToCart(req, res) {
	if (req.nivelUsuario !== 1) {
		return res.status(401).json({ message: 'No puedes agregar contenido al carrito de un usuario' });
	} else {
		try {
			const usuario_id = req.params.id;
			const producto_id = parseInt(req.body.producto_id); // Convertir a número entero
			const cantidad = parseInt(req.body.cantidad); // Convertir a número entero

			// Verificar si el usuario existe en la base de datos
			const usuario = await Usuario.findByPk(usuario_id);
			if (!usuario) {
				return res.status(404).json({ message: 'Usuario no encontrado' });
			}

			// Verificar si el producto existe en la base de datos
			const producto = await Producto.findByPk(producto_id);
			if (!producto) {
				return res.status(404).json({ message: 'Producto no encontrado' });
			}

			// Verificar si hay suficiente stock disponible para el producto
			if (producto.stock < cantidad) {
				return res.status(400).json({ message: 'Sin stock disponible' });
			}

			// Actualizar el stock del producto
			producto.stock -= cantidad;
			await producto.save();

			// Verificar si el producto ya está en el carrito del usuario
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
	}
}

// Eliminar un producto del carrito
export async function deleteProductToCart(req, res) {
	if (req.nivelUsuario == 2) {
		return res.status(401).json({ message: 'No puedes quitar contenido del carrito de un usuario' });
	} else {
		const usuario_id = req.params.usuario_id;
		const producto_id = req.params.producto_id;

		try {
			// Verificar si el usuario existe
			const usuario = await Usuario.findByPk(usuario_id);

			if (!usuario) {
				return res.status(404).json({ error: 'Usuario no encontrado' });
			}

			// Verificar si el producto existe
			const producto = await Producto.findByPk(producto_id);

			if (!producto) {
				return res.status(404).json({ error: 'Producto no encontrado' });
			}

			// Verificar si el producto está en el carrito del usuario
			const carritoExistente = await Carrito.findOne({
				where: {
					cliente_id: usuario_id,
					producto_id: producto_id,
				}
			});

			if (carritoExistente) {
				// Obtener la cantidad eliminada
				const cantidadEliminada = carritoExistente.cantidad;

				// Eliminar el producto del carrito
				await carritoExistente.destroy();

				// Incrementar el stock del producto
				producto.stock += cantidadEliminada;
				await producto.save();

				return res.json({ message: 'Producto eliminado del carrito exitosamente' });
			} else {
				return res.status(404).json({ error: 'Producto no encontrado en el carrito del usuario' });
			}
		} catch (error) {
			console.error('Error al eliminar producto del carrito:', error);
			res.status(500).json({ error: 'Error al eliminar producto del carrito' });
		}
	}
};





