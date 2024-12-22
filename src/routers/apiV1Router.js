import { Router } from "express"
import { SeasonService } from "../services/season.js"
import userRouters from "./users.js";
import saleRouters from "./saleRouter.js";
import newsRouters from "./new.js";

const apiV1Router = Router()

const APIV1 = '/api/v1'

apiV1Router.use(APIV1, userRouters);
apiV1Router.use(APIV1, saleRouters)//PUBLICAR API
apiV1Router.use(APIV1, createSeasonRouter({ seasonService: SeasonService }));
apiV1Router.use(APIV1, newsRouters);

export default apiV1Router