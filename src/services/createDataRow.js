import { pgpConnection } from '../db.js';

export async function createDataRow(data, table) {
 if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
  throw new Error('Data object is required');
 }

 const columns = Object.keys(data);
 const values = Object.values(data);

 const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
 const columnNames = columns.join(', ');

 try {
  const query = `
      INSERT INTO ${table} (${columnNames})
      VALUES (${placeholders})
      RETURNING *;
    `;

  const createdCategory = await pgpConnection.one(query, values);
  return createdCategory;
 } catch (error) {
  throw new Error(`Error creating category: ${error.message}`);
 }
}
