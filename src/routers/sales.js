import { Router } from "express";
import { getAllsale ,getSale , postSale , deleteSale, putSale, getAllSalesBySeasonId} from "../controllers/saleController.js";
import validateID from '../middlewares/validateID.js'
import { verifySale} from '../middlewares/validateSale.js'

const saleRouter = Router()

saleRouter.get('/sales',getAllsale)
saleRouter.get('/sales/:id',validateID,getSale)
saleRouter.post('/sales',verifySale,postSale)
saleRouter.put('/sales/:id',validateID,verifySale,putSale)
saleRouter.delete('/sales/:id',validateID,deleteSale)
saleRouter.get('/seasons/:id/sales', getAllSalesBySeasonId)



export default saleRouter
