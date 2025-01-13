import { TABLE } from '../conts.js';

import { getAllRows } from '../services/getAllRows.js';
import { getRowByID } from '../services/getRowByID.js';
import { createDataRow } from '../services/createDataRow.js';
import { deleteRowByID } from '../services/deleteRowByID.js';
import { updatedDataRowByID } from '../services/updatedDataRowByID.js';

export async function getActivitiesManagement(_req, res) {
 try {
  const activitiesManagement = await getAllRows(TABLE.activitiesManagements);
  return res.json(activitiesManagement);
 } catch (error) {
  return res.status(404).json({
   message: 'Not possible get the Activities Managements',
  });
 }
}

export async function getActivitiesManagementByID(req, res) {
 const { id } = req.params;

 try {
  const activitiesManagement = await getRowByID(
   id,
   TABLE.activitiesManagements
  );
  return res.json(activitiesManagement);
 } catch (error) {
  return res.status(404).json({
   message: 'validated if is correct the dates',
  });
 }
}

export async function createActivitiesManagement(req, res) {
 const body = req.body;
 try {
  const activitiesManagementCreated = await createDataRow(
   body,
   TABLE.activitiesManagements
  );
  res.status(200).json(activitiesManagementCreated);
 } catch (error) {
  throw new Error(`Fail create row ${error.message}`);
 }
}

export async function deleteActivityManagement(req, res) {
 const { id } = req.params;

 try {
  const activityManagementDeleted = await deleteRowByID(
   id,
   TABLE.activitiesManagements
  );
  return res.status(200).json(activityManagementDeleted);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}
export async function updatedActivityManagement(req, res) {
 const { id } = req.params;
 const body = req.body;

 try {
  const activityManagementUpdated = await updatedDataRowByID(
   id,
   body,
   TABLE.activitiesManagements
  );
  return res.status(200).json(activityManagementUpdated);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the data',
  });
 }
}
