using System;
using System.Collections.Generic;
using System.Linq;
using Obj.Twins.Games.Statistics.Components.Common;
using Obj.Twins.Games.Statistics.Components.Matches.Enums;
using Obj.Twins.Games.Statistics.Components.Teams.Contracts;

namespace Obj.Twins.Games.Statistics.Components.Players.Contracts
{
    public class PlayerDetailsResponse
    {
        public string Name { get; set; }

        public Uri Avatar { get; set; }

        public Uri SteamProfileUrl { get; set; }

        public List<PlayerMatchResponse> Matches { get; set; } = new List<PlayerMatchResponse>();

        public List<PlayerTeamResponse> Teams { get; set; }

        public List<StatisticResponse> Kills { get; set; }
                                   
        public List<StatisticResponse> Assists { get; set; }

        public List<StatisticResponse> Deaths { get; set; }

        public List<StatisticResponse> Mvps { get; set; }

        public List<StatisticResponse> Scores { get; set; }

        public List<StatisticResponse> KdRatios { get; set; }

        public List<StreakResponse> Streak { get; set; }

        public int LongestWinStreak { get; set; }

        public int Wins
        {
            get
            {
                return Matches.Count(x => x.Result == MatchResult.Win);
            }
        }

        public int MatchesPlayed => Matches.Count;

        public double WinRate => Math.Round((double)Wins / MatchesPlayed, 4);

        public double KdRatio => Math.Round((double)Kills.Sum(x => x.Value) / Deaths.Sum(x => x.Value), 2);
    }
}

