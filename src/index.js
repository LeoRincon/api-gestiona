import express from "express"
import userRouters  from "./routers/users.js"
import ventaRouters from "./routers/venta/routerVenta.js"
const PORT = process.env.PORT || 8080

const app = express()

app.use(userRouters)
app.use(ventaRouters)//PUBLICAR API

app.listen(PORT)
console.log(`app running on port ${PORT}`)

