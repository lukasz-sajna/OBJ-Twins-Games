using System.Collections.Generic;

namespace Obj.Twins.Games.Statistics.Components.Teams.Contracts
{
    public class TeamResponse
    {
        public string Name { get; set; }

        public string Flag { get; set; }

        public int Wins { get; set; }

        public int Draws { get; set; }

        public int Loses { get; set; }

        public double WinPercentage { get; set; }

        public int MatchesPlayed { get; set; }

        public List<TeamStreakResponse> Streak { get; set; }
    }
}
