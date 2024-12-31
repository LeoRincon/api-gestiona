import { Router } from 'express'
import { login, logout } from '../controllers/authController.js'
import { validateCredentials } from '../middlewares/validateCredentials.js'

const authRouters = Router()

authRouters.post('/login', validateCredentials, login)
authRouters.get('/logout', logout)

export default authRouters
