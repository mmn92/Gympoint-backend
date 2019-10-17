import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ Hello: 'world' });
});
routes.get('/users', UserController.index);
routes.get('/students', (req, res) => {
  return res.json({ route: 'list of students' });
});

routes.post('/users', UserController.store);
routes.post('/sessions', (req, res) => {
  return res.json({ route: 'create session' });
});
routes.post('/students', (req, res) => {
  return res.json({ route: 'create student' });
});

routes.put('/students', (req, res) => {
  return res.json({ route: 'update student' });
});

export default routes;
