import * as express from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const route = express.Router();

route.get('/home', LeaderboardController.getLeaderboardHome);

const routes = route;

export default routes;
