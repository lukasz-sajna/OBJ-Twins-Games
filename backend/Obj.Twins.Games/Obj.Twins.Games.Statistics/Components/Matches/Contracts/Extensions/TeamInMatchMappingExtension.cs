using Obj.Twins.Games.Statistics.Persistence.Models;

namespace Obj.Twins.Games.Statistics.Components.Matches.Contracts.Extensions
{
    public static class TeamInMatchMappingExtension
    {
        internal static TeamInMatchResponse ToTeamInMatchResponse(this TeamInMatch teamInMatch)
        {
            return new TeamInMatchResponse
            {
                Name = teamInMatch.Team.Name,
                Flag = teamInMatch.Team.Flag,
                Score = teamInMatch.Score
            };
        }
    }
}
