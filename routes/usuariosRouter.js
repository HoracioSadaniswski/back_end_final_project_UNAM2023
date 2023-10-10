const express = require ('express');
const datos = require('../datos.json');

const router = express.Router();

//Usuarios
// 1 listado completo de usuarios
router.get('/', (req, res) => {
	try {
		let allUsers = datos.usuarios;

		res.status(200).json(allUsers);
	} catch (error) {
		res.status(500).json({ 'message': 'Error interno del servidor' });
	}
});

// 2 Datos de un usuario consignado por su ID
router.get('/:id', (req, res) => {
	try {
		const userId = parseInt(req.params.id);

		const usuarioEncontrado = datos.usuarios.find((usuario) => usuario.id === userId);

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

		req.on('end', () => {
			const data = JSON.parse(bodyTemp);
			req.body = data;
			datos.usuarios.push(req.body);
		});

		res.status(201).json({'message': 'Usuario guardado exitosamente'});

	} catch (error) {
		res.status(204).json({'message': 'error'});
	}
});


// 4 modificar atributo de un usuario especifico
router.patch('/:id', (req, res) => {
	let idUsuarioAActualizar = parseInt(req.params.id);
	let usuarioAActualizar = datos.usuarios.find((usuario) => usuario.id === idUsuarioAActualizar);

	if (!usuarioAActualizar) {
		res.status(404).json({ 'message': 'Usuario no encontrado' });
	} else {
		let bodyTemp = '';

		req.on('data', (chunk) => {
			bodyTemp += chunk.toString();
		});

		req.on('end', () => {
			const data = JSON.parse(bodyTemp);

			for (const atributo in data) {
				if (Object.hasOwnProperty.call(data, atributo)) {
					usuarioAActualizar[atributo] = data[atributo];
				}
			}

			res.status(200).json({ 'message': 'Usuario actualizado exitosamente', 'usuario': usuarioAActualizar });
		});
	}
});

// Borrar un Usuario especifico
router.delete('/:id', (req, res) => {
	let idUsuarioABorrar = parseInt(req.params.id);
	let usuarioABorrar = datos.usuarios.find((usuario) => usuario.id === idUsuarioABorrar);

	if (!usuarioABorrar){
		res.status(204).json({'message':'Usuario no encontrado'});
	}

	let indiceUsuarioABorrar = datos.usuarios.indexOf(usuarioABorrar);
	try {
		datos.usuarios.splice(indiceUsuarioABorrar, 1);
		res.status(200).json({'message': 'El borrado se ha realizado exitosamente', 'Usuario Borrado': usuarioABorrar});

	} catch (error) {
		res.status(204).json({'message': 'El borrado no pudo realizarse'});
	}
});

module.exports = router;
