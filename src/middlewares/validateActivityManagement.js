import { validateActivityManagement } from '../schemas/activitiesManagement.js';

export function verifyActivityManagement(req, res, next) {
 const body = req.body;
 const data = validateActivityManagement(body);
 if (!data.success) return res.status(400).json({ error: data.error.errors });
 next();
}
