import Usuario from '../models/usuario.js';

//lista completa de usuarios
export async function getAllUsers (req, res) {
	try {
		let allUsers = await Usuario.findAll();

		res.status(200).json(allUsers);
	} catch (error) {
		res.status(500).json({ 'message': 'Error interno del servidor' });
	}
};

//información de un usuario por id
export async function getDataUserById (req, res) {
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
};

//guardar un nuevo usuario
export async function saveNewUser (req, res) {
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
};

//modificar atributo de un usuario
export async function editUserById (req, res) {
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
};

//eliminar un usuario de la db
export async function deleteUserById (req, res) {
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
};
