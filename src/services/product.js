import { pgpConnection } from '../db.js';

// Obtener todos los productos
export async function getAllServiceProduct() {
  try {
    console.log("Fetching all products");
    const datos = await pgpConnection.manyOrNone('SELECT * FROM gestiona.producto');
    console.log(datos);
    return datos;
  } catch (error) {
    console.error('Error en getAllServiceProduct:', error);
    return { error: 'Error fetching products.' };
  }
}

// Obtener producto por ID
export async function getServiceProduct(id) {
  try {
    const datos = await pgpConnection.oneOrNone('SELECT * FROM gestiona.producto WHERE id = $1', [id]);
    if (!datos) {
      return { error: 'Product not found' };
    }
    return datos;
  } catch (error) {
    console.error('Error en getServiceProduct:', error);
    return { error: 'Error fetching product by ID.' };
  }
}

// Crear un nuevo producto
export async function postServiceProduct(body) {
  try {
    const { cantidad_recolectada, fecha_recoleccion, id_temporada, id_unidad_medida } = body;
    const datos = await pgpConnection.one(
      'INSERT INTO gestiona.producto (cantidad_recolectada, fecha_recoleccion, id_temporada, id_unidad_medida) VALUES ($1, $2, $3, $4) RETURNING *',
      [cantidad_recolectada, fecha_recoleccion, id_temporada, id_unidad_medida]
    );
    return datos;
  } catch (error) {
    console.error('Error en postServiceProduct:', error);
    return { error: 'Error creating product.' };
  }
}

// Actualizar un producto existente
export async function updateServiceProduct(id, body) {
  try {
    const datos = await pgpConnection.oneOrNone(
      `UPDATE gestiona.producto 
       SET cantidad_recolectada = $1, fecha_recoleccion = $2, id_temporada = $3, id_unidad_medida = $4 
       WHERE id = $5 RETURNING *`,
      [body.cantidad_recolectada, body.fecha_recoleccion, body.id_temporada, body.id_unidad_medida, id]
    );
    if (!datos) {
      return { error: 'Product not found or no changes made.' };
    }
    return datos;
  } catch (error) {
    console.error('Error en updateServiceProduct:', error);
    return { error: 'Error updating product.' };
  }
}

// Eliminar un producto
export async function deleteServiceProduct(id) {
  try {
    const datos = await pgpConnection.oneOrNone('DELETE FROM gestiona.producto WHERE id = $1 RETURNING *', [id]);
    if (!datos) {
      return { error: 'Product not found.' };
    }
    return datos;
  } catch (error) {
    console.error('Error en deleteServiceProduct:', error);
    return { error: 'Error deleting product.' };
  }
}