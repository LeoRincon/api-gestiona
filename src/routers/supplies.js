import { Router } from 'express';
import * as suppliesController from '../controllers/supplies.js';

const suppliesRouter = Router();

suppliesRouter.get('/supplies', suppliesController.getSuppliesController);
suppliesRouter.get('/supplies/:id', suppliesController.getSupplyController);
suppliesRouter.post('/supplies', suppliesController.postSupplyController);
suppliesRouter.put('/supplies/:id', suppliesController.putSupplyController);
suppliesRouter.delete(
 '/supplies/:id',
 suppliesController.deleteSupplyController
);

export default suppliesRouter;
