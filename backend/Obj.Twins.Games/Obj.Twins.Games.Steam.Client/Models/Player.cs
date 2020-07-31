using System.Text.Json.Serialization;
using Obj.Twins.Games.Steam.Client.Enums;

namespace Obj.Twins.Games.Steam.Client.Models
{
    public class Player
    {
        public string SteamId { get; set; }
        public int CommunityVisibilityState { get; set; }
        public int ProfileState { get; set; }
        public string PersonaName { get; set; }
        public string ProfileUrl { get; set; }
        public string Avatar { get; set; }
        public string AvatarMedium { get; set; }
        public string AvatarFull { get; set; }
        public long LastLogOff { get; set; }
        public SteamPersonState PersonaState { get; set; }
        public string PrimaryClanId { get; set; }
        public int TimeCreated { get; set; }
        public int PersonaStateFlags { get; set; }

        [JsonPropertyName("loccountrycode")]
        public string LocCountryCode { get; set; }
    }
}
