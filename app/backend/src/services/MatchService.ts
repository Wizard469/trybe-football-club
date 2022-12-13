import Match from '../database/models/Match';
import Team from '../database/models/Team';

export default class MatchService {
  static async getAllMatches(inProgress: string) {
    const response = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: inProgress !== 'undefined'
        ? { inProgress: inProgress === 'true' }
        : undefined,
    });

    return response;
  }
}
