import { z } from 'zod'

const userSchema = z.object({
  nombre: z
    .string({ invalid_type_error: 'the name of the user must be a string' })
    .nonempty({ message: 'the name of the user is required' }),
  email: z
    .string({ invalid_type_error: 'the email of the user must be a string' })
    .email({ invalid_type_error: 'Invalid email format. Please enter a valid email address.' })
    .nonempty({ message: 'the email of the user is required' }),
  password: z
    .string({ invalid_type_error: 'the password of the user must be a string' })
    .min(6, { message: 'Password must be longer than 6 characters. Please enter a valid password.' })
    .nonempty({ message: 'the password of the user is required' })
})

export function validateUser (input) {
  try {
    return userSchema.safeParse(input)
  } catch (error) {
    console.log('Error validating user.', error)
    return null
  }
}

export function validatePartialUser (input) {
  try {
    return userSchema.partial().safeParse(input)
  } catch (error) {
    console.log('Error validating user.', error)
    return null
  }
}

export function validateEmail (input) {
  try {
    return userSchema.shape.email.safeParse(input)
  } catch (error) {
    console.log('Error validating user email.', error)
    return null
  }
}

export function validatePassword (input) {
  try {
    return userSchema.shape.password.safeParse(input)
  } catch (error) {
    console.log('Error validating user password.', error)
    return null
  }
}
