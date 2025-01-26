import { Router } from 'express'
import { getInventories } from '../controllers/inventory.js'


const inventoryRouter = Router()

inventoryRouter.get('/inventories', getInventories)

export default inventoryRouter