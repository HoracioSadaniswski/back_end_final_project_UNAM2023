import express from 'express';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';
const usuariosRouter = express.Router();

import { getAllUsers, getDataUserById, saveNewUser, editUserById, deleteUserById } from '../controllers/usuariosController.js';

usuariosRouter.get('/', getAllUsers);
usuariosRouter.get('/:id', tokenAuthentication, getDataUserById);
usuariosRouter.post('/', tokenAuthentication, saveNewUser);
usuariosRouter.patch('/:id', tokenAuthentication, editUserById);
usuariosRouter.delete('/:id', tokenAuthentication, deleteUserById);

export default usuariosRouter;
