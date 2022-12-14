import Team from '../database/models/Team';
import Match from '../database/models/Match';
import ILeaderboard from '../interfaces/ILeaderBoard';
import HttpCode from '../helpers/httpCodes';
import teamStatisticBoard from '../helpers/teamStatsBoard';

let leaderboard: ILeaderboard[] = [];

export default class LeaderboardService {
  static async getLeaderboard(filter: string) {
    const allTeams = await Team.findAll();

    leaderboard = allTeams.map(teamStatisticBoard);
    await LeaderboardService.generateInfoLeaderboard(filter);
    LeaderboardService.sortLeaderboard();

    return { status: HttpCode.OK, payload: leaderboard };
  }

  static sortLeaderboard() {
    leaderboard.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn,
    );
  }

  static setHomeTeamPoints(homeTeamIndex: number, match: Match) {
    const teamStats = leaderboard[homeTeamIndex];

    if (match.homeTeamGoals > match.awayTeamGoals) {
      teamStats.totalPoints += 3;
      teamStats.totalVictories += 1;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      teamStats.totalPoints += 1;
      teamStats.totalDraws += 1;
    } else {
      teamStats.totalLosses += 1;
    }
  }

  static async generateInfoLeaderboard(filter: string) {
    const allFinishMatches = await Match.findAll({
      where: { inProgress: false },
    });
    if (filter === 'home') {
      allFinishMatches.forEach((match: Match) => {
        const homeTeamIndex = allFinishMatches.findIndex(
          (team) => team.id === match.dataValues.homeTeam,
        );
        const teamStats = leaderboard[homeTeamIndex];
        teamStats.totalGames += 1;
        teamStats.goalsFavor += match.homeTeamGoals;
        teamStats.goalsOwn += match.awayTeamGoals;
        teamStats.goalsBalance = teamStats.goalsFavor - teamStats.goalsOwn;
        LeaderboardService.setHomeTeamPoints(homeTeamIndex, match);
        teamStats.efficiency = +((teamStats.totalPoints / (teamStats.totalGames * 3)) * 100
        ).toFixed(2);
      });
    }
  }
}
