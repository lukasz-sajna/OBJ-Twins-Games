
using System;
using Obj.Twins.Games.Steam.Client.Enums;

namespace Obj.Twins.Games.Steam.Client.Contracts
{
    public class SteamStatusPlayerDataResponse
    {
        public SteamPersonState Status { get; set; }

        public DateTime LastOnline { get; set; }
    }
}
