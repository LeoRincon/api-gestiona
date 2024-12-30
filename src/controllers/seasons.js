import * as seasonService from '../services/season.js'

export async function getAll (_req, res) {
  try {
    const seasons = await seasonService.getAll()
    if (!seasons.success) return res.status(404).json({ error: seasons.message })
    res.json(seasons)
  } catch (error) {
    console.log('GET Controller error.', error)
    res.status(500).json({ error: 'Error fetching information.' })
  }
}

export async function getAllByIdCrop (req, res) {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'The crop id is required.' })
  try {
    const seasons = await seasonService.getAllByIdCrop({ idCrop: id })
    if (!seasons.success) return res.status(404).json({ error: seasons.message })
    res.status(200).json(seasons)
  } catch (error) {
    console.log('GET Controller error.', error)
    res.status(500).json({ error: 'Error fetching information.' })
  }
}

export async function getById (req, res) {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'The season id is required.' })
  try {
    const season = await seasonService.getById({ id })
    if (!season.success) return res.status(404).json({ error: season.message })
    res.status(200).json(season)
  } catch (error) {
    console.log('Error fetching information.', error.message)
    res.status(500).json({ error: 'Error fetching information.' })
  }
}

export async function createSeason (req, res) {
  const season = req.body
  if (!season) return res.status(400).json({ error: 'The season is required.' })
  try {
    const newSeason = await seasonService.createSeason({ season })
    res.status(201).json(newSeason)
  } catch (error) {
    console.log('Error saving data to the database.', error)
    res.status(500).json({ error: 'Error saving data.' })
  }
}

export async function deleteSeason (req, res) {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'The season id is required.' })
  try {
    const result = await seasonService.deleteSeason({ id })
    res.json(result)
  } catch (error) {
    console.log('Error removing data.', error)
    res.status(500).json({ error: 'Error removing data.' })
  }
}

export async function modifySeason (req, res) {
  const { id } = req.params
  const season = req.body
  if (!id) return res.status(400).json({ error: 'The season id is required.' })
  if (!season) return res.status(400).json({ error: 'The season is required.' })
  try {
    const updatedSeason = await seasonService.modifySeason({ id, season })
    res.json(updatedSeason)
  } catch (error) {
    console.log('Error updating data in the database.', error)
    res.status(500).json({ error: 'Error modifying data.' })
  }
}

export async function updateSeason (req, res) {
  const { id } = req.params
  const season = req.body
  if (!id) return res.status(400).json({ error: 'The season id is required.' })
  if (!season) return res.status(400).json({ error: 'The season is required.' })
  try {
    const updatedSeason = await seasonService.updateSeason({ id, season })
    res.json(updatedSeason)
  } catch (error) {
    console.log('Error updating data in the database.', error)
    res.status(500).json({ error: 'Error updating data.' })
  }
}
