import { Router } from 'express';
import { getUnitMeasurement, getUnitsMeasurement, postUnitMeasurement, putUnitMeasurement, deleteUnitMeasurement} from '../controllers/unitMeasurement.js'; 
import validateID from '../middlewares/validateID.js';
import { verifyUnitMeasurement } from '../middlewares/validateUnitMeasurement.js';

const unitMeasurementRouters = Router()

unitMeasurementRouters.get('/units',getUnitsMeasurement)
unitMeasurementRouters.get('/units/:id',validateID,getUnitMeasurement)
unitMeasurementRouters.post('/units',verifyUnitMeasurement,postUnitMeasurement)
unitMeasurementRouters.put('/units/:id',verifyUnitMeasurement,putUnitMeasurement)
unitMeasurementRouters.delete('/units/:id',validateID,deleteUnitMeasurement)

export default unitMeasurementRouters