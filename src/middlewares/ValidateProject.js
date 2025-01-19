import { validateProject } from '../schemas/project.js';

export function verifyProject(req, res, next) {
 const body = req.body;
 const data = validateProject(body);
 if (!data.success) return res.status(400).json({ error: data.error.errors });
 next();
}
