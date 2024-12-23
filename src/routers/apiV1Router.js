import { Router } from "express"
import userRouters from "./users.js";
import activityRouter from "./activity.js";
import newsRouters from "./new.js";

const apiV1Router = Router()

const APIV1 = '/api/v1'

apiV1Router.use(APIV1, userRouters);
apiV1Router.use(APIV1, activityRouter);
apiV1Router.use(APIV1, newsRouters);

export default apiV1Router