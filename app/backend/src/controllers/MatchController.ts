import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await MatchService.getAllMatches(String(inProgress));

    res.status(200).json(matches);
  }
}
