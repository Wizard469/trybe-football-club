import * as express from 'express';
import loginRoutes from './login.routes';

const route = express.Router();

route.use('/login', loginRoutes);

const routes = route;

export default routes;
