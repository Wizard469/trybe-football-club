import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await MatchService.getAllMatches(String(inProgress));

    res.status(200).json(matches);
  }

  static async newMatch(req: Request, res: Response) {
    const { status, payload } = await MatchService.newMatch(req.body);

    if (status !== 201) {
      return res.status(status).json({ message: payload });
    }

    res.status(status).json(payload);
  }

  static async updateProgress(req: Request, res: Response) {
    const { status, payload } = await MatchService.updateProgress(req.params.id);

    res.status(status).json({ message: payload });
  }

  static async updateMatchGoals(req: Request, res: Response) {
    const { status, payload } = await MatchService.updateMatchGoals(req.body, req.params.id);

    res.status(status).json({ message: payload });
  }
}
