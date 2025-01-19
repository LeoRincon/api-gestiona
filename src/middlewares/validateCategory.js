import { validateCategory } from '../schemas/category.js';

export function verifyCategory(req, res, next) {
 const body = req.body;
 const data = validateCategory(body);
 if (!data.success) return res.status(400).json({ error: data.error.errors });
 next();
}
