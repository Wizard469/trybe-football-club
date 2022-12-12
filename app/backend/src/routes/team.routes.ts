import * as express from 'express';
import TeamController from '../controllers/TeamController';

const route = express.Router();

route.get('/', TeamController.allTeams);
route.get('/:id', TeamController.getByTeamId);

const routes = route;

export default routes;
