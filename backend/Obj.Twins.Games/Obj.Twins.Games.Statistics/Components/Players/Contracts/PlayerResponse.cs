using System;

namespace Obj.Twins.Games.Statistics.Components.Players.Contracts
{
    public class PlayerResponse
    {
        public Guid Id { get; set; }
        
        public string Name { get; set; }
        
        public int Kills { get; set; }

        public int Assists { get; set; }

        public int Deaths { get; set; }

        public int Mvp { get; set; }

        public int Score { get; set; }

        public int MatchesPlayed { get; set; }

        public Uri Avatar { get; set; }

        public double KdRatio => Math.Round((double)Kills / Deaths, 2);
    }
}
