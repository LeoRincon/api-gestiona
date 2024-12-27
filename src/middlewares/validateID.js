import { validateId } from '../schemas/seasons.js'

function validateID (req, res, next) {
  const { id } = req.params
  const result = validateId(id)
  if (!result.success) return res.status(400).json({ error: result.error.errors })
  next()
}

export default validateID
