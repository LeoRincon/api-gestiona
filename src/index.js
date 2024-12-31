import express from 'express'
import apiV1Router from './routers/apiV1Router.js'
import session from 'express-session'

const PORT = process.env.PORT || 8080

const { SESSION_SECRET_KEY } = process.env

const app = express()
app.disable('x-powered-by')
app.use(express.json())
app.use(session({
  secret: SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
}))
app.use(apiV1Router)

app.listen(PORT)
console.log(`app running on port ${PORT}`)
