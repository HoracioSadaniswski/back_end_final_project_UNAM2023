import express from 'express';
import tokenAuthentication from '../middlewares/tokenAuthentication.js';
const usuariosRouter = express.Router();

import { getAllUsers, getDataUserById, saveNewUser, editUserById, deleteUserById, getUsersForLevel } from '../controllers/usuariosController.js';

usuariosRouter.get('/:id', tokenAuthentication, getDataUserById);
usuariosRouter.get('/nivel/:nivel', getUsersForLevel);
usuariosRouter.get('/', getAllUsers);
usuariosRouter.post('/', saveNewUser);
usuariosRouter.patch('/:id', tokenAuthentication, editUserById);
usuariosRouter.delete('/:id', tokenAuthentication, deleteUserById);

export default usuariosRouter;
