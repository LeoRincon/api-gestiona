import { z } from "zod";

/**
 * Zod schema for validating season objects.
 */
const seasonSchema = z.object({
    nombre_temporada: z.string({
        invalid_type_error: "El nombre de la temporada debe ser un string",
        required_error: "El nombre de la temporada es requerido",
    }),
    duracion: z.number().int().positive().min(1),
    fecha_inicio: z.string().datetime(),
    fecha_fin: z.string().datetime(),
    id_cultivo: z.string().uuid(),
    novedades_id: z.string().uuid().optional(),
})

/**
 * Validates a season object against the season schema.
 * @param {Object} input - The season object to validate.
 * @returns {Object} The result of the validation. Contains either the validated data or validation errors.
 */
export function validateSeason(input) {
    try {
        return seasonSchema.safeParse(input)
    } catch (error) {
        console.error("Error validating season", error)
        return null
    }
}

/**
 * Validates a partial season object against the season schema.
 * @param {Object} input - The partial season object to validate.
 * @returns {Object} The result of the validation. Contains either the validated data or validation errors.
 */
export function validatePartialSeason(input) {
    try {
        return seasonSchema.partial().safeParse(input)
    } catch (error) {
        console.error("Error validating season", error)
        return null
    }
}