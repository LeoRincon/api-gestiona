import { z } from "zod";

const productSchema = z.object({
  cantidad_recolectada: z
    .number({ invalid_type_error: "La cantidad recolectada debe ser un número." })
    .positive({ message: "La cantidad recolectada debe ser un número positivo." })
    .min(1, { message: "La cantidad recolectada debe ser como mínimo 1." }),

  fecha_recoleccion: z
    .string({ invalid_type_error: "La fecha de recolección debe ser de tipo string." })
    .nonempty({ message: "La fecha de recolección es requerida." })
    .refine(
      (date) => !isNaN(new Date(date).getTime()),
      { message: "La fecha de recolección debe ser una fecha válida." }
    ),

  id_temporada: z
    .string({ invalid_type_error: "El ID de temporada debe ser de tipo string." })
    .uuid({ message: "El ID de temporada debe ser un UUID válido." })
    .nonempty({ message: "El ID de temporada es requerido." }),

  id_unidad_medida: z
    .string({ invalid_type_error: "El ID de unidad de medida debe ser de tipo string." })
    .uuid({ message: "El ID de unidad de medida debe ser un UUID válido." })
    .nonempty({ message: "El ID de unidad de medida es requerido." }),

  observaciones: z
    .string({ invalid_type_error: "Las observaciones deben ser de tipo string." })
    .max(500, {
      message: "Las observaciones deben contener como máximo 500 caracteres.",
    })
    .optional(),
}).strict({ message: "No se permiten campos adicionales." });

export function validateProduct(input) {
  try {
    return productSchema.safeParse(input);
  } catch (error) {
    console.log("Error validating product:", error);
    return { success: false, error };
  }
}

