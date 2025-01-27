import { TABLE } from '../conts.js';
import { getAllRows } from '../services/getAllRows.js';
import { getRowByID } from '../services/getRowByID.js';
import { createDataRow } from '../services/createDataRow.js';
import { updatedDataRowByID } from '../services/updatedDataRowByID.js';
import { deleteRowByID } from '../services/deleteRowByID.js';

const table = TABLE.news;
export async function getAllNews(req, res) {
 const response = await getAllRows(table);
 return res.send(response);
}

export async function createNew(req, res) {
 const data = req.body;
 const response = await createDataRow(data, table);
 return res.send(response);
}

export async function getNewById(req, res) {
 const id = req.params.id;
 const response = await getRowByID(id, table);
 return res.send(response);
}

export async function removeNewById(req, res) {
 const id = req.params.id;
 const response = await deleteRowByID(id, table);
 return res.send(response);
}

export async function updateNew(req, res) {
 const id = req.params.id;
 const data = req.body;

 const response = await updatedDataRowByID(id, data, table);
 return res.send(response);
}
