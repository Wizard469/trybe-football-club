import Team from '../database/models/Team';

const teamStatisticBoard = (team: Team) => ({
  id: team.id,
  name: team.teamName,
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
});

export default teamStatisticBoard;
