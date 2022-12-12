import * as express from 'express';
import loginRoutes from './login.routes';
import teamRoutes from './team.routes';

const route = express.Router();

route.use('/login', loginRoutes);
route.use('/teams', teamRoutes);

const routes = route;

export default routes;
