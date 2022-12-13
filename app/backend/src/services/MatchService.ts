import INewMatch from '../interfaces/newMatchInterface';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import HttpCode from '../helpers/httpCodes';

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

  static async newMatch(body: INewMatch) {
    if (body.homeTeam === body.awayTeam) {
      return {
        status: HttpCode.UNPROCESSABLE_ENTITY,
        payload: 'It is not possible to create a match with two equal teams' };
    }

    try {
      const response = await Match.create({ ...body, inProgress: true });

      return { status: HttpCode.CREATED, payload: response };
    } catch (_) {
      return { status: HttpCode.NOT_FOUND, payload: 'There is no team with such id!' };
    }
  }

  static async updateProgress(id: string) {
    await Match.update({ inProgress: false }, { where: { id } });

    return { status: HttpCode.OK, payload: 'Finished' };
  }
}
