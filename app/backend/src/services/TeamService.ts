import Team from '../database/models/Team';

export default class TeamService {
  static async allTeams() {
    const response = await Team.findAll();

    const allTeams = response.map((team) => team);

    console.log(allTeams);

    return allTeams;
  }
}
