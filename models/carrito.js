import db from '../db/connection.js';
import { DataTypes } from 'sequelize';
import Usuario from './usuario.js';
import Producto from './producto.js';

const Carrito = db.define('Carrito', {
	cliente_id: {
		type: DataTypes.INTEGER,
	    primaryKey: true, //  clave primaria
		references: {
	        model: Usuario, // Utiliza el modelo relacionado
			key: 'id',
		},
	},
	producto_id: {
		type: DataTypes.INTEGER,
	    primaryKey: true, // clave primaria
		references: {
	        model: Producto, // Utiliza el modelo relacionado
			key: 'id',
		},
	},
	cantidad: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
}, {
	timestamps: false,
	tableName: 'carrito',
});

Carrito.belongsTo(Producto, { foreignKey: 'producto_id' });

export default Carrito;



