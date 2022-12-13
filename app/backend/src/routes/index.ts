import * as express from 'express';
import loginRoutes from './login.routes';
import teamRoutes from './team.routes';
import matchRoutes from './match.routes';

const route = express.Router();

route.use('/login', loginRoutes);
route.use('/teams', teamRoutes);
route.use('/matches', matchRoutes);

const routes = route;

export default routes;
