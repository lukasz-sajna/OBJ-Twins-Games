using Obj.Twins.Games.Steam.Client.Enums;

namespace Obj.Twins.Games.Steam.Client.Contracts
{
    public class SteamPlayerDataResponse
    {
        public string SteamName { get; set; }

        public SteamPersonState PersonState { get; set; }

        public string ProfileUrl { get; set; }

        public string Avatar { get; set; }

        public string LastLogOff { get; set; }
        public string LocCountryCode { get; set; }
    }
}