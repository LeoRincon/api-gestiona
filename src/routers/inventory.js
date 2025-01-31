import { Router } from 'express'
import { getInventories, getInventory, postInventory, putInventory,deleteInventory,getAllInventoriesByProjectId } from '../controllers/inventory.js'
import validateID from '../middlewares/validateID.js';

const inventoryRouter = Router()

inventoryRouter.get('/inventories', getInventories)
inventoryRouter.get('/inventories/:id',validateID, getInventory)
inventoryRouter.post('/inventories', postInventory)
inventoryRouter.put('/inventories/:id',validateID, putInventory)
inventoryRouter.delete('/inventories/:id',validateID, deleteInventory)
inventoryRouter.get('/project/:id/inventories',validateID, getAllInventoriesByProjectId)

export default inventoryRouter