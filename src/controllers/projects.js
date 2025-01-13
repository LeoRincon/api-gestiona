import { TABLE } from '../conts.js';
import { getAllRows } from '../services/getAllRows.js';
import { getRowByID } from '../services/getRowByID.js';
import { createDataRow } from '../services/createDataRow.js';
import { updatedDataRowByID } from '../services/updatedDataRowByID.js';
import { deleteRowByID } from '../services/deleteRowByID.js';

const table = TABLE.project;
export async function getProjects(_req, res) {
 const projects = await getAllRows(table);
 return res.json(projects);
}

export async function getProjectByID(req, res) {
 const { id } = req.params;

 try {
  const project = await getRowByID(id, table);
  return res.json(project);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}

export async function createProject(req, res) {
 const data = req.body;
 try {
  const projectCreated = await createDataRow(data, table);
  res.status(200).json(projectCreated);
 } catch (error) {
  return error;
 }
}

export async function deleteProject(req, res) {
 const { id } = req.params;

 try {
  const projectDeleted = await deleteRowByID(id, table);
  return res.status(200).json(projectDeleted);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}
export async function updatedProject(req, res) {
 const { id } = req.params;
 const data = req.body;

 try {
  const projectUpdated = await updatedDataRowByID(id, data, table);
  return res.status(200).json(projectUpdated);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}
