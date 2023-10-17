import db from '../db/connection.js';
import { DataTypes } from 'sequelize';

const Categoria = db.define('Categoria',
	{
		nombre: { type: DataTypes.STRING },
	},
	{
		tableName: 'categorias',
		timestamps: false
	}
);

export default Categoria;
