using System;

namespace Obj.Twins.Games.Statistics.Components.Matches.Contracts
{
    public class PlayerInTeamInMatchResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public Uri SteamProfileUrl { get; set; }

        public Uri SteamAvatarUri { get; set; }

        public int Kills { get; set; }

        public int Assists { get; set; }

        public int Deaths { get; set; }

        public int Mvp { get; set; }

        public int Score { get; set; }
    }
}