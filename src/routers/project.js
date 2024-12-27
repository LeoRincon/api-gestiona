import { Router } from 'express';
import { getProjects } from '../controllers/projects.js';

const projectRouters = Router();

projectRouters.get('/projects', getProjects);

export default projectRouters;
