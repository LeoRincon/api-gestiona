import { z } from 'zod';

const schema = z.object({
 nombre: z
  .string({ invalid_type_error: 'the name of the Category must be a string' })
  .max(50, {
   message: 'the name of the Category must be at most 100 characters long',
  })
  .nonempty({ message: 'the name of the Category is required' }),
 descripcion: z
  .string({
   invalid_type_error: 'the description of the Category must be a string',
  })
  .max(255, {
   message:
    'the description of the Category must be at most 255 characters long',
  })
  .nonempty({ message: 'the description of the Category is required' }),
});

export function validateCategory(input) {
 try {
  return schema.safeParse(input);
 } catch (error) {
  console.log('Error validating Category.', error);
  return null;
 }
}
