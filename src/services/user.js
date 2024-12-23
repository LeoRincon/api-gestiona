import { pool } from "../db.js";

export async function getServiceUsers() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT NOW()");
    
    return result.rows; // Devuelve los datos obtenidos

  } catch (err) {
    console.error("Error en la conexión a PostgreSQL:", err);
    throw err;
  } finally {
    client.release();
    
  }
}
