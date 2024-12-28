import express from "express"
import apiV1Router from "./routers/apiV1Router.js"

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())

app.use(apiV1Router)

app.listen(PORT)
console.log(`app running on port ${PORT}`)