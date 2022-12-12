import * as express from 'express';
import TeamController from '../controllers/TeamController';

const route = express.Router();

route.get('/', TeamController.allTeams);

const routes = route;

export default routes;
