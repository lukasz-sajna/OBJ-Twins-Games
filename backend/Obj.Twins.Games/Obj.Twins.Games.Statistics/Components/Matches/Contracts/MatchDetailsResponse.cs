using System;
using System.Collections.Generic;

namespace Obj.Twins.Games.Statistics.Components.Matches.Contracts
{
    public class MatchDetailsResponse : MatchRootResponse
    {
        public List<TeamInMatchDetailsResponse> Teams { get; set; }

        public Uri DemoUrl { get; set; }
    }
}
