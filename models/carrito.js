import db from '../db/connection.js';
import { DataTypes } from 'sequelize';
import Usuario from './usuario.js'; // Importa tu modelo de Usuario
import Producto from './producto.js'; // Importa tu modelo de Producto

const Carrito = db.define('Carrito', {
	cliente_id: {
		type: DataTypes.INTEGER,
	    primaryKey: true, // Esta columna forma parte de la clave primaria
		references: {
	        model: Usuario, // Utiliza el modelo relacionado, en lugar del nombre de la tabla
			key: 'id',
		},
	},
	producto_id: {
		type: DataTypes.INTEGER,
	    primaryKey: true, // Esta columna forma parte de la clave primaria
		references: {
	        model: Producto, // Utiliza el modelo relacionado, en lugar del nombre de la tabla
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



