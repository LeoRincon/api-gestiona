import { Router } from 'express';
import {
 getActivitiesManagement,
 getActivitiesManagementByID,
 createActivitiesManagement,
 deleteActivityManagement,
 updatedActivityManagement,
} from '../controllers/activityManagement.js';
import { verifyActivityManagement } from '../middlewares/validateActivityManagement.js';
import validateID from '../middlewares/validateID.js';

const activityRouters = Router();

activityRouters.get('/activities-management', getActivitiesManagement);
activityRouters.get(
 '/activities-management/:id',
 validateID,
 getActivitiesManagementByID
);
activityRouters.post(
 '/activities-management',
 verifyActivityManagement,
 createActivitiesManagement
);
activityRouters.put(
 '/activities-management/:id',
 validateID,
 verifyActivityManagement,
 updatedActivityManagement
);
activityRouters.delete(
 '/activities-management/:id',
 validateID,
 deleteActivityManagement
);

export default activityRouters;
