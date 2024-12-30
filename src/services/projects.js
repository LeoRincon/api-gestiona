import { pgpConnection } from '../db.js';

const TABLE = 'gestiona.proyecto';
export async function getServiceProjects() {
 try {
  const projects = await pgpConnection.manyOrNone(
   'SELECT * FROM gestiona.proyecto'
  );
  console.log(projects);
  return projects;
 } catch (error) {
  console.log('Projects not found ' + error);
  return error;
 }
}

export async function getProject(id) {
 if (!id) {
  throw new Error('Id is required');
 }
 const ID = id.toString();

 try {
  const projects = await pgpConnection.one(
   `select * from ${TABLE} WHERE id = '${ID}'`
  );
  return projects;
 } catch (error) {
  return error;
 }
}

export async function createServiceProject(projectName) {
 try {
  const projectCreated = await pgpConnection.one(
   `INSERT INTO gestiona.proyecto (nombre_proyecto) 
    VALUES ('${projectName}') RETURNING *;`
  );
  return projectCreated;
 } catch (error) {
  return error;
 }
}

export async function deleteServiceProject(id) {
 if (!id) {
  throw new Error('Id is required');
 }
 const ID = id.toString();

 try {
  const projectDeleted = await pgpConnection.one(
   `DELETE FROM gestiona.proyecto WHERE id='${ID}' RETURNING*`
  );

  return projectDeleted;
 } catch (error) {
  return error;
 }
}

export async function putServiceProject(id, nombre_proyecto) {
 if (!id || !nombre_proyecto) {
  throw new Error('Both id and nombre_proyecto are required');
 }

 const ID = id.toString();
 try {
  const query = `
      UPDATE gestiona.proyecto
      SET nombre_proyecto = $1
      WHERE id = $2
      RETURNING *;
    `;
  const projects = await pgpConnection.one(query, [nombre_proyecto, ID]);
  return projects;
 } catch (error) {
  throw new Error(`Error updating project: ${error.message}`);
 }
}
