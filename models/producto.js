import db from '../db/connection.js';
import { DataTypes } from 'sequelize';

const Producto = db.define('Producto',
	{
		nombre: { type: DataTypes.STRING },
		descripcion: { type: DataTypes.TEXT },
		precio: { type: DataTypes.NUMBER },
		stock: { type: DataTypes.INTEGER},
		categoria_id:{ type: DataTypes.INTEGER},
		imagen_url: { type: DataTypes.STRING }
	},
	{
		tableName: 'productos',
		timestamps: false
	}
);

export default Producto;
