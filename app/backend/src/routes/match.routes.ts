import * as express from 'express';
import MatchController from '../controllers/MatchController';
import validateToken from '../middlewares/tokenValidation';

const route = express.Router();

route.get('/', MatchController.getAllMatches);
route.post('/', validateToken, MatchController.newMatch);
route.patch('/:id/finish', validateToken, MatchController.updateProgress);
route.patch('/:id', validateToken, MatchController.updateMatchGoals);

const routes = route;

export default routes;
