﻿using System;

namespace Obj.Twins.Games.Statistics.Components.Matches.Contracts
{
    public class TeamInMatchResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Flag { get; set; }

        public int Score { get; set; }
    }
}
