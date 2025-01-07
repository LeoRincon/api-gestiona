import { Router } from 'express';
import suppliesRouters from './supplies.js';
import expensesRouters from './expenses.js';
import activityRouter from './activity.js';
import cropRouters from './crop.js';
import newsRouters from './new.js';
import saleRouter from './sales.js';
import seasonRouter from './seasons.js';
import userRouters from './users.js';
import projectRouters from './project.js';
import unitMeasurementRouters from './unitMeasurement.js';
import activityManagementRouters from './activityManagement.js';
import authRouters from './authRouters.js';
import categoryRouters from './category.js';
import roleRouters from './roles.js';
import productRouter from './product.js';

const apiV1Router = Router();

const APIV1 = '/api/v1';

apiV1Router.use(APIV1, authRouters);
apiV1Router.use(APIV1, activityRouter);
apiV1Router.use(APIV1, cropRouters);
apiV1Router.use(APIV1, newsRouters);
apiV1Router.use(APIV1, saleRouter);
apiV1Router.use(APIV1, seasonRouter);
apiV1Router.use(APIV1, suppliesRouters);
apiV1Router.use(APIV1, expensesRouters);
apiV1Router.use(APIV1, activityManagementRouters);
apiV1Router.use(APIV1, userRouters);
apiV1Router.use(APIV1, projectRouters);
apiV1Router.use(APIV1, unitMeasurementRouters);
apiV1Router.use(APIV1, categoryRouters);
apiV1Router.use(APIV1, roleRouters)
apiV1Router.use(APIV1, productRouter);

export default apiV1Router;
