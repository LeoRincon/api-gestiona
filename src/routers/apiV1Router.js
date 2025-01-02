import { Router } from 'express';
import activityRouter from './activity.js';
import cropRouters from './crop.js';
import newsRouters from './new.js';
import saleRouter from './sales.js';
import seasonRouter from './seasons.js';
import userRouters from './users.js';
import projectRouters from './project.js';



const apiV1Router = Router();

const APIV1 = '/api/v1';

apiV1Router.use(APIV1, activityRouter);
apiV1Router.use(APIV1, cropRouters);
apiV1Router.use(APIV1, newsRouters);
apiV1Router.use(APIV1, saleRouter);
apiV1Router.use(APIV1, seasonRouter);
apiV1Router.use(APIV1, userRouters);
apiV1Router.use(APIV1, projectRouters);



export default apiV1Router;
