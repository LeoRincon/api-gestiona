import * as userHasService from '../services/userHas.js'

export async function createUserHas (req, res) {
  const userHas = req.body
  if (!userHas) return res.status(400).json({ error: 'The user has data is required' })
  try {
    const newUserHas = await userHasService.createUserHas({ userHas })
    if (!newUserHas.success) return res.status(400).json({ error: newUserHas.message })
    return res.status(201).json(newUserHas)
  } catch (error) {
    console.log('POST Controller error.', error)
    res.status(500).json({ error: 'Error saving data.' })
  }
}

export async function deleteUserHas (req, res) {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'The id is required' })
  try {
    const result = await userHasService.deleteUserHas({ id })
    if (!result.success) return res.status(400).json({ error: result.message })
    return res.status(204).json(result)
  } catch (error) {
    console.log('DELETE Controller error.', error)
    res.status(500).json({ error: 'Error deleting information.' })
  }
}

export async function getAll (_req, res) {
  try {
    const userHas = await userHasService.getAll()
    if (!userHas.success) return res.status(400).json({ error: userHas.message })
    return res.status(200).json(userHas)
  } catch (error) {
    console.log('GET Controller error.', error)
    res.status(500).json({ error: 'Error fetching information.' })
  }
}
export async function getById (req, res) {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'The user has id is required' })
  try {
    const userHas = await userHasService.getById({ id })
    if (!userHas.success) return res.status(400).json({ error: userHas.message })
    return res.status(200).json(userHas)
  } catch (error) {
    console.log('GET Controller error.', error)
    res.status(500).json({ error: 'Error fetching data.' })
  }
}

export async function getByProjectId (req, res) {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'The project id is required' })
  try {
    const usersHas = await userHasService.getByProjectId({ id })
    if (!usersHas.success) return res.status(400).json({ error: usersHas.message })
    return res.status(200).json(usersHas)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data.' })
  }
}

export async function getByUserId (req, res) {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'The user id is required' })
  try {
    const usersHas = await userHasService.getByUserId({ id })
    if (!usersHas.success) return res.status(400).json({ error: usersHas.message })
    return res.status(200).json(usersHas)
  } catch (error) {
    console.log('GET Controller error.', error)
    res.status(500).json({ error: 'Error fetching data.' })
  }
}

export async function updateUserHas (req, res) {
  const { id } = req.params
  const userHas = req.body
  if (!id) return res.status(400).json({ error: 'The id is required' })
  if (!userHas) return res.status(400).json({ error: 'The user has data is required' })
  try {
    const updatedUserHas = await userHasService.updateUserHas({ id, userHas })
    if (!updatedUserHas.success) return res.status(400).json({ error: updatedUserHas.message })
    return res.status(200).json(updatedUserHas)
  } catch (error) {
    console.log('PUT Controller error.', error)
    res.status(500).json({ error: 'Error updating information.' })
  }
}
