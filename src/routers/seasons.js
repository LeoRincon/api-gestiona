import { Router } from 'express'
import * as seasonController from '../controllers/seasons.js'
import validateID from '../middlewares/validateID.js'
import { verifyPartialSeason, verifySeason } from '../middlewares/validateSeason.js'

const CROP_BASE_URL = '/crops'
const CROP_ID_PARAM = '/:id'
const SEASON_BASE_URL = '/seasons'
const SEASON_ID_PARAM = CROP_ID_PARAM
const SEASONS_BY_CROP_ID_URL = CROP_BASE_URL + CROP_ID_PARAM + SEASON_BASE_URL
const SEASON_ID_URL = SEASON_BASE_URL + SEASON_ID_PARAM

const seasonRouter = Router()

seasonRouter.delete(SEASON_ID_URL, validateID, verifyPartialSeason, seasonController.deleteSeason)
seasonRouter.get(SEASON_BASE_URL, seasonController.getAll)
seasonRouter.get(SEASON_ID_URL, validateID, seasonController.getById)
seasonRouter.get(SEASONS_BY_CROP_ID_URL, validateID, seasonController.getAllByIdCrop)
seasonRouter.patch(SEASON_ID_URL, validateID, seasonController.updateSeason)
seasonRouter.post(SEASON_BASE_URL, verifySeason, seasonController.createSeason)
seasonRouter.put(SEASON_ID_URL, validateID, verifySeason, seasonController.modifySeason)

export default seasonRouter
