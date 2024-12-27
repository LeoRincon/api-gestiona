import { pgpConnection } from '../db.js';

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
