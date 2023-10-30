import Categoria from '../models/categoria.js';

// Lista completa de categorías
export async function getAllCategories (req, res) {
	try {
		const allCategorias = await Categoria.findAll();
		res.status(200).json(allCategorias);
	} catch (error) {
		res.status(204).json({ 'message': error });
	}
};

// Búsqueda de categoría por ID
export async function getCategoryById (req, res) {
	try {
		const categoriaId = parseInt(req.params.id);
		const categoriaEncontrada = await Categoria.findByPk(categoriaId);
		res.status(200).json(categoriaEncontrada);
	} catch (error) {
		res.status(204).json({ 'message': error });
	}
};

// Agregar una nueva categoría
export async function saveNewCategory (req, res) {
	if (req.nivelUsuario !== 3) {
		return res.status(401).json({'message':'Debes ser Administrador para realizar esta acción'});
	} else {
		try {
				const categoriaSave = new Categoria(req.body);
				await categoriaSave.save();

			res.status(201).json({'messege': 'Categoría agregada correctamente'});

		} catch (error) {
			res.status(204).json({'messege': 'Error, no se puedo registrar la categoría'});
		}
	};
};

// Modificar una categoría por su ID
export async function editCategoryById (req, res) {
	if (req.nivelUsuario !== 3) {
		return res.status(401).json({'message':'Debes ser Administrador para realizar esta acción'});
	} else {
		let idCategoriaAEditar = parseInt(req.params.id);
		let categoriaAActualizar = await Categoria.findByPk(idCategoriaAEditar);

		if (!categoriaAActualizar) {
			res.status(204).json({'message':'Producto no encontrado'});
		} else {
			await categoriaAActualizar.update(req.body);

			res.status(200).send('Categoría actualizada');;
		};
	};
};

// Eliminar una categoría por su ID
export async function deleteCategoryById (req, res) {
	if (req.nivelUsuario !== 3) {
		return res.status(401).json({'message':'Debes ser Administrador para realizar esta acción'});
	} else {
		try {
			const idCategoriaABorrar = parseInt(req.params.id);
			const categoriaABorrar = await Categoria.findByPk(idCategoriaABorrar);
			if (!categoriaABorrar) {
				res.status(204).json({ 'message': 'Categoría no encontrada' });
			} else {
				await categoriaABorrar.destroy();
				res.status(200).json({ 'message': 'Categoría eliminada con éxito' });
			}
		} catch (error) {
			res.status(204).json({ 'message': 'Error al eliminar la categoría' });
		}
	};
};
