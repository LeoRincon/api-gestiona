import { Router } from 'express'
import validateID from '../middlewares/validateID.js'
import verifyRole from '../middlewares/validateRole.js'
import * as roleController from '../controllers/roles.js'

const ROLE_BASE = '/roles'
const ROLE_ID = '/:id'
const ROLE_ID_URL = ROLE_BASE + ROLE_ID

const roleRouters = Router()

roleRouters.delete(ROLE_ID_URL, validateID, roleController.deleteRole)
roleRouters.get(ROLE_ID_URL, validateID, roleController.getRole)
roleRouters.get(ROLE_BASE, roleController.getRoles)
roleRouters.post(ROLE_BASE, verifyRole, roleController.createRole)
roleRouters.put(ROLE_ID_URL, validateID, roleController.updateRole)

export default roleRouters
