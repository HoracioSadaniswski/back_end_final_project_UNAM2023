import db from '../db/connection.js';
import { DataTypes } from 'sequelize';
import Usuario from './usuario.js';

const Venta = db.define('Venta', {
	cliente_id: {
		type: DataTypes.INTEGER,
		references: {
			model: Usuario,
			key: 'id',
		},
	},
	fecha_venta: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	monto_total: {
		type: DataTypes.NUMBER,
		allowNull: false,
	},
	productos: {
		type: DataTypes.ARRAY(DataTypes.TEXT),
	},
}, {
	timestamps: false,
	tableName: 'ventas',
});

Venta.belongsTo(Usuario, { foreignKey: 'cliente_id' });

export default Venta;


