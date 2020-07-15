﻿using System;
using System.Collections.Generic;
using System.Linq;
using Obj.Twins.Games.Statistics.Components.Matches.Enums;
using Obj.Twins.Games.Statistics.Persistence.Models;

namespace Obj.Twins.Games.Statistics.Components.Teams.Contracts.Extensions
{
    public static class TeamMappingExtension
    {
        internal static TeamResponse ToTeamResponse(this Team team)
        {
            return new TeamResponse
            {
                Name = team.Name,
                Flag = team.Flag,
                Wins = team.GetResultCounter(MatchResult.Win),
                Draws = team.GetResultCounter(MatchResult.Draw),
                Loses = team.GetResultCounter(MatchResult.Lost),
                WinPercentage = team.GetTeamWinPercentage(),
                MatchesPlayed = team.TeamInMatches.Count,
                Streak = team.GetTeamStreak()
            };
        }

        internal static int GetResultCounter(this Team team, MatchResult matchResult)
        {
            return team.TeamInMatches.Count(x => x.Result.Equals(matchResult));
        }

        private static double GetTeamWinPercentage(this Team team)
        {
            return Math.Round((double)team.GetResultCounter(MatchResult.Win) / team.TeamInMatches.Count, 4);
        }

        private static List<TeamStreakResponse> GetTeamStreak(this Team team)
        {
            return team.TeamInMatches
                .Select(x => new TeamStreakResponse {MatchResult = x.Result, MatchFinishedAt = x.Match.MatchFinishedAt})
                .OrderByDescending(x => x.MatchFinishedAt).Take(5).ToList();
        }

    }
}
