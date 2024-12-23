import { pool } from "../../db.js";
///back
export async function getServiceVenta() {
  const client = await pool.connect();
  try {
    
    const result = await client.query(`SELECT a.cantidad_vendida,a.precio_unitario,a.precio_total,
                                              a.fecha_venta,a.observaciones,b.nombre_temporada,
                                              c.unidad,c.descripcion
                                       FROM gestiona.venta as a
                                       INNER JOIN gestiona.temporada as b on b.id = a.id_temporada  
                                       INNER JOIN gestiona.unidad_medida as c on c.id = a.id_unidad_medida`);
    
    return result.rows; // Devuelve los datos obtenidos

  } catch (err) {
    console.error("Error en la conexión a PostgreSQL:", err);
    throw err;
  } finally {
    client.release();
    
  }
}