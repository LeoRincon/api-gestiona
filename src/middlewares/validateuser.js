import { validateUser as validateUserSchema } from "../schemas/users.js";

export function validateUser(req, res, next) {
  const body = req.body;
  const validationResult = validateUserSchema(body);

  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error.errors });
  }

  req.body = validationResult.data;
  next();
}
