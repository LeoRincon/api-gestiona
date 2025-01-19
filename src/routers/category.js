import { Router } from 'express';
import {
 getCategories,
 getCategoryByID,
 createCategory,
 deleteCategory,
 updatedCategory,
} from '../controllers/category.js';
import { verifyCategory } from '../middlewares/validateCategory.js';
import validateID from '../middlewares/validateID.js';

const categoryRouters = Router();

categoryRouters.get('/categories', getCategories);
categoryRouters.get('/categories/:id', validateID, getCategoryByID);
categoryRouters.post('/categories', verifyCategory, createCategory);
categoryRouters.put(
 '/categories/:id',
 validateID,
 verifyCategory,
 updatedCategory
);
categoryRouters.delete('/categories/:id', validateID, deleteCategory);

export default categoryRouters;
