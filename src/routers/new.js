import { Router } from "express";
import { getAllNews, createNew, getNewById, removeNewById, updateNew } from "../controllers/news.js";

const newsRouters = Router()

newsRouters.get('/news', getAllNews)
newsRouters.post('/news', createNew);
newsRouters.get('/news/:id', getNewById);
newsRouters.delete('/news/:id', removeNewById);
newsRouters.patch('/news/:id', updateNew);

export default newsRouters;



