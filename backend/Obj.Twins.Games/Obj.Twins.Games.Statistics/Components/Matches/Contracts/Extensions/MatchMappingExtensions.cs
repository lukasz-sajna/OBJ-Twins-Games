using System.Linq;
using Obj.Twins.Games.Statistics.Persistence.Models;

namespace Obj.Twins.Games.Statistics.Components.Matches.Contracts.Extensions
{
    public static class MatchMappingExtensions
    {
        internal static MatchResponse ToMatchResponse(this Match match)
        {
            return new MatchResponse
            {
                Id = match.Id,
                TeamsInMatch = match.TeamInMatches.Select(x => x.ToTeamInMatchResponse()).ToList(),
                Map = match.Map,
                MatchFinishedAt = match.MatchFinishedAt
            };
        }
    }
}
