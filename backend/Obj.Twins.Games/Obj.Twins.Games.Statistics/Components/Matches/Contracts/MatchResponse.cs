using System;
using System.Collections.Generic;

namespace Obj.Twins.Games.Statistics.Components.Matches.Contracts
{
    public class MatchResponse
    {
        public Guid Id { get; set; }
        
        public List<TeamInMatchResponse> TeamsInMatch { get; set; }

        public string Map { get; set; }

        public DateTime MatchFinishedAt { get; set; }
    }
}
