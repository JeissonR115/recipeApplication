import express from 'express';
import { registerUser, loginUser, getUserById, updateUser, deleteUser } from './controller.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);                 // Ruta para registrar un nuevo usuario
router.post('/login', loginUser);                       // Ruta de inicio de sesión
router.get('/:id', verifyToken, getUserById);           // Ruta protegida para obtener usuario por ID
router.put('/:id', verifyToken, updateUser);            // Ruta protegida para actualizar usuario
router.delete('/:id', verifyToken, deleteUser);

export default router;
