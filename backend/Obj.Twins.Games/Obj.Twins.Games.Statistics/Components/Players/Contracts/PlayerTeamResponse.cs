﻿using System;
using System.Collections.Generic;
using Obj.Twins.Games.Statistics.Components.Common;
using Obj.Twins.Games.Statistics.Components.Teams.Contracts;

namespace Obj.Twins.Games.Statistics.Components.Players.Contracts
{
    public class PlayerTeamResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Flag { get; set; }

        public int Wins { get; set; }

        public int Draws { get; set; }

        public int Loses { get; set; }

        public double WinRatio { get; set; }

        public int MatchesPlayed { get; set; }

        public List<StreakResponse> Streak { get; set; }

        public List<PlayerInTeamResponse> Players { get; set; }
    }
}