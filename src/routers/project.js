import { Router } from 'express';
import {
 getProjects,
 getProjectByID,
 createProject,
 deleteProject,
 updatedProject,
} from '../controllers/projects.js';

const projectRouters = Router();

projectRouters.get('/projects', getProjects);
projectRouters.get('/projects/:id', getProjectByID);
projectRouters.post('/projects', createProject);
projectRouters.put('/projects/:id', updatedProject);
projectRouters.delete('/projects/:id', deleteProject);

export default projectRouters;
