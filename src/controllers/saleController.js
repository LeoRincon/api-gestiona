import { TABLE } from '../conts.js';
import { getAllRows } from '../services/getAllRows.js';
import { getRowByID } from '../services/getRowByID.js';
import { createDataRow } from '../services/createDataRow.js';
import { updatedDataRowByID } from '../services/updatedDataRowByID.js';
import { deleteRowByID } from '../services/deleteRowByID.js';

const table = TABLE.sale;

//GET all sales
export async function getAllsale(req, res) {
 try {
  const sale = await getAllRows(table);
  res.status(200).json({ success: true, sale });
 } catch (error) {
  console.log('GET controller Error' + error);
  res.status(400).send('Error fetching information from the database.');
 }
}

//GET  ID
export async function getSale(req, res) {
 try {
  const { id } = req.params;
  const sale = await getRowByID(id, table);
  if (sale.name == 'error') throw Error(sale);
  res.status(200).json({ success: true, sale });
 } catch (error) {
  console.log('GET controller Error' + error);
  res.status(404).send('Error fetching information.');
 }
}

//POST
export async function postSale(req, res) {
 try {
  const data = req.body;
  const sale = await createDataRow(data, table);
  res.status(200).json({ success: true, sale });
 } catch (error) {
  console.log('POST controller Error' + error);
  res.status(400).send('Error creating database information');
 }
}

//PUT
export async function putSale(req, res) {
 try {
  const { id } = req.params;
  const data = req.body;
  const sale = await updatedDataRowByID(id, data, table);
  res.status(200).json({ success: true, sale });
 } catch (error) {
  console.log('PUT controller Error:' + error);
  res.status(400).send('Error editing database information');
 }
}

//DELETE
export async function deleteSale(req, res) {
 try {
  const { id } = req.params;
  const sale = await deleteRowByID(id, table);
  res.status(200).json({ success: true, sale });
 } catch (error) {
  console.log('DELETE controller error: ' + error);
  res.status(400).send('Error deleting information from the database');
 }
}
