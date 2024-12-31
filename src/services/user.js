import { pgpConnection } from '../db.js'
import bcrypt from 'bcrypt'

export async function getAllServiceUsers () {
  const datos = await pgpConnection.manyOrNone('SELECT * FROM gestiona.usuario')
  return datos
}

export async function getServiceUsers (id) {
  const datos = await pgpConnection.manyOrNone('SELECT * FROM gestiona.usuario WHERE id = $1', [id])
  return datos
}

export async function getServiceUsersByEmail (email) {
  if (!email) return { success: false, message: 'The email is required.' }
  try {
    const query = 'SELECT * FROM gestiona.usuario WHERE email = $1'
    const data = await pgpConnection.oneOrNone(query, [email])
    console.log(data)
    return (
      !Object.keys(data).length
        ? { success: false, message: 'No user found.' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to fetch the user.', error)
    return { success: false, message: 'It was not possible to fetch the user.' }
  }
}

export async function postServiceUsers (body) {
  if (!body) return { success: false, message: 'The body data is required.' }
  const {
    nombre,
    email,
    password
  } = body

  const passwordHashed = await bcrypt.hash(password, 10)
  try {
    const data = await pgpConnection.one(
      'INSERT INTO gestiona.usuario (nombre, email, password_hash, fecha_registro) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [nombre, email, passwordHashed]
    )
    return (
      !Object.keys(data).length
        ? { success: false, message: 'It was not possible to create the user.' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to create the user', error)
    return { success: false, message: 'It was not possible to create the user.' }
  }
}

export async function updateServiceUsers (id, body) {
  const datos = await pgpConnection.one(
    `UPDATE gestiona.usuario 
     SET nombre = $1, email = $2, password_hash = $3, fecha_registro = $4 
     WHERE id = $5 RETURNING *`,
    [body.nombre, body.email, body.password_hash, body.fecha_registro, id]
  )
  return datos
}

export async function deleteServiceUsers (id) {
  const datos = await pgpConnection.one('DELETE FROM gestiona.usuario WHERE id = $1 RETURNING *', [id])
  return datos
}
