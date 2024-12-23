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
userRouters.get('/users', getAllUsers); 
userRouters.get('/users/:id', getUserById);
userRouters.post('/users', createUser); 
userRouters.put('/users/:id', updateUser);
userRouters.delete('/users/:id', deleteUserById);

export default userRouters;
