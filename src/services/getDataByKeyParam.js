import { pgpConnection } from '../db.js';

export async function getDataByKeyParam(key, value, table, returnValue) {
 if (!key || typeof key !== 'string') {
  throw new Error('Id is required');
 }

 try {
  const row = await pgpConnection.one(
   `SELECT * FROM gestiona.${table} WHERE ${key} = $1`,
   [value]
  );
  return row[returnValue];
 } catch (error) {
  console.log('🇨🇴🚨 => getIDbyFK => error:', error);
  throw new Error('Fail on getRowByID');
 }
}
