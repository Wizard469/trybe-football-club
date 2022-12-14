import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getLeaderboardHome(_req: Request, res: Response) {
    const { status, payload } = await LeaderboardService.getLeaderboard('home');

    res.status(status).send(payload);
  }
}
