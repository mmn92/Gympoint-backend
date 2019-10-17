import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ Hello: 'world' });
});

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/students', (req, res) => {
  return res.json({ route: 'list of students' });
});

routes.post('/users', UserController.store);
routes.post('/students', (req, res) => {
  return res.json({ route: 'create student' });
});

routes.put('/students', (req, res) => {
  return res.json({ route: 'update student' });
});

export default routes;
