import { Router } from 'express';
import {
 getCategories,
 getCategoryByID,
 createCategory,
 deleteCategory,
 updatedCategory,
} from '../controllers/category.js';

const categoryRouters = Router();

categoryRouters.get('/categories', getCategories);
categoryRouters.get('/categories/:id', getCategoryByID);
categoryRouters.post('/categories', createCategory);
categoryRouters.put('/categories/:id', updatedCategory);
categoryRouters.delete('/categories/:id', deleteCategory);

export default categoryRouters;
