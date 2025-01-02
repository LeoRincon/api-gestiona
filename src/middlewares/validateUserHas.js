import { validateUserHas, validatePartialUserHas } from '../schemas/userHas.js'

export function verifyUserHas (req, res, next) {
  const userHas = req.body
  const result = validateUserHas(userHas)
  if (!result) return res.status(400).json({ error: 'It was not possible to verify the provided data' })
  if (!result.success) return res.status(400).json({ error: result.error.errors })
  req.body = result.data

  next()
}
export function verifyPartialUserHas (req, res, next) {
  const userHas = req.body
  const result = validatePartialUserHas(userHas)
  if (!result) return res.status(400).json({ error: 'It was not possible to verify the provided data' })
  if (!result.success) return res.status(400).json({ error: result.error.errors })
  req.body = result.data

  next()
}
