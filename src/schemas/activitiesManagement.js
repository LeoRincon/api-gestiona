import { z } from 'zod';

const schema = z.object({
 id_actividad: z
  .string({
   invalid_type_error: 'the id of the Activity must be a string',
  })
  .nonempty({ message: 'the name of the Activity  is required' })
  .uuid({
   message: 'the name of the Activity  must be a valid UUID',
  }),
 id_temporada: z
  .string({
   invalid_type_error: 'the name of the season must be a string',
  })
  .nonempty({ message: 'the name of the season is required' })
  .uuid({
   message: 'the name of the season must be a valid UUID',
  }),
 costo: z
  .number({
   invalid_type_error: 'the description of the cost must be a number',
  })
  .positive({ message: 'the description of the cost must be greater than 0' }),
 gasto_insumo_id: z
  .string({
   invalid_type_error: 'the id of the input cost id must be a string',
  })
  .nonempty({ message: 'the name of the input cost id  is required' })
  .uuid({
   message: 'the name of the input cost id  must be a valid UUID',
  }).optional(),
});

export function validateActivityManagement(input) {
 try {
  return schema.safeParse(input);
 } catch (error) {
  console.log('Error validating Activity management.', error);
  return null;
 }
}
