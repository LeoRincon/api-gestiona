import { Router } from "express";
import { getActivities, getActivity,postActivity, deleteActivity, putActivity } from "../controllers/activity.js";

const activityRouter = Router();

activityRouter.get('/activity',getActivities)
activityRouter.get('/activity/:id',getActivity)
activityRouter.post('/activity',postActivity)
activityRouter.put('/activity/:id',putActivity)
activityRouter.delete('/activity/:id',deleteActivity)



export default activityRouter;

