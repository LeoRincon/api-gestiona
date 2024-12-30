import { Router } from "express";
import { getActivities, getActivity,postActivity, deleteActivity, putActivity } from "../controllers/activity.js";
import validateID from "../middlewares/validateID.js";
import { verifyActivity } from "../middlewares/validateActivity.js";

const activityRouter = Router();

activityRouter.get('/activity',getActivities)
activityRouter.get('/activity/:id',validateID,getActivity)
activityRouter.post('/activity',verifyActivity,postActivity)
activityRouter.put('/activity/:id',validateID,verifyActivity,putActivity)
activityRouter.delete('/activity/:id',validateID,deleteActivity)



export default activityRouter;

