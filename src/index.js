import express from "express"
import userRouters from "./routers/users.js"
const PORT = process.env.PORT || 8080

const app = express()

app.use(userRouters)

app.listen(PORT)
console.log(`app running on port ${PORT}`)

