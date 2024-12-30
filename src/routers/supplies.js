import { Router } from "express";
import * as suppliesController from "../controllers/supplies.js";

const suppliesRouter = Router();

suppliesRouter.get('/', suppliesController.getSuppliesController);
suppliesRouter.get('/:id', suppliesController.getSupplyController);
suppliesRouter.post('/', suppliesController.postSupplyController);
suppliesRouter.put('/:id', suppliesController.putSupplyController);
suppliesRouter.delete('/:id', suppliesController.deleteSupplyController);

export default suppliesRouter;
