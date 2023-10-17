import express from 'express';
import Categoria from '../models/categoria.js';

const router = express.Router();

// Categorías
// Lista completa de categorías
router.get('/categorias', async (req, res) => {
	try {
		const allCategorias = await Categoria.findAll();
		res.status(200).json(allCategorias);
	} catch (error) {
		res.status(204).json({ 'message': error });
	}
});

// Búsqueda de categoría por ID
router.get('/categorias/:id', async (req, res) => {
	try {
		const categoriaId = parseInt(req.params.id);
		const categoriaEncontrada = await Categoria.findByPk(categoriaId);
		res.status(200).json(categoriaEncontrada);
	} catch (error) {
		res.status(204).json({ 'message': error });
	}
});

// Agregar una nueva categoría
router.post('/categorias', async (req, res) => {
	try {
		const data = req.body;
		const categoriaNueva = new Categoria(data);
		await categoriaNueva.save();
		res.status(201).json({ 'message': 'Categoría creada con éxito' });
	} catch (error) {
		res.status(204).json({ 'message': 'Error al crear la categoría' });
	}
});

// Modificar una categoría por su ID
router.patch('/categorias/:id', async (req, res) => {
	try {
		const idCategoriaAEditar = parseInt(req.params.id);
		const categoriaAActualizar = await Categoria.findByPk(idCategoriaAEditar);
		if (!categoriaAActualizar) {
			res.status(204).json({ 'message': 'Categoría no encontrada' });
		} else {
			await categoriaAActualizar.update(req.body);
			res.status(200).json({ 'message': 'Categoría actualizada con éxito' });
		}
	} catch (error) {
		res.status(204).json({ 'message': 'Error al actualizar la categoría' });
	}
});

// Eliminar una categoría por su ID
router.delete('/categorias/:id', async (req, res) => {
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
});

export default router;
