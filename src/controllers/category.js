import { TABLE } from '../conts.js';
import { getAllRows } from '../services/getAllRows.js';
import { getRowByID } from '../services/getRowByID.js';
import { createDataRow } from '../services/createDataRow.js';
import { deleteRowByID } from '../services/deleteRowByID.js';
import { updatedDataRowByID } from '../services/updatedDataRowByID.js';

const table = TABLE.category;
export async function getCategories(_req, res) {
 const categories = await getAllRows(table);
 return res.json(categories);
}

export async function getCategoryByID(req, res) {
 const { id } = req.params;

 try {
  const category = await getRowByID(id, table);
  return res.json(category);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}

export async function createCategory(req, res) {
 const body = req.body;
 try {
  const categoryCreated = await createDataRow(body, table);
  res.status(200).json(categoryCreated);
 } catch (error) {
  return error;
 }
}

export async function deleteCategory(req, res) {
 const { id } = req.params;
 try {
  const categoryDeleted = await deleteRowByID(id);
  return res.status(200).json(categoryDeleted);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}
export async function updatedCategory(req, res) {
 const { id } = req.params;
 const body = req.body;

 try {
  const categoryUpdated = await updatedDataRowByID(id, body, table);
  return res.status(200).json(categoryUpdated);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}
