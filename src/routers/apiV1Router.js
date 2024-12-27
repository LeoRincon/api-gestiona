import { Router } from "express"
import { SeasonService } from "../services/season.js"
import { createSeasonRouter } from "./seasons.js"
import userRouters from "./users.js";
import activityRouter from "./activity.js";
import newsRouters from "./new.js";
import saleRouter from "./sales.js";
import cropRouters from "./crop.js";

const apiV1Router = Router()

const APIV1 = '/api/v1'

apiV1Router.use(APIV1, userRouters);
apiV1Router.use(APIV1, activityRouter);
apiV1Router.use(APIV1, newsRouters);
apiV1Router.use(APIV1, saleRouter);
apiV1Router.use(APIV1, cropRouters);
apiV1Router.use(APIV1, createSeasonRouter({ seasonService: SeasonService }));

export default apiV1Router