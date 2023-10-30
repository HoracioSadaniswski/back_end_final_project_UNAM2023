import express from 'express';

const usuariosRouter = express.Router();

import { getAllUsers, getDataUserById, saveNewUser, editUserById, deleteUserById } from '../controllers/usuariosController.js';

usuariosRouter.get('/', getAllUsers);
usuariosRouter.get('/:id', getDataUserById);
usuariosRouter.post('/', saveNewUser);
usuariosRouter.patch('/:id', editUserById);
usuariosRouter.delete('/:id', deleteUserById);

export default usuariosRouter;
