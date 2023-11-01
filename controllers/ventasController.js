import db from '../db/connection.js';
import Venta from '../models/ventas.js';
import Carrito from '../models/carrito.js';
import Producto from '../models/producto.js';

export async function listAllSales(req, res) {
	if (req.nivelUsuario !== 3) {
		return res.status(401).json({'message': 'Debes ser Administrador para realizar esta acción'});
	}

	try {
		// Busca todas las ventas
		const ventas = await Venta.findAll();

		if (ventas.length === 0) {
			return res.status(404).json({ message: 'No se encontraron ventas' });
		}

		return res.status(200).json({ ventas });
	} catch (error) {
		console.error('Error al listar las ventas:', error);
		return res.status(500).json({ message: 'Error al listar las ventas' });
	}
};

export async function listSalesByUserId(req, res) {
	if (req.nivelUsuario == 2) {
		return res.status(401).json({'message':'Debes ser Administrador para realizar esta acción'});
	} else {
		try {
			const { usuario_id } = req.params;

			// Buscar las ventas asociadas al usuario específico
			const ventas = await Venta.findAll({
				where: { cliente_id: usuario_id },
			});

			if (ventas.length === 0) {
				return res.status(404).json({ message: 'No se encontraron ventas para este usuario' });
			}

			res.status(200).json({ ventas });
		} catch (error) {
			console.error('Error al listar ventas:', error);
			res.status(500).json({ message: 'Error al listar ventas' });
		}
	};
};

export async function createVenta(req, res) {
	if (req.nivelUsuario !== 1) {
		return res.status(401).json({'message':'Debes ser un usuario autorizado para realizar esta acción'});
	} else {
		try {
			const usuario_id = req.params.usuario_id;

			// Busca el carrito del usuario con detalles de los productos
			const carrito = await Carrito.findAll({
				where: {
					cliente_id: usuario_id,
				},
				include: Producto,
			});

			if (carrito.length === 0) {
				return res.status(400).json({ message: 'El carrito está vacío' });
			}

			const t = await db.transaction();

			try {
				// Calcula el monto total
				let montoTotal = 0;

				// Arreglo para registrar los productos vendidos en formato JSON
				const productosVendidos = [];

				for (const item of carrito) {
					const producto = item.Producto;

					montoTotal += item.cantidad * producto.precio;

					// Registra los productos vendidos en el arreglo en formato JSON
					productosVendidos.push({
						producto_id: item.producto_id,
						nombre_producto: producto.nombre,
						cantidad: item.cantidad,
						detalles: {
							precio: producto.precio,
							categoria_id: producto.categoria_id,
						},
					});
				}

				// Crea una nueva venta
				const nuevaVenta = await Venta.create({
					cliente_id: usuario_id,
					fecha_venta: new Date(),
					monto_total: montoTotal,
					productos: productosVendidos,
				}, { transaction: t });

				// Limpia el carrito
				await Carrito.destroy({
					where: {
						cliente_id: usuario_id,
					},
					transaction: t,
				});

				await t.commit();

				return res.status(201).json({ message: 'Venta creada exitosamente', venta: nuevaVenta });
			} catch (error) {
				await t.rollback();
				console.error('Error al crear la venta:', error);
				return res.status(500).json({ message: 'Error al crear la venta' });
			}
		} catch (error) {
			console.error('Error al crear la venta:', error);
			return res.status(500).json({ message: 'Error al crear la venta' });
		}
	}
};

export async function deleteVentaById(req, res) {
	if (req.nivelUsuario !== 3) {
		return res.status(401).json({'message':'Solo un usuario nivel 3 puede borrar un registro de venta'});
	} else {
		try {
			const { usuario_id, venta_id } = req.params;

			// Verificar si la venta existe y pertenece al usuario
			const venta = await Venta.findOne({
				where: {
					id: venta_id,
					cliente_id: usuario_id,
				},
			});

			if (!venta) {
				return res.status(404).json({ message: 'Venta no encontrada' });
			}

			// Eliminar la venta
			await venta.destroy();

			return res.json({ message: 'Venta eliminada exitosamente' });
		} catch (error) {
			console.error('Error al eliminar la venta:', error);
			return res.status(500).json({ message: 'Error al eliminar la venta' });
		}
	};
};
