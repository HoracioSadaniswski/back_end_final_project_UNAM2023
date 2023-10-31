import Usuario from '../models/usuario.js';

//lista completa de usuarios (a fines del trabajo práctico no se agrega token de autenticación para poder acceder a la información de los usuarios y poder probar todas las funciones)
export async function getAllUsers (req, res) {
	try {
		let allUsers = await Usuario.findAll();

		res.status(200).json(allUsers);
	} catch (error) {
		res.status(500).json({ 'message': 'Error interno del servidor' });
	}
};

//información de un usuario por id (información provista solo para administradores)
export async function getDataUserById (req, res) {
	if (req.nivelUsuario !== 3) {
		return res.status(401).json({'message':'Debes ser Administrador para realizar esta acción'});
	} else {
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
};

//guardar un nuevo usuario
export async function saveNewUser (req, res) {
	try {
		const usuarioSave = new Usuario(req.body);
		await usuarioSave.save();

		res.status(201).json({'message': 'Usuario guardado exitosamente'});

	} catch (error) {
		res.status(204).json({'message': 'error'});
	}
};

//modificar atributo de un usuario (acceso para los tres niveles de ususario)
export async function editUserById (req, res) {
	if (req.nivelUsuario !== 3 || req.nivelUsuario !== 2 || req.nivelUsuario !== 1 ) {
		return res.status(401).json({'message':'Debes ser Administrador para realizar esta acción'});
	} else {
		let idUsuarioAActualizar = parseInt(req.params.id);
		let usuarioAActualizar = await Usuario.findByPk(idUsuarioAActualizar);

		if (!usuarioAActualizar) {
			res.status(404).json({ 'message': 'Usuario no encontrado' });
		} else {
			await usuarioAActualizar.update(req.body);

			res.status(200).json({ 'message': 'Usuario actualizado exitosamente', 'usuario': usuarioAActualizar });
		};
	};
};

//eliminar un usuario de la db (solo administradores)
export async function deleteUserById (req, res) {
	if (req.nivelUsuario !== 3) {
		return res.status(401).json({'message':'Debes ser Administrador para realizar esta acción'});
	} else {
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
};
