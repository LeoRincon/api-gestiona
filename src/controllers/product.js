import { 
  getAllServiceProduct, 
  getServiceProduct, 
  postServiceProduct, 
  updateServiceProduct, 
  deleteServiceProduct 
} from "../services/product.js";

// Obtener todos los productos
export async function getAllProduct(req, res) {
  try {
    const datos = await getAllServiceProduct();
    if (datos.error) {
      return res.status(500).json({ success: false, data: null, message: datos.error });
    }
    res.status(200).json({ success: true, data: datos, message: 'Products fetched successfully' });
  } catch (error) {
    console.error('Error en getAllProduct:', error);
    res.status(500).json({ success: false, data: null, message: 'Internal server error while fetching products' });
  }
}

// Obtener producto por ID
export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const datos = await getServiceProduct(id);
    if (datos.error) {
      return res.status(404).json({ success: false, data: null, message: datos.error });
    }
    res.status(200).json({ success: true, data: datos, message: 'Product fetched successfully' });
  } catch (error) {
    console.error('Error en getProductById:', error);
    res.status(500).json({ success: false, data: null, message: 'Internal server error while fetching product by ID' });
  }
}

// Crear un nuevo producto
export async function createProduct(req, res) {
  try {
    const cuerpo = req.body;
    console.log(cuerpo);
    const datos = await postServiceProduct(cuerpo);
    if (datos.error) {
      return res.status(400).json({ success: false, data: null, message: datos.error });
    }
    res.status(201).json({ success: true, data: datos, message: 'Product created successfully' });
  } catch (error) {
    console.error('Error en createProduct:', error);
    res.status(500).json({ success: false, data: null, message: 'Internal server error while creating product' });
  }
}

// Actualizar un producto
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const body = req.body;
    const datos = await updateServiceProduct(id, body);
    if (datos.error) {
      return res.status(404).json({ success: false, data: null, message: datos.error });
    }
    res.status(200).json({ success: true, data: datos, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error en updateProduct:', error);
    res.status(500).json({ success: false, data: null, message: 'Internal server error while updating product' });
  }
}

// Eliminar un producto
export async function deleteProductById(req, res) {
  try {
    const { id } = req.params;
    const datos = await deleteServiceProduct(id);
    if (datos.error) {
      return res.status(404).json({ success: false, data: null, message: datos.error });
    }
    res.status(200).json({ success: true, data: datos, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error en deleteProductById:', error);
    res.status(500).json({ success: false, data: null, message: 'Internal server error while deleting product' });
  }
}