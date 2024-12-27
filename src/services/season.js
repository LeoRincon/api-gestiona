import { pgpConnection } from '../db.js'

export async function getAll () {
  try {
    const query = 'SELECT * FROM gestiona.temporada'
    const data = await pgpConnection.manyOrNone(query)

    return (
      !data.length
        ? { success: false, message: 'No seasons found.' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to fetch the seasons.', error)
    return { success: false, message: 'It was not possible to fetch the seasons.' }
  }
}

export async function getById ({ id }) {
  if (!id) return { success: false, message: 'The season id is required.' }
  try {
    const query = 'SELECT * FROM gestiona.temporada WHERE id=$1'
    const data = await pgpConnection.oneOrNone(query, [id])

    return (
      !Object.keys(data).length
        ? { success: false, message: 'No season found.' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to fetch the season.', error)
    return { success: false, message: 'It was not possible to fetch the season.' }
  }
}

export async function getAllByIdCrop ({ idCrop }) {
  try {
    const query = 'SELECT * FROM gestiona.temporada WHERE id_cultivo=$1'
    const seasons = await pgpConnection.manyOrNone(query, [idCrop])

    return (
      !seasons.length
        ? { success: false, message: 'No seasons found.' }
        : { success: true, data: seasons }
    )
  } catch (error) {
    console.log('It was not possible to fetch the seasons.', error)
    return { success: false, message: 'It was not possible to fetch the seasons.' }
  }
}

export async function createSeason ({ season }) {
  try {
    const query = 'INSERT INTO gestiona.temporada (nombre_temporada, duracion, fecha_inicio, fecha_fin, id_cultivo, novedades_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;'
    const data = await pgpConnection.one(
      query,
      [
        season.nombre_temporada,
        season.duracion,
        season.fecha_inicio,
        season.fecha_fin,
        season.id_cultivo,
        season.novedades_id
      ]
    )

    return (
      !Object.keys(data).length
        ? { success: false, message: 'It was not possible to create the season.' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to create the season.', error)
    return { success: false, message: 'It was not possible to create the season.' }
  }
}

export async function deleteSeason ({ id }) {
  try {
    const query = 'DELETE FROM gestiona.temporada WHERE id=$1 RETURNING *'
    const data = await pgpConnection.one(query, [id])

    return (
      !Object.keys(data).length
        ? { success: false, message: 'It was not possible to delete the season.' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to delete the season.', error)
    return { success: false, message: 'It was not possible to delete the season.' }
  }
}

export async function modifySeason ({ id, season }) {
  if (!id) return { success: false, message: 'The season id is required.' }
  if (!season) return { success: false, message: 'The season is required.' }

  try {
    const query = 'UPDATE gestiona.temporada SET nombre_temporada=$1, duracion=$2, fecha_inicio=$3, fecha_fin=$4, id_cultivo=$5, novedades_id=$6  WHERE id=$7 RETURNING *'
    const data = await pgpConnection.one(query,
      [
        season.nombre_temporada,
        season.duracion,
        season.fecha_inicio,
        season.fecha_fin,
        season.id_cultivo,
        season.novedades_id,
        id
      ])

    return (
      !Object.keys(data).length
        ? { success: false, message: 'It was not possible to update the season.' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to update the season.', error)
    return { success: false, message: 'It was not possible to update the season.' }
  }
}

export async function updateSeason ({ id, season }) {
  if (!id) return { success: false, message: 'The season id is required.' }
  if (!season) return { success: false, message: 'The season is required.' }
  const keys = Object.keys(season)
  const values = Object.values(season)
  const fields = keys.map((key, index) => `${key}=$${index + 1}`).join(', ')
  try {
    const query = `UPDATE gestiona.temporada SET ${fields} WHERE id=$${keys.length + 1} RETURNING *`
    const data = await pgpConnection.one(query, [...values, id])

    return (
      !Object.keys(data).length
        ? { success: false, message: 'It was not possible to update the season.' }
        : { success: true, data }
    )
  } catch (error) {
    console.log('It was not possible to update the season.', error)
    return { success: false, message: 'It was not possible to update the season.' }
  }
}
