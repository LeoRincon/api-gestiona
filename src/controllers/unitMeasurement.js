import { TABLE } from '../conts.js';
import { getAllRows } from '../services/getAllRows.js';
import { getRowByID } from '../services/getRowByID.js';
import { createDataRow } from '../services/createDataRow.js';
import { updatedDataRowByID } from '../services/updatedDataRowByID.js';
import { deleteRowByID } from '../services/deleteRowByID.js';

const table = TABLE.unitMeasurement;

//GET ALL
export async function getUnitsMeasurement(req, res) {
 try {
  const units = await getAllRows(table);
  if (units.name == 'error') throw Error(units);
  res.status(200).json({ success: true, units: units });
 } catch (error) {
  console.log('GET controller Error' + error);
  res.status(404).send('Error fetching information.');
 }
}

//GET ONE ID
export async function getUnitMeasurement(req, res) {
 try {
  const { id } = req.params;
  const unit = await getRowByID(id, table);
  if (unit.name == 'error') throw Error(unit);
  res.status(200).json({ success: true, unit: unit });
 } catch (error) {
  console.log('GET controller Error' + error);
  res.status(404).send('Error fetching information.');
 }
}

//POST
export async function postUnitMeasurement(req, res) {
 try {
  const data = req.body;
  const unit = await createDataRow(data, table);
  if (unit.name == 'error') throw Error(unit);
  res.status(200).json({ success: true, unit: unit });
 } catch (error) {
  console.log('POST controller Error' + error);
  res.status(404).send('Error creating information.');
 }
}

//PUT
export async function putUnitMeasurement(req, res) {
 try {
  const { id } = req.params;
  const data = req.body;
  const unit = await updatedDataRowByID(id, data, table);
  if (unit.name == 'error' || unit.name == 'QueryResultError')
   throw Error(unit);
  res.status(200).json({ success: true, unit: unit });
 } catch (error) {
  console.log('PUT controller Error:' + error);
  res.status(404).send('Error editing information.');
 }
}

//DELETE
export async function deleteUnitMeasurement(req, res) {
 try {
  const { id } = req.params;
  const unit = await deleteRowByID(id, table);
  if (unit.name == 'error' || unit.name == 'QueryResultError')
   throw Error(unit);
  res.status(200).json({ success: true, unit: unit });
 } catch (error) {
  console.log('DELETE controller Error: ' + error);
  res.status(404).send('Error deleting information.');
 }
}
