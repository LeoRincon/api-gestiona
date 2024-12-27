import { validateSeason, validatePartialSeason } from '../schemas/seasons.js'

export function verifySeason (req, res, next) {
  const season = req.body
  const result = validateSeason(season)
  if (!result.success) return res.status(400).json({ error: result.error.errors })
  req.body = result.data

  next()
}

export function verifyPartialSeason (req, res, next) {
  const season = req.body
  const result = validatePartialSeason(season)
  if (!result.success) return res.status(400).json({ error: result.error.errors })
  req.body = result.data

  next()
}
