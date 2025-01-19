import { Router } from 'express';
import { verifyProject } from '../middlewares/ValidateProject.js';
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
projectRouters.post('/projects', verifyProject, createProject);
projectRouters.put('/projects/:id', verifyProject, updatedProject);
projectRouters.delete('/projects/:id', deleteProject);

export default projectRouters;
