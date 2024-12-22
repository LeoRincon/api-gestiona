import { Router } from "express";
import { getSuppliesController } from "../controllers/supplies.js";

const suppliesRouter = Router();

suppliesRouter.get('/', getSuppliesController);

export default suppliesRouter;
