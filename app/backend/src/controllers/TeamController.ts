import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  static async allTeams(_req: Request, res: Response) {
    const allTeams = await TeamService.allTeams();

    res.status(200).json(allTeams);
  }
}
