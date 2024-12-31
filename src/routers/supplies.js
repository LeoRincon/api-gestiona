import { Router } from "express";
import * as suppliesController from "../controllers/supplies.js";
import validateID from "../middlewares/validateID.js"; 
import { verifySupplies } from "../middlewares/ValidateSupplies.js"; 

const suppliesRouter = Router();

suppliesRouter.get('/', suppliesController.getSuppliesController);
suppliesRouter.get('/:id', validateID, suppliesController.getSupplyController);
suppliesRouter.post('/', verifySupplies, suppliesController.postSupplyController);
suppliesRouter.put('/:id', validateID, verifySupplies, suppliesController.putSupplyController);
suppliesRouter.delete('/:id', validateID, suppliesController.deleteSupplyController);

export default suppliesRouter;
