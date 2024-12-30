import { Router } from 'express'
import { getCrops, getCrop, postCrop, putCrop, deleteCrop } from '../controllers/crop.js'

const cropRouters = Router()

cropRouters.get('/crops', getCrops)
cropRouters.get('/crops/:id', getCrop)
cropRouters.post('/crops', postCrop)
cropRouters.put('/crops/:id', putCrop)
cropRouters.delete('/crops/:id', deleteCrop)

export default cropRouters
