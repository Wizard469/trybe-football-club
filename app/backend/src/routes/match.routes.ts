import * as express from 'express';
import MatchController from '../controllers/MatchController';

const route = express.Router();

route.get('/', MatchController.getAllMatches);

const routes = route;

export default routes;
