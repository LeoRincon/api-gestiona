import { Router } from 'express';
import {
 getActivities,
 getActivity,
 postActivity,
 deleteActivity,
 putActivity,
 getActivitiesByCropId,
} from '../controllers/activity.js';
import validateID from '../middlewares/validateID.js';
import { verifyActivity } from '../middlewares/validateActivity.js';

const activityRouter = Router();

activityRouter.get('/activities', getActivities);
activityRouter.get('/season/:id/activities', getActivitiesByCropId);
activityRouter.get('/activities/:id', validateID, getActivity);
activityRouter.post('/activities', verifyActivity, postActivity);
activityRouter.put('/activities/:id', validateID, verifyActivity, putActivity);
activityRouter.delete('/activities/:id', validateID, deleteActivity);

export default activityRouter;
