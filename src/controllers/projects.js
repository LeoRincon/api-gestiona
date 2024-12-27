import { getServiceProjects } from '../services/projects.js';
export async function getProjects(_req, res) {
 const response = await getServiceProjects();
 return res.send(response);
}
