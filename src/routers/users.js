import { Router } from "express"
import { getUsers } from "../controllers/users.js";

const userRouters = Router()

userRouters.get('/users', getUsers)


export default userRouters;
