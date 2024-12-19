import { Router } from "express"
import userRouters from "./users.js";

const apiV1Router = Router()

const APIV1 = '/api/v1'

apiV1Router.use(APIV1, userRouters);

export default apiV1Router