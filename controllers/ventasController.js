import db from '../db/connection.js';
import Venta from '../models/ventas.js';
import Carrito from '../models/carrito.js';
import Producto from '../models/producto.js';

export async function createVenta(req, res) {
	if (req.nivelUsuario !== 1) {
		return res.status(401).json({'message':'Debes ser Administrador para realizar esta acción'});
	} else {
		try {
			const usuario_id = req.params.usuario_id;

			// Busca el carrito del usuario
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

				// Arreglo para registrar los productos vendidos
				const productosVendidos = [];

				for (const item of carrito) {
					montoTotal += item.cantidad * item.Producto.precio;

					// Registra los productos vendidos en el arreglo
					productosVendidos.push({
						producto_id: item.producto_id,
						cantidad: item.cantidad,
					});
				}

				// Crea una nueva venta
				const nuevaVenta = await Venta.create({
					cliente_id: usuario_id,
					fecha_venta: new Date(),
					monto_total: montoTotal,
					productos: productosVendidos, // Almacena los productos vendidos en la columna 'productos'
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
	};
};
