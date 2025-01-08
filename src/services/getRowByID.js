import { pgpConnection } from '../db.js';

export async function getRowByID(id, table) {
 if (!id || typeof id !== 'string') {
  throw new Error('Id is required');
 }
 const ID = id.toString();

 try {
  const row = await pgpConnection.one(
   `select * from ${table} WHERE id = '${ID}'`
  );
  return row;
 } catch (error) {
  throw new Error('Fail on getRowByID');
 }
}
