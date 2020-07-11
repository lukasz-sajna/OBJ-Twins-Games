using System.Collections.Generic;

namespace Obj.Twins.Games.Statistics.Components.Matches.Contracts
{
    public class TeamInMatchDetailsResponse : TeamInMatchResponse
    {
        public List<PlayerInTeamInMatchResponse> Players { get; set; }
    }
}