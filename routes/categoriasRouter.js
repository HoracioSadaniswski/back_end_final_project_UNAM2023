import express from 'express';

const categoriasRouter = express.Router();

import { getAllCategories, getCategoryById, saveNewCategory, editCategoryById, deleteCategoryById } from '../controllers/categoriasController.js';

categoriasRouter.get('/', getAllCategories);
categoriasRouter.get('/:id', getCategoryById);
categoriasRouter.post('/', saveNewCategory);
categoriasRouter.patch('/:id', editCategoryById);
categoriasRouter.delete('/:id', deleteCategoryById);

export default categoriasRouter;
