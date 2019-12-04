import { Router } from 'express';
import Auth from './routes/Auth';
import Users from './routes/Users';

const routes = Router();

routes.use('/auth', Auth);
routes.use('/users', Users);

export default routes;
