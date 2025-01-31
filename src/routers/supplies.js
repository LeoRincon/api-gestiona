import { Router } from "express";
import * as suppliesController from "../controllers/supplies.js";
import validateID from "../middlewares/validateID.js"; 
import { verifySupplies } from "../middlewares/ValidateSupplies.js"; 

const suppliesRouter = Router();

suppliesRouter.get('/supplies', suppliesController.getSuppliesController);
suppliesRouter.get('/supplies/:id', validateID, suppliesController.getSupplyController);
suppliesRouter.post('/supplies', verifySupplies, suppliesController.postSupplyController);
suppliesRouter.put('/supplies/:id', validateID, verifySupplies, suppliesController.putSupplyController);
suppliesRouter.delete('/supplies/:id', validateID, suppliesController.deleteSupplyController);
suppliesRouter.get('/inventory/:id/supplies', validateID, suppliesController.getAllSuppliesByInventoryId );

export default suppliesRouter;