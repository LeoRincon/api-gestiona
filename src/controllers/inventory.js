import { TABLE } from '../conts.js';
import { getAllRows } from '../services/getAllRows.js';
import { getRowByID } from '../services/getRowByID.js';
import { createDataRow } from '../services/createDataRow.js';
import { updatedDataRowByID } from '../services/updatedDataRowByID.js';
import { deleteRowByID } from '../services/deleteRowByID.js';
import { getRowsByKey } from '../services/getDataByKeyParam.js';

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

//GET ONE ID
export async function getInventory(req, res) {
  try {
    const { id } = req.params;
    const inventory = await getRowByID(id, table);
    if (inventory.name == "error") throw Error(inventory);
    res.status(200).json({ success: true, inventory: inventory });
  } catch (error) {
    console.log("GET controller Error" + error);
    res.status(404).send("Error fetching information.");
  }
}

//POST
export async function postInventory(req, res) {
  try {
    const data = req.body;
    const inventory = await createDataRow(data, table);
    if (inventory.name == "error") throw Error(inventory);
    res.status(201).json({ success: true, inventory: inventory });
  } catch (error) {
    console.log("POST controller Error" + error);
    res.status(404).send("Error creating information.");
  }
}

//PUT
export async function putInventory(req, res) {
 try {
  const { id } = req.params;
  const data = req.body;
  const inventory = await updatedDataRowByID(id, data, table);
  if (inventory.name == 'error' || inventory.name == 'QueryResultError')
   throw Error(inventory);
  res.status(200).json({ success: true, inventory: inventory });
 } catch (error) {
  console.log('PUT controller Error:' + error);
  res.status(404).send('Error editing information.');
 }
}

//DELETE
export async function deleteInventory(req, res) {
 try {
  const { id } = req.params;
  const inventory = await deleteRowByID(id, table);
  if (inventory.name == 'error' || inventory.name == 'QueryResultError')
   throw Error(inventory);
  res.status(200).json({ success: true, inventory: inventory });
 } catch (error) {
  console.log('DELETE controller Error: ' + error);
  res.status(404).send('Error deleting information.');
 }
}

//GET ALL INVENTORIES BY PROJET ID
export async function getAllInventoriesByProjectId(req, res) {
  try {
    const { id } = req.params;
    const inventories = await getRowsByKey("id_proyecto", id, table);
    if (inventories.name == "error") throw new Error(inventories);
    res.status(200).json({ success: true, inventories: inventories });
  } catch (error) {
    console.log("GET controller Error" + error);
    res.status(404).send("Error fetching information.");
  }
}