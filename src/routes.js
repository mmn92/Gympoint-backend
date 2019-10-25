import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);

routes.post('/users', UserController.store);
routes.post('/students', StudentController.store);
routes.post('/plans', PlanController.store);

routes.put('/students/:id', StudentController.update);

export default routes;
