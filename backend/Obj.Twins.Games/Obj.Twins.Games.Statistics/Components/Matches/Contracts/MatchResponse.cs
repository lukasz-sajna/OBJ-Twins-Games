using System.Collections.Generic;

namespace Obj.Twins.Games.Statistics.Components.Matches.Contracts
{
    public class MatchResponse : MatchRootResponse
    {
        public List<TeamInMatchResponse> Teams { get; set; }
    }
}
