import { validateRole } from '../schemas/roles.js'

export default function verifyRole (req, res, next) {
  const role = req.body
  const result = validateRole(role)
  if (!result.success) return res.status(400).json({ message: result.error.errors })
  req.body = result.data
  next()
}
