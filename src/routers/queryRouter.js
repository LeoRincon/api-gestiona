import { query, Router } from "express";
import {getDataByParam} from "../controllers/queryController.js"

const queryRouter = Router();

queryRouter.post('/query', getDataByParam);

export default queryRouter