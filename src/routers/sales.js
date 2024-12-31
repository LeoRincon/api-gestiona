import { Router } from 'express'
import { getAllsale, postSale, deleteSale, putSale } from '../controllers/saleController.js'

const saleRouter = Router()

saleRouter.get('/sales', getAllsale)
saleRouter.post('/sales', postSale)
saleRouter.put('/sales/:id', putSale)
saleRouter.delete('/sales/:id', deleteSale)

export default saleRouter
