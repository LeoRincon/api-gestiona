import { pgpConnection } from '../db.js';

export async function deleteRowByID(id, table) {
 if (!id) {
  throw new Error('Id is required');
 }
 const ID = id.toString();

 try {
  const activityManagementDeleted = await pgpConnection.one(
   `DELETE FROM ${table} WHERE id = $1 RETURNING*`,
   [ID]
  );

  return activityManagementDeleted;
 } catch (error) {
  throw new Error('Fail to delete a row by ID');
 }
}
