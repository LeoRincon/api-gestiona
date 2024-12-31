import { Router } from 'express';
import {
 getActivitiesManagement,
 getActivitiesManagementByID,
 createActivitiesManagement,
 deleteActivityManagement,
 updatedActivityManagement,
} from '../controllers/activityManagement.js';

const activityRouters = Router();

activityRouters.get('/activities-management', getActivitiesManagement);
activityRouters.get('/activities-management/:id', getActivitiesManagementByID);
activityRouters.post('/activities-management', createActivitiesManagement);
activityRouters.put('/activities-management/:id', updatedActivityManagement);
activityRouters.delete('/activities-management/:id', deleteActivityManagement);

export default activityRouters;
