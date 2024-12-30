import { Router } from "express";
import { getCrops, getCrop, postCrop, putCrop, deleteCrop} from "../controllers/crop.js"; 
import validateID from "../middlewares/validateID.js";
import { verifyCrop } from "../middlewares/validateCrop.js";

const cropRouters = Router()

cropRouters.get('/crop',getCrops)
cropRouters.get('/crop/:id',validateID,getCrop)
cropRouters.post('/crop',verifyCrop,postCrop)
cropRouters.put('/crop/:id',validateID,verifyCrop,putCrop)
cropRouters.delete('/crop/:id',validateID,deleteCrop)

export default cropRouters;