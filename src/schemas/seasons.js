import { z } from 'zod';

const seasonSchema = z.object({
 nombre: z.string({
  invalid_type_error: 'the name of the season must be a string',
  required_error: 'the name of the season is required',
 }),
 duracion: z
  .number({
   invalid_type_error: 'the duration of the season must be a number',
   required_error: 'the duration of the season is required',
  })
  .int({
   invalid_type_error: 'the duration of the season must be an integer',
  })
  .positive({
   invalid_type_error: 'the duration of the season must be a positive number',
  })
  .min(1),
 fecha_inicio: z
  .string({
   invalid_type_error: 'the start date of the season must be a string',
   required_error: 'the start date of the season is required',
  })
  .datetime({
   invalid_type_error: 'the start date of the season must be a date',
  }),
 fecha_fin: z
  .string({
   invalid_type_error: 'the start date of the season must be a string',
   required_error: 'the start date of the season is required',
  })
  .datetime({
   invalid_type_error: 'the start date of the season must be a date',
  }),
 id_cultivo: z
  .string({
   invalid_type_error: 'the crop id must be a string',
   required_error: 'the crop id is required',
  })
  .uuid({
   invalid_type_error: 'the crop id must be a UUID',
  }),
 novedades_id: z
  .string({
   invalid_type_error: 'the news id must be a string',
  })
  .uuid({
   invalid_type_error: 'the news id must be a UUID',
  })
  .optional(),
});

export function validateSeason(input) {
 try {
  return seasonSchema.safeParse(input);
 } catch (error) {
  console.log('Error validating season', error);
  return null;
 }
}

export function validatePartialSeason(input) {
 try {
  return seasonSchema.partial().safeParse(input);
 } catch (error) {
  console.log('Error validating season', error);
  return null;
 }
}

export function validateId(input) {
 try {
  return z
   .string({
    invalid_type_error: 'the id must be a string',
    required_error: 'the id is required',
   })
   .uuid({
    invalid_type_error: 'the id must be a UUID',
   })
   .safeParse(input);
 } catch (error) {
  console.log('Error validating season id', error);
  return null;
 }
}
