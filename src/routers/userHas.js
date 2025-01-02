import { Router } from 'express'
import * as userHasController from '../controllers/userHas.js'
import { verifyUserHas } from '../middlewares/validateUserHas.js'
import validateID from '../middlewares/validateID.js'

const userHasRouters = Router()

const PROJECT_BASE = '/projects'
const USER_BASE = '/users'
const USER_HAS_BASE = '/users-has'
const USER_HAS_ID = '/:id'
const USER_ID = USER_HAS_ID
const PROJECT_ID = USER_HAS_ID
const USER_HAS_ID_URL = USER_HAS_BASE + USER_HAS_ID
const USER_ID_AND_USER_HAS_URL = USER_BASE + USER_ID + USER_HAS_BASE
const PROJECT_ID_AND_USER_HAS_URL = PROJECT_BASE + PROJECT_ID + USER_HAS_BASE

userHasRouters.get(USER_HAS_BASE, userHasController.getAll)
userHasRouters.get(USER_HAS_ID_URL, validateID, userHasController.getById)
userHasRouters.get(USER_ID_AND_USER_HAS_URL, validateID, userHasController.getByUserId)
userHasRouters.get(PROJECT_ID_AND_USER_HAS_URL, validateID, userHasController.getByProjectId)
userHasRouters.post(USER_HAS_BASE, verifyUserHas, userHasController.createUserHas)
userHasRouters.put(USER_HAS_ID_URL, validateID, verifyUserHas, userHasController.updateUserHas)
userHasRouters.delete(USER_HAS_ID_URL, validateID, userHasController.deleteUserHas)

export default userHasRouters
