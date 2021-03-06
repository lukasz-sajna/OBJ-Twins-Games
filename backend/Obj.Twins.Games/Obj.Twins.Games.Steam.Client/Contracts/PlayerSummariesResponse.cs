﻿using System;
using System.Collections.Generic;
using System.Linq;
using Obj.Twins.Games.Steam.Client.Models;

namespace Obj.Twins.Games.Steam.Client.Contracts
{
    public class PlayerSummariesResponse
    {
        public Response Response { get; set; }
    }

    public class Response
    {
        public IList<Player> Players { get; set; }
    }

    public static class Extensions
    {
        public static SteamPlayerDataResponse ToSteamPlayerDataResponse(
            this PlayerSummariesResponse playerSummaries)
        {
            return playerSummaries.Response.Players.Select(x => new SteamPlayerDataResponse
            {
                SteamName = x.PersonaName,
                PersonState = x.PersonaState,
                Avatar = x.AvatarFull,
                ProfileUrl = x.ProfileUrl,
                LocCountryCode = x.LocCountryCode
            }).FirstOrDefault();
        }

        public static SteamStatusPlayerDataResponse ToSteamStatusPlayerDataResponse(
            this PlayerSummariesResponse playerSummaries)
        {
            return playerSummaries.Response.Players.Select(x => new SteamStatusPlayerDataResponse
            {
                Status = x.PersonaState,
                LastOnline = x.LastLogOff.FromUnixTime()
            }).FirstOrDefault();
        }

        private static DateTime FromUnixTime(this long unixTime)
        {
            var epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            return epoch.AddSeconds(unixTime);
        }
    }
}
