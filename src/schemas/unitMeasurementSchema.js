import {z} from 'zod'

const schema = z.object({
    unidad: z
        .string({
            invalid_type_error: 'The unit must be a string',
            required_error: 'The unit is required',
        })
        .min(1,
            {message:'The unit must contain at least 1 character'})
        .max(50,
            {message:'The unit must contain at most 50 characters'}
        ),
    descripcion: z
        .string({
            invalid_type_error: 'the description must be a string',
            required_error: 'the description is required',
        })
        .min(1,
            {message:'The description must contain at least 1 character'})
        .max(45,
            {message:'The description must contain at most 45 characters'}
        )
})

export function validateUnitMeasurement(input){
    try {
        return schema.safeParse(input)
    } catch (error) {
        console.log('Unit of measurement validation Error: ',error)
    }
}
