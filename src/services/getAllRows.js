import { pgpConnection } from '../db.js';

export async function getAllRows(table) {
 console.log('🇨🇴🚨 => getAllRows => table:', table);

 if (!table || typeof table !== 'string') {
  throw new Error('table is required');
 }
 try {
  const rows = await pgpConnection.manyOrNone(`SELECT * FROM ${table}`);
  return rows;
 } catch (error) {
  throw new Error('Fail on getAllRows');
 }
}
