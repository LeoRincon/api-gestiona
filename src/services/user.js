  import { pgpConnection } from '../db.js';

export async function getAllServiceUsers() {
  console.log("service");
  const datos = await pgpConnection.manyOrNone('SELECT * FROM gestiona.usuario');
  console.log(datos);
  return datos;
}

export async function getServiceUsers(id) {
  const datos = await pgpConnection.manyOrNone('SELECT * FROM gestiona.usuario WHERE id = $1', [id]);
  return datos;
}

export async function postServiceUsers(body) {
  const {nombre, email, password_hash, fecha_registro} = body
  const datos = await pgpConnection.one(
    'INSERT INTO gestiona.usuario (nombre, email, password_hash, fecha_registro) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, email, password_hash, fecha_registro]
  );
  return datos;
}

export async function updateServiceUsers(id, body) {
  const datos = await pgpConnection.one(
    `UPDATE gestiona.usuario 
     SET nombre = $1, email = $2, password_hash = $3, fecha_registro = $4 
     WHERE id = $5 RETURNING *`,
    [body.nombre, body.email, body.password_hash, body.fecha_registro, id]
  );
  return datos;
}

export async function deleteServiceUsers(id) {
  const datos = await pgpConnection.one('DELETE FROM gestiona.usuario WHERE id = $1 RETURNING *', [id]);
  return datos;
}
