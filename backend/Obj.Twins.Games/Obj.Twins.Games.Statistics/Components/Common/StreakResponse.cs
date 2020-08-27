using System;
using Obj.Twins.Games.Statistics.Components.Matches.Enums;

namespace Obj.Twins.Games.Statistics.Components.Common
{
    public class StreakResponse
    {
        public DateTime MatchFinishedAt { get; set; }
        public MatchResult MatchResult { get; set; }
    }
}
