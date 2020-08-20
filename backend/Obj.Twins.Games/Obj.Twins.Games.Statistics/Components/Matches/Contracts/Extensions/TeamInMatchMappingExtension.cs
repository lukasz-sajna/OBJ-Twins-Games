using System.Linq;
using Obj.Twins.Games.Statistics.Components.Players.Contracts.Extensions;
using Obj.Twins.Games.Statistics.Persistence.Models;

namespace Obj.Twins.Games.Statistics.Components.Matches.Contracts.Extensions
{
    public static class TeamInMatchMappingExtension
    {
        internal static TeamInMatchResponse ToTeamInMatchResponse(this TeamInMatch teamInMatch)
        {
            return new TeamInMatchResponse
            {
                Id = teamInMatch.TeamId,
                Name = teamInMatch.Team.Name,
                Flag = teamInMatch.Team.Flag,
                Score = teamInMatch.Score
            };
        }
        internal static TeamInMatchDetailsResponse ToTeamInMatchDetailsResponse(this TeamInMatch teamInMatch)
        {
            return new TeamInMatchDetailsResponse
            {
                Id = teamInMatch.TeamId,
                Name = teamInMatch.Team.Name,
                Flag = teamInMatch.Team.Flag,
                Score = teamInMatch.Score,
                Players = teamInMatch.PlayerInTeamInMatches.Select(x => x.ToPlayerResponse())
                    .OrderByDescending(o => o.Score).ToList()
            };
        }
    }
}
