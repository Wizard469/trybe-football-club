import Team from '../database/models/Team';

export default class TeamService {
  static async allTeams() {
    const response = await Team.findAll();

    return response;
  }

  static async getByTeamId(teamId: string) {
    const team = await Team.findByPk(teamId);

    return team;
  }
}
