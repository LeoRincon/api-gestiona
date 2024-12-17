import { pool } from '../db.js'

export async function getServiceUsers() {
  const client = await pool.connect()
  pool.query('SELECT * from gestiona.usuario').then(result  => {
    console.log(result.rows);
    client.release()
  })
  .catch(err => {
    console.error('Error en la conexión a PostgreSQL:', err);
  });
}
