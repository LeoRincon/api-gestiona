import { pgpConnection } from '../db.js'

const USER_HAS_ID = 'id'
const USER_HAS_PROJECT_ID = 'proyecto_id'
const USER_HAS_ROLE_ID = 'id_rol'
const USER_HAS_TABLE = 'gestiona.usuario_has'
const USER_HAS_USER_ID = 'usuario_id'

export async function createUserHas ({ userHas }) {
  if (!userHas) return { success: false, message: 'The user has data is required' }
  const {
    usuario_id: userID,
    proyecto_id: projectId,
    id_rol: roleId
  } = userHas
  try {
    const query =
    `INSERT INTO ${USER_HAS_TABLE} (${USER_HAS_USER_ID}, ${USER_HAS_PROJECT_ID}, ${USER_HAS_ROLE_ID})
    VALUES ($1, $2, $3) RETURNING *;`
    const values = [userID, projectId, roleId]
    const data = await pgpConnection.one(query, values)
    return (
      !Object.keys(data).length
        ? { success: false, message: 'It was not possible to create user-has' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to create the user-has.', error)
    return { success: false, message: 'It was not possible to create the user-has.' }
  }
}

export async function deleteUserHas ({ id }) {
  if (!id) return { success: false, message: 'The id is required' }
  try {
    const query = `DELETE FROM ${USER_HAS_TABLE} WHERE ${USER_HAS_ID}=$1 RETURNING *`
    const data = await pgpConnection.one(query, [id])

    return (
      !Object.keys(data).length
        ? { success: false, message: 'It was not possible to delete user-has' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to delete the user-has.', error)
    return { success: false, message: 'It was not possible to delete the user-has.' }
  }
}

export async function getAll () {
  try {
    const query = `SELECT * FROM ${USER_HAS_TABLE};`
    const data = await pgpConnection.manyOrNone(query)
    return (
      !data.length
        ? { success: false, message: 'No user-has found' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to fetch the user-has.', error)
    return { success: false, message: 'It was not possible to fetch the user-has.' }
  }
}

export async function getById ({ id }) {
  if (!id) return { success: false, message: 'The id is required' }
  try {
    const query = `SELECT * FROM ${USER_HAS_TABLE} WHERE ${USER_HAS_ID}=$1;`
    const data = await pgpConnection.oneOrNone(query, [id])
    return (
      !Object.keys(data).length
        ? { success: false, message: 'No user-has found' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to fetch the user-has.', error)
    return { success: false, message: 'It was not possible to fetch the user-has.' }
  }
}

export async function getByProjectId ({ id }) {
  if (!id) return { success: false, message: 'The project id is required' }
  try {
    const query = `SELECT * FROM ${USER_HAS_TABLE} WHERE ${USER_HAS_PROJECT_ID}=$1;`
    const data = await pgpConnection.manyOrNone(query, [id])
    return (
      !data.length
        ? { success: false, message: 'No user-has found' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to fetch the user-has.', error)
    return { success: false, message: 'It was not possible to fetch the user-has.' }
  }
}

export async function getByUserId ({ id }) {
  if (!id) return { success: false, message: 'The user id is required' }
  try {
    const query = `SELECT * FROM ${USER_HAS_TABLE} WHERE ${USER_HAS_USER_ID}=$1;`
    const data = await pgpConnection.manyOrNone(query, [id])
    return (
      !data.length
        ? { success: false, message: 'No user-has found' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to fetch the user-has.', error)
    return { success: false, message: 'It was not possible to fetch the user-has.' }
  }
}

export async function updateUserHas ({ id, userHas }) {
  if (!id) return { success: false, message: 'The id is required' }
  if (!userHas) return { success: false, message: 'The user has data is required' }
  const {
    usuario_id: userID,
    proyecto_id: projectId,
    id_rol: roleId
  } = userHas
  try {
    const query =
    `UPDATE ${USER_HAS_TABLE}
    SET ${USER_HAS_USER_ID}=$1, ${USER_HAS_PROJECT_ID}=$2, ${USER_HAS_ROLE_ID}=$3
    WHERE ${USER_HAS_ID}=$4 RETURNING *;`
    const values = [userID, projectId, roleId, id]
    const data = await pgpConnection.one(query, values)
    return (
      !Object.keys(data).length
        ? { success: false, message: 'It was not possible to update user-has' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to update the user-has.', error)
    return { success: false, message: 'It was not possible to update the user-has.' }
  }
}
