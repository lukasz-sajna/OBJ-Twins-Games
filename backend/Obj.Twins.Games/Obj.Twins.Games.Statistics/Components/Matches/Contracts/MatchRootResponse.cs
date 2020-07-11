using System;

namespace Obj.Twins.Games.Statistics.Components.Matches.Contracts
{
    public class MatchRootResponse
    {
        public Guid Id { get; set; }
        
        public string Map { get; set; }

        public DateTime MatchFinishedAt { get; set; }
    }
}
