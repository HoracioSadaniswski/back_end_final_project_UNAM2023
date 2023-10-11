import express from 'express';
import Usuario from '../models/usuario.js';

const router = express.Router();

//Usuarios
// 1 listado completo de usuarios
router.get('/', async (req, res) => {
	try {
		let allUsers = await Usuario.findAll();

		res.status(200).json(allUsers);
	} catch (error) {
		res.status(500).json({ 'message': 'Error interno del servidor' });
	}
});

// 2 Datos de un usuario consignado por su ID
router.get('/:id', async (req, res) => {
	try {
		const userId = parseInt(req.params.id);

		const usuarioEncontrado = await Usuario.findByPk(userId);

		if (!usuarioEncontrado) {
			res.status(404).json({ 'message': 'Usuario no encontrado' });
		} else {
			res.status(200).json(usuarioEncontrado);
		}
	} catch (error) {
		res.status(500).json({ 'message': 'Error interno del servidor' });
	}
});

// 3 guardar un nuevo usuario
router.post('/', (req, res) => {
	try {
		let bodyTemp = '';

		req.on('data', (chunk) => {
			bodyTemp += chunk.toString();
		});

		req.on('end', async () => {
			const data = JSON.parse(bodyTemp);
			req.body = data;
			const usuarioSave = new Usuario(req.body);
			await usuarioSave.save();
		});

		res.status(201).json({'message': 'Usuario guardado exitosamente'});

	} catch (error) {
		res.status(204).json({'message': 'error'});
	}
});


// 4 modificar atributo de un usuario especifico
router.patch('/:id', async (req, res) => {
	let idUsuarioAActualizar = parseInt(req.params.id);
	let usuarioAActualizar = await Usuario.findByPk(idUsuarioAActualizar);

	if (!usuarioAActualizar) {
		res.status(404).json({ 'message': 'Usuario no encontrado' });
	} else {
		let bodyTemp = '';

		req.on('data', (chunk) => {
			bodyTemp += chunk.toString();
		});

		req.on('end', async () => {
			const data = JSON.parse(bodyTemp);
			req.body = data;

			await usuarioAActualizar.update(req.body);

			res.status(200).json({ 'message': 'Usuario actualizado exitosamente', 'usuario': usuarioAActualizar });
		});
	}
});

// 5 Borrar un Usuario especifico
router.delete('/:id', async (req, res) => {
	let idUsuarioABorrar = parseInt(req.params.id);
	let usuarioABorrar = await Usuario.findByPk(idUsuarioABorrar);

	if (!usuarioABorrar){
		res.status(204).json({'message':'Usuario no encontrado'});
	}

	try {
		await usuarioABorrar.destroy();
		res.status(200).json({'message': 'El borrado se ha realizado exitosamente', 'Usuario Borrado': usuarioABorrar});

	} catch (error) {
		res.status(204).json({'message': 'El borrado no pudo realizarse'});
	}
});

export default router;
