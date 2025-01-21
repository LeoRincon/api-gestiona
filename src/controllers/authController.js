import { getServiceUsersByEmail } from '../services/user.js'
import bcrypt from 'bcrypt'

export async function login (req, res) {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'The email and password are required.' })
  try {
    const user  = await getServiceUsersByEmail(email)

    if (!user) return res.status(404).json({ error: 'User not found. Please Check your email' })

    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    console.log(isValidPassword)

    if (!isValidPassword) return res.status(401).json({ error: 'Invalid Password. Please Check your password' })

    // Create Session
    req.session.user = {
      id: user.id,
      username: user.nombre,
      email: user.email
    }

    res.status(200).json({ message: 'Login successful' })
  } catch (error) {
    console.log('Error logging in.', error)
    res.status(500).json({ error: 'Error logging in.' })
  }
}

export async function logout (req, res) {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'An error occurred during logout. please try again' })

    res.status(200).json({ message: 'Logout succesful' })
  })
}
