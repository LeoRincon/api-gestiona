import { z } from 'zod'

const userHasSchema = z.object({
  usuario_id: z
    .string({ invalid_type_error: 'the crop id must be a string' })
    .uuid({ invalid_type_error: 'the user id must be a UUID' })
    .nonempty({ message: 'the user id is required' }),
  proyecto_id: z
    .string({ invalid_type_error: 'the project id must be a string' })
    .uuid({ invalid_type_error: 'the project id must be a UUID' })
    .nonempty({ message: 'the project id is required' }),
  id_rol: z
    .string({ invalid_type_error: 'the project id must be a string' })
    .uuid({ invalid_type_error: 'the project id must be a UUID' })
    .nonempty({ message: 'the project id is required' })
})

export function validateUserHas (input) {
  try {
    return userHasSchema.safeParse(input)
  } catch (error) {
    console.log('Error validating user-has', error)
    return null
  }
}

export function validatePartialUserHas (input) {
  try {
    return userHasSchema.partial().safeParse(input)
  } catch (error) {
    console.log('Error validating user-has', error)
    return null
  }
}
