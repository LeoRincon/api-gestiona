import { Router } from "express";

import { getAllSuppliesController } from "../controllers/supplies.js";

const suppliesRouter = Router();

suppliesRouter.get('/supplies', getAllSuppliesController);

export default suppliesRouter;
