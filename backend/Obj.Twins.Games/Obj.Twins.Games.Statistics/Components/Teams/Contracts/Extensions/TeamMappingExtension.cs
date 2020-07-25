﻿using System;
using System.Collections.Generic;
using System.Linq;
using Obj.Twins.Games.Statistics.Components.Common;
using Obj.Twins.Games.Statistics.Components.Matches.Enums;
using Obj.Twins.Games.Statistics.Components.Players.Contracts;
using Obj.Twins.Games.Statistics.Persistence.Models;

namespace Obj.Twins.Games.Statistics.Components.Teams.Contracts.Extensions
{
    public static class TeamMappingExtension
    {
        internal static TeamResponse ToTeamResponse(this Team team)
        {
            return new TeamResponse
            {
                Id = team.Id,
                Name = team.Name,
                Flag = team.Flag,
                Wins = team.GetResultCounter(MatchResult.Win),
                Draws = team.GetResultCounter(MatchResult.Draw),
                Loses = team.GetResultCounter(MatchResult.Lost),
                WinRatio = team.GetTeamWinRatio(),
                MatchesPlayed = team.TeamInMatches.Count,
                Streak = team.GetTeamStreak(),
                Players = team.GetPlayersInTeam()
            };
        }

        internal static int GetResultCounter(this Team team, MatchResult matchResult)
        {
            return team.TeamInMatches.Count(x => x.Result.Equals(matchResult));
        }

        private static double GetTeamWinRatio(this Team team)
        {
            return Math.Round((double)team.GetResultCounter(MatchResult.Win) / team.TeamInMatches.Count, 4);
        }

        private static List<StreakResponse> GetTeamStreak(this Team team)
        {
            return team.TeamInMatches
                .Select(x => new StreakResponse {MatchResult = x.Result, MatchFinishedAt = x.Match.MatchFinishedAt})
                .OrderByDescending(x => x.MatchFinishedAt).Take(5).ToList();
        }

        private static List<PlayerInTeamResponse> GetPlayersInTeam(this Team team)
        {
            return team.TeamInMatches
                .SelectMany(x => x.PlayerInTeamInMatches)
                .Select(x => x.Player).Distinct()
                .Select(x => new PlayerInTeamResponse {Id = x.Id, Name = x.SteamName, Avatar = x.SteamAvatarUri})
                .ToList();
        }

        public static List<PlayerInTeamResponse> GetPlayersInTeam(this Team team, Guid playerId)
        {
            var teams = team.TeamInMatches;

            return team.TeamInMatches
                .Where(x => x.PlayerInTeamInMatches.Any(p => p.PlayerId.Equals(playerId)))
                .SelectMany(x => x.PlayerInTeamInMatches)
                .Select(x => x.Player).Distinct()
                .Select(x => new PlayerInTeamResponse { Id = x.Id, Name = x.SteamName, Avatar = x.SteamAvatarUri })
                .ToList();
        }

        public static PlayerTeamResponse ToPlayerTeamResponse(this Team team, Guid playerId)
        {
            return new PlayerTeamResponse
            {
                Id = team.Id,
                Name = team.Name,
                Flag = team.Flag,
                Wins = team.GetResultCounter(MatchResult.Win),
                Draws = team.GetResultCounter(MatchResult.Draw),
                Loses = team.GetResultCounter(MatchResult.Lost),
                WinRatio = team.GetTeamWinRatio(),
                MatchesPlayed = team.TeamInMatches.Count,
                Streak = team.GetTeamStreak(),
                Players = team.GetPlayersInTeam(playerId)
            };
        }

    }
}
