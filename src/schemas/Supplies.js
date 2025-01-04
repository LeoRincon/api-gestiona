import { z } from 'zod';

const schema = z.object({
    nombre_insumo: z
        .string({
            invalid_type_error: 'Supply name must be a string',
            required_error: 'Supply name is required',
        })
        .min(1, { message: 'Supply name cannot be empty' })
        .max(100, { message: 'Supply name too long' }),

    cantidad_disponible: z
        .number({
            invalid_type_error: 'Available quantity must be a number',
            required_error: 'Available quantity is required',
        })
        .min(0, { message: 'Available quantity cannot be negative' }),

    fecha_ingreso: z
        .string({
            invalid_type_error: 'Entry date must be a string',
            required_error: 'Entry date is required',
        })
        .datetime({ message: 'Invalid date format' }),

    precio_insumo: z
        .number({
            invalid_type_error: 'Supply price must be a number',
            required_error: 'Supply price is required',
        })
        .min(0, { message: 'Supply price cannot be negative' }),

    id_inventario: z
        .string({
            invalid_type_error: 'Inventory ID must be a string',
            required_error: 'Inventory ID is required',
        })
        .uuid({ message: 'Must be a valid UUID' }),

    id_categoria: z
        .string({
            invalid_type_error: 'Category ID must be a string',
            required_error: 'Category ID is required',
        })
        .uuid({ message: 'Must be a valid UUID' }),

    id_unidad_medida: z
        .string({
            invalid_type_error: 'Unit measure ID must be a string',
            required_error: 'Unit measure ID is required',
        })
        .uuid({ message: 'Must be a valid UUID' })
});

export function validateSupply(input) {
    try {
        return schema.safeParse(input);
    } catch (error) {
        console.error('Supply validation error:', error);
        return {
            success: false,
            error
        };
    }
}