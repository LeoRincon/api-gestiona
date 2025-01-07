import { pgpConnection } from '../db.js'

const DESCRIPTION_COLUMN = 'descripcion'
const ID_COLUMN = 'id'
const NAME_COLUMN = 'nombre'
const ROLE_TABLE = 'gestiona.rol'

export async function createRole ({ role }) {
  if (!role) return { success: false, message: 'The role is required.' }
  const { nombre: name, descripcion: description } = role
  try {
    const data = await pgpConnection.one(`INSERT INTO ${ROLE_TABLE} (${NAME_COLUMN}, ${DESCRIPTION_COLUMN}) VALUES ($1, $2) RETURNING *`, [name, description])
    return (
      !Object.keys(data).length
        ? { success: false, message: 'Error saving data.' }
        : { success: true, data })
  } catch (error) {
    console.log('Error saving data to the database.', error)
    return { success: false, message: 'Error saving data.' }
  }
}
export async function deleteRole ({ id }) {
  if (!id) return { success: false, message: 'The role id is required.' }
  try {
    const data = await pgpConnection.one(`DELETE FROM ${ROLE_TABLE} WHERE ${ID_COLUMN} = $1 RETURNING *`, [id])
    return (
      !Object.keys(data).length
        ? { success: false, message: 'Error removing data.' }
        : { success: true, data })
  } catch (error) {
    console.log('Error removing data to the database.', error)
    return { success: false, message: 'Error removing data.' }
  }
}
export async function getRole ({ id }) {
  if (!id) return { success: false, message: 'The role id is required.' }
  try {
    const data = await pgpConnection.oneOrNone(`SELECT * FROM ${ROLE_TABLE} WHERE ${ID_COLUMN} = $1`, [id])
    return (
      !Object.keys(data).length
        ? { success: false, message: 'Error fetching information.' }
        : { success: true, data })
  } catch (error) {
    console.log('Error fetching data to the database.', error)
    return { success: false, message: 'Error fetching information.' }
  }
}
export async function getRoles () {
  try {
    const data = await pgpConnection.manyOrNone(`SELECT * FROM ${ROLE_TABLE}`)
    return (
      !data.length
        ? { success: false, message: 'Error fetching information.' }
        : { success: true, data })
  } catch (error) {
    console.log('Error fetching data to the database.', error)
    return { success: false, message: 'Error fetching information.' }
  }
}
export async function updateRole ({ id, role }) {
  if (!id) return { success: false, message: 'The role id is required.' }
  if (!role) return { success: false, message: 'The role is required.' }
  const { nombre: name, descripcion: description } = role
  try {
    const data = await pgpConnection.one(`UPDATE ${ROLE_TABLE} SET ${NAME_COLUMN} = $1, ${DESCRIPTION_COLUMN} = $2 WHERE ${ID_COLUMN} = $3 RETURNING *`, [name, description, id])
    return (
      !Object.keys(data).length
        ? { success: false, message: 'Error updating data.' }
        : { success: true, data })
  } catch (error) {
    console.log('Error updating data to the database.', error)
    return { success: false, message: 'Error updating data.' }
  }
}
