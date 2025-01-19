import { z } from 'zod';

const projectSchema = z.object({
 nombre: z
  .string({ invalid_type_error: 'the name of the Project must be a string' })
  .max(100, {
   message: 'the name of the Project must be at most 100 characters long',
  })
  .nonempty({ message: 'the name of the Project is required' }),
 descripcion: z
  .string({
   invalid_type_error: 'the description of the Project must be a string',
  })
  .max(255, {
   message:
    'the description of the Project must be at most 255 characters long',
  })
  .nonempty({ message: 'the description of the Project is required' }),
});

export function validateProject(input) {
 try {
  return projectSchema.safeParse(input);
 } catch (error) {
  console.log('Error validating Project.', error);
  return null;
 }
}
