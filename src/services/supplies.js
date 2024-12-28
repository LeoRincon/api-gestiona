import { pgpConnection } from "../db.js";

export async function getAllSuppliesServices() {
    try {
        const query = 'SELECT * FROM gestiona.insumo;';
        const supplies = await pgpConnection.manyOrNone(query);
        
        if (!supplies || supplies.length === 0) {
          return {
              name: 'error',
              message: 'No supplies found'
          };
      }
      return supplies;
    } 
    catch (error) {                //error capture and handling
        console.error('[getAllSuppliesServices] Database error:', error.message);
        return {
          name: 'error',
          message: 'Error in obtaining inputs'
      };
  }
}


export async function getSupplyService(id) {
  try {
    if (!id) {
      return {
          name: 'error',
          message: 'ID es requerido'
      };
  }
    const supply = await pgpConnection.oneOrNone('SELECT * FROM gestiona.insumo WHERE id = \$1;', id);
    if (!supply) {
      return {
          name: 'error',
          message: 'Input not found'
      };
  }
  return supply;
  } 
  catch (error) {
    console.error('Error in obtaining input:', error);
    return {
      name: 'error',
      message: 'Error in obtaining input'
  };
}
}

export async function postSupplyService(data) {
  try {
    if (!data || !Object.keys(data).length) {
      return {
        name: 'error',
        message: 'Invalid data'
    };
}


    const supply = await pgpConnection.one(`
      INSERT INTO gestiona.insumo(
        nombre_insumo, 
        cantidad_disponible, 
        fecha_ingreso, 
        precio_insumo, 
        id_inventario, 
        id_categoria, 
        id_unidad_medida
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *
    `, [
      data.nombre_insumo,
      data.cantidad_disponible,
      data.fecha_ingreso,
      data.precio_insumo,
      data.id_inventario,
      data.id_categoria,
      data.id_unidad_medida
    ]);
    return supply;
  } 
  catch (error) {
    console.error('Input service error:', error);
    return {
      name: 'error',
      message: 'Error al crear el insumo'
  };
}
}

export async function putSupply(id, body) {
  try {
    if (!id) {
      return {
          name: 'error',
          message: 'ID is required'
      };
  }
  if (!body || !Object.keys(body).length) {
    return {
        name: 'error',
        message: 'Data are required'
    };
}
      const supply = await pgpConnection.one(`
          UPDATE gestiona.insumo
          SET nombre_insumo = $1,
              cantidad_disponible = $2,
              fecha_ingreso = $3,
              precio_insumo = $4,
              id_inventario = $5,
              id_categoria = $6,
              id_unidad_medida = $7
          WHERE id = $8
          RETURNING *
      `, [
          body.nombre_insumo,
          body.cantidad_disponible,
          body.fecha_ingreso,
          body.precio_insumo,
          body.id_inventario,
          body.id_categoria,
          body.id_unidad_medida,
          id
      ]);
      return supply;
  } 
  catch (error) {
    console.error('PUT Database Error:', error);     
    return {
        name: "error",
        message: 'Error updating the input'
    };
}
}

export async function deleteSupply(id) {
  try {
    if (!id) {
      return {
          name: 'error',
          message: 'ID is required'
      };
  }
      const supply = await pgpConnection.one(`
          DELETE FROM gestiona.insumo
          WHERE id = $1
          RETURNING *
      `, id);
      if (!supply) {
        return {
            name: 'error',
            message: 'Input not found'
        };
    }
      return supply;
  } 
  catch (error) {
      console.log('DELETE Database Error: ' , error);
      return {
          name: "error",
          message: 'Error when deleting the input'
      };
  }
}