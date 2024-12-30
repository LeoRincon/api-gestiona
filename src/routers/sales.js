import { Router } from "express";
import { getAllsale ,getUnit ,postSale , deleteSale, putSale} from "../controllers/saleController.js";

const saleRouter = Router();

saleRouter.get('/sale',getAllsale)
saleRouter.get('/unit',getUnit)
saleRouter.post('/sale',postSale)
saleRouter.put('/sale/:id',putSale)
saleRouter.delete('/sale/:id',deleteSale)



export default saleRouter;