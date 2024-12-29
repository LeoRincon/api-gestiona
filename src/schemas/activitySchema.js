import {z} from 'zod'

const schema = z.object({
    nombre: z
        .string({
            invalid_type_error: 'The name of the activity must be a string',
            required_error: 'The name of the activity is required',
        })
        .min(1,
            {message:'The name of activity must contain at least 1 character'})
        .max(100,
            {message:'The name of activity must contain at most 100 characters'}
        ),
    descripcion: z
        .string({
            invalid_type_error: 'the description of the activity must be a string',
            required_error: 'the description of the activity is required',
        })
        .min(1,
            {message:'The description of activity must contain at least 1 character'})
        .max(100,
            {message:'The description of activity must contain at most 100 characters'}
        ),
    id_categoria:z
        .string({
            invalid_type_error: 'the id of category must be a string',
            required_error: 'the id of category is required',
        })
        .uuid()
})

export function validateActivity(input){
    try {
        return schema.safeParse(input)
    } catch (error) {
        console.log('Activity validation Error: ',error)
    }
}
