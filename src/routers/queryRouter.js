import { query, Router } from "express";
import {getDataByParam} from "../controllers/queryController.js"

const queryRouter = Router();

queryRouter.get('/query', getDataByParam);

export default queryRouter