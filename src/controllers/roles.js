import * as roleService from '../services/role.js'

export async function createRole (req, res) {
  const role = req.body
  if (!role) return res.status(400).json({ error: 'The role is required.' })
  try {
    console.log('role at controller', role)
    const newRole = await roleService.createRole({ role })
    if (!newRole.success) return res.status(400).json({ error: newRole.message })
    res.status(201).json(newRole)
  } catch (error) {
    console.log('Error saving data to the database.', error)
    res.status(500).json({ error: 'Error saving data. - controller' })
  }
}
export async function deleteRole (req, res) {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'The role id is required.' })
  try {
    const result = await roleService.deleteRole({ id })
    if (!result.success) return res.status(404).json({ error: result.message })
    res.json(result)
  } catch (error) {
    console.log('Error removing data.', error)
    res.status(500).json({ error: 'Error removing data.' })
  }
}
export async function getRole (req, res) {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'The role id is required.' })
  try {
    const role = await roleService.getRole({ id })
    if (!role.success) return res.status(404).json({ error: role.message })
    res.status(200).json(role)
  } catch (error) {
    console.log('Error fetching information.', error.message)
    res.status(500).json({ error: 'Error fetching information.' })
  }
}
export async function getRoles (_req, res) {
  try {
    const roles = await roleService.getRoles()
    if (!roles.success) return res.status(404).json({ error: roles.message })
    res.status(200).json(roles)
  } catch (error) {
    console.log('Error fetching information.', error)
    res.status(500).json({ error: 'Error fetching information.' })
  }
}
export async function updateRole (req, res) {
  const { id } = req.params
  const role = req.body
  if (!id) return res.status(400).json({ error: 'The role id is required.' })
  if (!role) return res.status(400).json({ error: 'The role is required.' })
  try {
    const result = await roleService.updateRole({ id, role })
    if (!result.success) return res.status(404).json({ error: result.message })
    res.json(result)
  } catch (error) {
    console.log('Error updating data.', error)
    res.status(500).json({ error: 'Error updating data.' })
  }
}
