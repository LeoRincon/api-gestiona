import {
 getServiceActivitiesManagement,
 getServiceActivitiesManagementByID,
 createServiceActivitiesManagement,
 deleteServiceActivityManagement,
 putServiceActivityManagement,
} from '../services/activityManagement.js';
export async function getActivitiesManagement(_req, res) {
 const activitiesManagement = await getServiceActivitiesManagement();
 return res.json(activitiesManagement);
}

export async function getActivitiesManagementByID(req, res) {
 const { id } = req.params;

 try {
  const activitiesManagement = await getServiceActivitiesManagementByID(id);
  return res.json(activitiesManagement);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}

export async function createActivitiesManagement(req, res) {
 const body = req.body;
 try {
  const activitiesManagementCreated = await createServiceActivitiesManagement(
   body
  );
  res.status(200).json(activitiesManagementCreated);
 } catch (error) {
  return error;
 }
}

export async function deleteActivityManagement(req, res) {
 const { id } = req.params;

 try {
  const activityManagementDeleted = await deleteServiceActivityManagement(id);
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
 console.log('🇨🇴🚨 => updatedActivityManagement => body:', { body, id });

 try {
  const activityManagementUpdated = await putServiceActivityManagement(
   id,
   body
  );
  return res.status(200).json(activityManagementUpdated);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}
