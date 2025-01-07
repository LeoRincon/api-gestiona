import { Router } from "express";
import { 
  getAllProduct, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProductById 
} from "../controllers/product.js";

const productRouters = Router(); 

// Configuración de rutas
productRouters.get('/product', getAllProduct); 
productRouters.get('/product/:id', getProductById); 
productRouters.post('/product', createProduct); 
productRouters.put('/product/:id', updateProduct); 
productRouters.delete('/product/:id', deleteProductById); 

export default productRouters;
