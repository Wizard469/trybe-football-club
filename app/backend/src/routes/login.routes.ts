import * as express from 'express';
import LoginController from '../controllers/LoginController';

const route = express.Router();

route.post('/', LoginController.login);
route.get('/validate', LoginController.auth);

const routes = route;

export default routes;
