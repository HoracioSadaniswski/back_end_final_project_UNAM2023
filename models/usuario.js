import db from '../db/connection.js';
import { DataTypes } from 'sequelize';

const Usuario = db.define('Usuario',
	{
		nombres: { type: DataTypes.STRING },
		apellidos: { type: DataTypes.STRING },
		dni: { type: DataTypes.STRING },
		correo: { type: DataTypes.STRING },
		telefono: { type: DataTypes.STRING },
		nivel: { type: DataTypes.INTEGER },
		password: { type: DataTypes.STRING },
		usuario: { type: DataTypes.STRING }
	},
	{
		timestamps: false,
		tableName: 'usuarios'
	}
);

export default Usuario;
