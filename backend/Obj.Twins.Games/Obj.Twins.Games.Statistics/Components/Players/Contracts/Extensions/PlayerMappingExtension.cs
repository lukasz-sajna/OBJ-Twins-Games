using System;
using System.Collections.Generic;
using System.Linq;
using Obj.Twins.Games.Statistics.Components.Common;
using Obj.Twins.Games.Statistics.Components.Matches.Contracts;
using Obj.Twins.Games.Statistics.Components.Matches.Enums;
using Obj.Twins.Games.Statistics.Components.Teams.Contracts;
using Obj.Twins.Games.Statistics.Components.Teams.Contracts.Extensions;
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

        internal static PlayerDetailsResponse ToPlayerDetailsResponse(this Player player, List<Team> teams, List<Match> matches)
        {
            return new PlayerDetailsResponse
            {
                Name = player.SteamName,
                Avatar = player.SteamAvatarUri,
                SteamProfileUrl = player.SteamProfileUrl,
                Teams = teams.Where(p => p.TeamInMatches.All(x => !x.Match.IsDeleted))
                    .Select(x => x.ToPlayerTeamResponse(player.Id)).ToList(),
                Matches = matches.Select(x => new PlayerMatchResponse
                {
                    Id = x.Id,
                    MatchFinishedAt = x.MatchFinishedAt,
                    Map = x.Map,
                    Teams = x.TeamInMatches.Select(tim => new TeamInMatchResponse
                        {Name = tim.Team.Name, Flag = tim.Team.Flag, Score = tim.Score}).ToList(),
                    Result = x.TeamInMatches
                        .First(tim => tim.PlayerInTeamInMatches.Any(p => p.PlayerId.Equals(player.Id))).Result
                }).OrderByDescending(o => o.MatchFinishedAt).ToList(),
                Kills = player.PlayerInTeamInMatches
                    .Where(x => !x.Match.IsDeleted)
                    .Select(x => new StatisticResponse {Date = x.Match.MatchFinishedAt, Value = x.Kills})
                    .OrderBy(o => o.Date).ToList(),
                Assists = player.PlayerInTeamInMatches
                    .Where(x => !x.Match.IsDeleted)
                    .Select(x => new StatisticResponse {Date = x.Match.MatchFinishedAt, Value = x.Assists})
                    .OrderBy(o => o.Date).ToList(),
                Deaths = player.PlayerInTeamInMatches
                    .Where(x => !x.Match.IsDeleted)
                    .Select(x => new StatisticResponse {Date = x.Match.MatchFinishedAt, Value = x.Deaths})
                    .OrderBy(o => o.Date).ToList(),
                Mvps = player.PlayerInTeamInMatches
                    .Where(x => !x.Match.IsDeleted)
                    .Select(x => new StatisticResponse {Date = x.Match.MatchFinishedAt, Value = x.Mvp})
                    .OrderBy(o => o.Date).ToList(),
                Scores = player.PlayerInTeamInMatches
                    .Where(x => !x.Match.IsDeleted)
                    .Select(x => new StatisticResponse {Date = x.Match.MatchFinishedAt, Value = x.Score})
                    .OrderBy(o => o.Date).ToList(),
                KdRatios = player.PlayerInTeamInMatches
                    .Where(x => !x.Match.IsDeleted)
                    .Select(x => new StatisticResponse
                        {Date = x.Match.MatchFinishedAt, Value = Math.Round((double) x.Kills / x.Deaths, 2)})
                    .OrderBy(o => o.Date).ToList(),
                Streak = player.PlayerInTeamInMatches.Where(x => !x.Match.IsDeleted).ToList().GetPlayerStreak(),
                LongestWinStreak = player.PlayerInTeamInMatches.Where(x => !x.Match.IsDeleted).ToList()
                    .GetLongestWinStreak()
            };
        }

        private static List<PlayerInTeamResponse> GetPlayersInTeam(this Team team, Guid playerId)
        {
            return team.TeamInMatches
                .SelectMany(x => x.PlayerInTeamInMatches)
                .Select(x => x.Player).Distinct()
                .Select(x => new PlayerInTeamResponse { Id = x.Id, Name = x.SteamName, Avatar = x.SteamAvatarUri })
                .ToList();
        }
        
        private static List<StreakResponse> GetPlayerStreak(this ICollection<PlayerInTeamInMatch> playerInTeamInMatches)
        {
            return playerInTeamInMatches
                .Select(x => new StreakResponse
                    {MatchResult = x.TeamInMatch.Result, MatchFinishedAt = x.Match.MatchFinishedAt})
                .OrderByDescending(o=>o.MatchFinishedAt)
                .Take(5)
                .ToList();
        }

        private static int GetLongestWinStreak(this ICollection<PlayerInTeamInMatch> playerInTeamInMatches)
        {
            var matches = playerInTeamInMatches
                .Select(x => new StreakResponse
                    {MatchResult = x.TeamInMatch.Result, MatchFinishedAt = x.Match.MatchFinishedAt})
                .OrderByDescending(o => o.MatchFinishedAt)
                .ToList();

            var longestStreak = 0;
            var currentStreak = 0;

            foreach (var match in matches)
            {
                if (match.MatchResult.Equals(MatchResult.Win))
                {
                    currentStreak++;
                    if (currentStreak > longestStreak)
                        longestStreak = currentStreak;

                    continue;
                }

                currentStreak = 0;
            }

            return longestStreak;
        }
    }
}
