import db from '../db/connection.js';
import { DataTypes } from 'sequelize';

const Usuario = db.define('Usuario',
	{
		nombres: { type: DataTypes.STRING },
		apellidos: { type: DataTypes.STRING },
		dni: { type: DataTypes.STRING },
		correo: { type: DataTypes.STRING },
		telefono: { type: DataTypes.STRING },
		rol: { type: DataTypes.STRING },
		contrasena: { type: DataTypes.STRING }
	},
	{
		timestamps: false,
		tableName: 'usuarios'
	}
);

export default Usuario;
