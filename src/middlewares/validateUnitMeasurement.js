import { validateUnitMeasurement } from "../schemas/unitMeasurementSchema.js";

export function verifyUnitMeasurement (req,res,next){
    const body = req.body
    const data = validateUnitMeasurement(body)
    if(!data.success) return res.status(400).json({error: data.error.errors})
    next()
}