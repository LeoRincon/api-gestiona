import { Router } from "express"
import userRouters from "./users.js";
import saleRouters from "./saleRouter.js";
const apiV1Router = Router()

const APIV1 = '/api/v1'

apiV1Router.use(APIV1, userRouters);
apiV1Router.use(APIV1, saleRouters)//PUBLICAR API
export default apiV1Router