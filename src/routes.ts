import { Router } from 'express';
import Auth from './routes/Auth';
import Countries from './routes/Countries';
import Currencies from './routes/Currencies';
import Users from './routes/Users';

const routes = Router();

routes.use('/auth', Auth);
routes.use('/countries', Countries);
routes.use('/currencies', Currencies);
routes.use('/users', Users);

export default routes;
