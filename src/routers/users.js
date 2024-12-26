import { Router } from "express";
import { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUserById 
} from "../controllers/users.js";

const userRouters = Router();

// Rutas para los usuarios
userRouters.get('/users', getAllUsers); // Obtener todos los usuarios
userRouters.get('/users/:id', getUserById); // Obtener un usuario por ID
userRouters.post('/users', createUser); // Crear un nuevo usuario
userRouters.put('/users/:id', updateUser); // Actualizar un usuario por ID
userRouters.delete('/users/:id', deleteUserById); // Eliminar un usuario por ID

export default userRouters;
