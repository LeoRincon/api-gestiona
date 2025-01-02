import { z } from "zod";

const schema = z.object({
  cantidad_vendida: z
    .number({ invalid_type_error: "la cantidad vendida debe ser un numero" })
    .positive({ message: "el numero debe ser positivo" })
    .min(1, { message: "la cantidad debe ser como minimo 1" }),

  precio_total: z
    .number({ invalid_type_error: "el precio total debe ser un numero" })
    .positive({ message: "el precio total debe ser un numero positivo" })
    .min(50, { message: "el precio debe ser minimo 50" }),

  fecha_venta: z
    .string({ invalid_type_error: "la fecha debe ser de tipo string" })
    .date({ message: "la fecha de venta debe ser un date" })
    .nonempty({ mensage: "la fecha de venta es  requerida" }),
  id_temporada: z
    .string({ invalid_type_error: "el ID temporada debe ser de tipo string" })
    .uuid({ message: "el ID de la temporada debe ser un UUID" })
    .nonempty({ mensage: "el ID de temporada es requerido" }),
  observaciones: z
    .string({
      invalid_type_error: "The observaciones of the sale must be a string",
    })
    .min(1, {
      message: "The observaciones of sale must contain at least 1 character",
    })
    .max(500, {
      message: "The observaciones of sale must contain at most 100 characters",
    }),
  id_unidad_medida: z
    .string({
      invalid_type_error: "el ID de unidad de medida debe ser de tipo string",
    })
    .uuid({ message: "el ID unidad de medida dedeser UUID" })
    .nonempty({ mensage: "el ID de unidad de medida es requerido" }),
  precio_unitario: z
    .number({ invalid_type_error: "el precio unitario debe ser un numero" })
    .positive({ message: "el precio unitario debe ser un numero positivo" })
    .min(50, { message: "el precio debe ser minimo 50" }),
});
export function validateSale(input) {
  try {
    return schema.safeParse(input);
  } catch (error) {
    console.log("Sale validation Error: ", error);
  }
}
