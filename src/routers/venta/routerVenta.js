import { Router } from "express"
import { getVenta } from "../../controllers/venta/controllerVenta.js";

const ventaRouters = Router()

ventaRouters.get('/allVentas', getVenta)

export default ventaRouters;