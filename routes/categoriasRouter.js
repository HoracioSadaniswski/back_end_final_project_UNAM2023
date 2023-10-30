import express from 'express';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';
const categoriasRouter = express.Router();

import { getAllCategories, getCategoryById, saveNewCategory, editCategoryById, deleteCategoryById } from '../controllers/categoriasController.js';

categoriasRouter.get('/', getAllCategories);
categoriasRouter.get('/:id', getCategoryById);
categoriasRouter.post('/', tokenAuthentication, saveNewCategory);
categoriasRouter.patch('/:id', tokenAuthentication, editCategoryById);
categoriasRouter.delete('/:id', tokenAuthentication, deleteCategoryById);

export default categoriasRouter;
