import { Router } from "express"
import { SeasonService } from "../services/season.js"
import userRouters from "./users.js";
import saleRouters from "./saleRouter.js";
const apiV1Router = Router()

const APIV1 = '/api/v1'

apiV1Router.use(APIV1, userRouters);
apiV1Router.use(APIV1, saleRouters)//PUBLICAR API
apiV1Router.use(APIV1, createSeasonRouter({ seasonService: SeasonService }));

export default apiV1Router