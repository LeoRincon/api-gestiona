
import { validateSale } from "../schemas/saleSchema.js";

export function verifySale(req, res, next){
    const body = req.body
    const data = validateSale(body) 
    if(!data.success) return res.status(400).json({error: data.error.errors})
    req.body = data.data
    next()
}