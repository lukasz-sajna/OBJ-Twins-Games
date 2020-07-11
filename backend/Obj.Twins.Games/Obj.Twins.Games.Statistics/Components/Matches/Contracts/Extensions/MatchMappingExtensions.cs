using System.Collections.Generic;
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
                Teams = match.TeamInMatches.Select(x => x.ToTeamInMatchResponse()).ToList(),
                Map = match.Map,
                MatchFinishedAt = match.MatchFinishedAt
            };
        }

        internal static MatchDetailsResponse ToMatchDetailsResponse(this Match match)
        {
            return new MatchDetailsResponse
            {
                Id = match.Id,
                Map = match.Map,
                MatchFinishedAt = match.MatchFinishedAt,
                DemoUrl = match.DemoUrl,
                Teams = new List<TeamInMatchDetailsResponse>()
            };
        }
    }
}
