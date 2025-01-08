import { pgpConnection } from '../db.js';

export async function updatedDataRowByID(id, data, table) {
 if (!id || !data || typeof data !== 'object') {
  throw new Error('Both id and data (as an object) are required');
 }

 const ID = id.toString();
 const columns = Object.keys(data);
 const values = Object.values(data);

 if (columns.length === 0) {
  throw new Error('Data object must have at least one key-value pair');
 }

 const setClause = columns
  .map((col, index) => `${col} = $${index + 1}`)
  .join(', ');

 try {
  const query = `
      UPDATE ${table}
      SET ${setClause}
      WHERE id = $${columns.length + 1}
      RETURNING *;
    `;

  const updatedActivityManagement = await pgpConnection.one(query, [
   ...values,
   ID,
  ]);
  return updatedActivityManagement;
 } catch (error) {
  throw new Error(`Error updating project`);
 }
}
