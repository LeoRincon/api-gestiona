import { z } from 'zod';

const schema = z.object({
    id_temporada: z
        .string({
            invalid_type_error: 'Season ID must be a string',
            required_error: 'Season ID is required',
        })
        .uuid({ message: 'Must be a valid UUID' }),

    id_insumo: z
        .string({
            invalid_type_error: 'Supply ID must be a string',
            required_error: 'Supply ID is required',
        })
        .uuid({ message: 'Must be a valid UUID' }),

    cantidad_usada: z
        .number({
            invalid_type_error: 'Used quantity must be a number',
            required_error: 'Used quantity is required',
        })
        .min(0, { message: 'Used quantity cannot be negative' }),

    precio_total: z
        .number({
            invalid_type_error: 'Total price must be a number',
            required_error: 'Total price is required',
        })
        .min(0, { message: 'Total price cannot be negative' }),

    id_unidad_medida: z
        .string({
            invalid_type_error: 'Unit measure ID must be a string',
            required_error: 'Unit measure ID is required',
        })
        .uuid({ message: 'Must be a valid UUID' })
});

export function ValidateExpenses(input) {
    try {
        return schema.safeParse(input);
    } catch (error) {
        console.error('Expense validation error:', error);
        return {
            success: false,
            error
        };
    }
}