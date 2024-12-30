import {
 getServiceProjects,
 getProject,
 createServiceProject,
 deleteServiceProject,
 putServiceProject,
} from '../services/projects.js';
export async function getProjects(_req, res) {
 const projects = await getServiceProjects();
 return res.json(projects);
}

export async function getProjectByID(req, res) {
 const { id } = req.params;

 try {
  const project = await getProject(id);
  return res.json(project);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}

export async function createProject(req, res) {
 const { nombre_proyecto } = req.body;
 try {
  const projectCreated = await createServiceProject(nombre_proyecto);
  res.status(200).json(projectCreated);
 } catch (error) {
  return error;
 }
}

export async function deleteProject(req, res) {
 const { id } = req.params;

 try {
  const projectDeleted = await deleteServiceProject(id);
  return res.status(200).json(projectDeleted);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}
export async function updatedProject(req, res) {
 const { id } = req.params;
 const { nombre_proyecto } = req.body;

 try {
  const projectUpdated = await putServiceProject(id, nombre_proyecto);
  return res.status(200).json(projectUpdated);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}
