import { TABLE } from '../conts.js';
import { getAllRows } from '../services/getAllRows.js';
import { getRowByID } from '../services/getRowByID.js';
import { createDataRow } from '../services/createDataRow.js';
import { updatedDataRowByID } from '../services/updatedDataRowByID.js';
import { deleteRowByID } from '../services/deleteRowByID.js';

const table = TABLE.inventory

//GET ALL
export async function getInventories(req, res) {
 try {
  const inventories = await getAllRows(table);
  if (inventories.name == 'error') throw Error(inventories);
  res.status(200).json({ success: true, inventories: inventories });
 } catch (error) {
  console.log('GET controller Error' + error);
  res.status(404).send('Error fetching information.');
 }
}