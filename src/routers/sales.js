import { Router } from "express";
import { getAllsale ,getSale , postSale , deleteSale, putSale} from "../controllers/saleController.js";
import validateID from '../middlewares/validateID.js'
import { verifySale} from '../middlewares/validateSale.js'

const saleRouter = Router();

saleRouter.get('/sale',getAllsale)
saleRouter.get('/sale/:id',validateID,getSale)
saleRouter.post('/sale',verifySale,postSale)
saleRouter.put('/sale/:id',validateID,verifySale,putSale)
saleRouter.delete('/sale/:id',validateID,deleteSale)



export default saleRouter;