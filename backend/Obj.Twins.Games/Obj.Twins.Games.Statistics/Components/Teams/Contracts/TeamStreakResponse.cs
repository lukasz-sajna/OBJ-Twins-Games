using System;
using Obj.Twins.Games.Statistics.Components.Matches.Enums;

namespace Obj.Twins.Games.Statistics.Components.Teams.Contracts
{
    public class TeamStreakResponse
    {
        public DateTime MatchFinishedAt { get; set; }
        public MatchResult MatchResult { get; set; }
    }
}
