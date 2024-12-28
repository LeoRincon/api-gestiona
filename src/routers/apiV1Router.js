import { Router } from "express";

import userRouters from "./users.js";
import suppliesRouters from "./supplies.js";
import expensesRouters from "./expenses.js";

const apiV1Router = Router();
const APIV1 = '/api/v1';

apiV1Router.use(APIV1, userRouters);
apiV1Router.use(`${APIV1}/supplies`, suppliesRouters);
apiV1Router.use(`${APIV1}/expenses`, expensesRouters);

export default apiV1Router;
