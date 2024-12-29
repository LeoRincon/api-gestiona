import { validateActivity } from "../schemas/activitySchema.js";

export function verifyActivity(req, res, next){
    const body = req.body
    const data = validateActivity(body) 
    if(!data.success) return res.status(400).json({error: data.error.errors})
    next()
}