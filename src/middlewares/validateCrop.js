import { validateCrop } from "../schemas/cropSchema.js";

export function verifyCrop (req,res,next){
    const body = req.body
    const data = validateCrop(body)
    if(!data.success) return res.status(400).json({error: data.error.errors})
    next()
}