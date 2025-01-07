import { validateProduct as validateProductSchema } from "../schemas/productSchema.js";

export function validateProduct(req, res, next) {
  const body = req.body;
  const validationResult = validateProductSchema(body);

  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error.errors });
  }

  req.body = validationResult.data;
  next();
}

