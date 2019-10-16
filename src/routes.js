import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ Hello: 'world' });
});
routes.get('/students', (req, res) => {
  return res.json({ route: 'list of students' });
});

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
