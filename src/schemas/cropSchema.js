import {z} from 'zod'

const schema = z.object({
    nombre_cultivo: z
        .string({
            invalid_type_error: 'The name of the crop must be a string',
            required_error: 'The name of the crop is required',
        })
        .min(1,
            {message:'The name must contain at least 1 character'})
        .max(100,
            {message:'The name must contain at most 100 characters'}),
    tipo_siembra: z
        .string({
            invalid_type_error: 'The type of sowing must be a string',
            required_error: 'The type of sowing is required',
        })
        .min(1,
            {message:'The type of sowing must contain at least 1 character'})
        .max(100,
            {message:'The type of sowing must contain at most 100 characters'}),
    fecha_inicio: z
        .string({
            invalid_type_error: 'The start date of crop must be a string',
            required_error: 'The start date of crop is required',
        })
        .date({
            invalid_type_error: 'the start date of crop must be a date'
        }),
    area_terreno: z
        .number({
            invalid_type_error: 'The crop area must be a number',
            required_error: 'The crop area is required',
        })
        .min(0.1,
            {message:'The crop area must contain at least 1 digit'}),
    proyecto_id: z
        .string({
            invalid_type_error: 'The id of the project must be a string',
            required_error: 'The id of the project is required',
        })
        .uuid(),
    id_unidad_medida: z
        .string({
            invalid_type_error: 'The id of the unit of measure must be a string',
            required_error: 'The id of the unit of measure is required',
        })
        .uuid()
})

export function validateCrop (input){
    try {
        return schema.safeParse(input)
    } catch (error) {
        console.log('Crop validation Error: ',error)
    }
}