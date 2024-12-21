import { pool } from '../db.js';

export async function getAllSuppliesServices() {
  try {
    const client = await pool.connect();
    const query = "SELECT * FROM gestiona.insumo;";

    const resultado = await client.query(query);

    client.release();

    console.log("services", resultado.rows);

    return resultado.rows;
  } catch (error) {
    console.error('Error en la conexión a PostgreSQL:', error);
    throw error;
  }
}