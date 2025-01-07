import { z } from 'zod'

const rolesSchema = z.object({
  nombre: z
    .string({ invalid_type_error: 'the name of the role must be a string' })
    .min(5, { message: 'the name of the role must be at least 5 characters long' })
    .max(100, { message: 'the name of the role must be at most 100 characters long' })
    .nonempty({ message: 'the name of the role is required' }),
  descripcion: z
    .string({ invalid_type_error: 'the description of the role must be a string' })
    .min(10, { message: 'the description of the role must be at least 10 characters long' })
    .max(255, { message: 'the description of the role must be at most 255 characters long' })
    .nonempty({ message: 'the description of the role is required' })
})

export function validateRole (input) {
  try {
    return rolesSchema.safeParse(input)
  } catch (error) {
    console.log('Error validating role.', error)
    return null
  }
}
export function validatePartialRole (input) {
  try {
    return rolesSchema.partial().safeParse(input)
  } catch (error) {
    console.log('Error validating role.', error)
    return null
  }
}
