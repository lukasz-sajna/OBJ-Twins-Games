using System.Collections.Generic;
using System.Linq;
using Obj.Twins.Games.Statistics.Persistence.Models;

namespace Obj.Twins.Games.Statistics.Components.Players.Contracts.Extensions
{
    public static class PlayerMappingExtension
    {
        internal static PlayerResponse ToPlayerResponse(this PlayerInTeamInMatch playerInTeamInMatch)
        {
            return new PlayerResponse
            {
                Id = playerInTeamInMatch.Player.Id,
                Name = playerInTeamInMatch.Player.SteamName,
                Kills = playerInTeamInMatch.Kills,
                Assists = playerInTeamInMatch.Assists,
                Deaths = playerInTeamInMatch.Deaths,
                Mvp = playerInTeamInMatch.Mvp,
                Score = playerInTeamInMatch.Score,
                Avatar = playerInTeamInMatch.Player.SteamAvatarUri
            };
        }

        internal static List<PlayerResponse> ToOverallPlayerStats(this List<PlayerResponse> playerResponses)
        {
            return playerResponses.GroupBy(x => x.Id).Select(z => new PlayerResponse
            {
                Id = z.Key,
                Name = z.First().Name,
                Kills = z.Sum(s => s.Kills),
                Assists = z.Sum(s => s.Assists),
                Deaths = z.Sum(s => s.Deaths),
                Mvp = z.Sum(s => s.Mvp),
                Score = z.Sum(s => s.Score),
                Avatar = z.First().Avatar,
                MatchesPlayed = z.Count()
            }).ToList();
        }
    }
}
