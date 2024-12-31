import { validateEmail, validatePassword } from '../schemas/users.js'

export function validateCredentials (req, res, next) {
  const { email, password } = req.body
  console.log(email, password)
  const resultEmail = validateEmail(email)
  const resultPassword = validatePassword(password)
  console.log('email: ', resultEmail, ' password: ', resultPassword)
  if (!resultEmail.success) return res.status(400).json({ error: resultEmail.error.errors })
  if (!resultPassword.success) return res.status(400).json({ error: resultPassword.error.errors })

  next()
}
