import { Router } from "express";
import { getCrops, getCrop, postCrop, putCrop, deleteCrop} from "../controllers/crop.js"; 


const cropRouters = Router()

cropRouters.get('/crop',getCrops)
cropRouters.get('/crop/:id',getCrop)
cropRouters.post('/crop',postCrop)
cropRouters.put('/crop/:id',putCrop)
cropRouters.delete('/crop/:id',deleteCrop)

export default cropRouters;