import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import OrderController from './app/controllers/OrderController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.get('/students/:id/checkins', CheckinController.index);
routes.get('/students/:id/help-orders', OrderController.index);

routes.post('/sessions', SessionController.store);
routes.post('/students/:id/checkins', CheckinController.store);
routes.post('/students/:id/help-orders', OrderController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.get('/plans', PlanController.index);
routes.get('/registrations', RegistrationController.index);
routes.get('/help-orders', AnswerController.index);

routes.post('/users', UserController.store);
routes.post('/students', StudentController.store);
routes.post('/plans', PlanController.store);
routes.post('/registrations', RegistrationController.store);

routes.put('/students/:id', StudentController.update);
routes.put('/plans/:id', PlanController.update);
routes.put('/registrations/:id', RegistrationController.update);

routes.delete('/plans/:id', PlanController.delete);
routes.delete('/registrations/:id', RegistrationController.delete);

export default routes;
