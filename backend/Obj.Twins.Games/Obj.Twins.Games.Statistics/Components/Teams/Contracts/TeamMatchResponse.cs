using System;
using System.Collections.Generic;
using Obj.Twins.Games.Statistics.Components.Matches.Contracts;
using Obj.Twins.Games.Statistics.Components.Matches.Enums;

namespace Obj.Twins.Games.Statistics.Components.Teams.Contracts
{
    public class TeamMatchResponse
    {
        public Guid Id { get; set; }

        public MatchResult Result { get; set; }

        public string Map { get; set; }

        public DateTime MatchFinishedAt { get; set; }

        public List<TeamInMatchResponse> Teams { get; set; }

    }
}
