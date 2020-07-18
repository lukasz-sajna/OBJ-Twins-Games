using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Obj.Twins.Games.DataSync.Hubs;
using Obj.Twins.Games.ServerStatistics.Persistence;
using Obj.Twins.Games.ServerStatistics.Persistence.Models;
using Obj.Twins.Games.Statistics.Components.Matches.Enums;
using Obj.Twins.Games.Statistics.Persistence;
using Obj.Twins.Games.Statistics.Persistence.Models;
using Obj.Twins.Games.Steam.Client.Contracts;
using Obj.Twins.Games.Steam.Client.Services;
using Match = Obj.Twins.Games.Statistics.Persistence.Models.Match;
using ServerMatch = Obj.Twins.Games.ServerStatistics.Persistence.Models.Match;

namespace Obj.Twins.Games.DataSync.Components.Commands
{
    public class SyncMatchesCommand : IRequest
    {

    }

    internal class SyncMatchesCommandHandler : IRequestHandler<SyncMatchesCommand>
    {
        private readonly ServerStatsDbContext _serverStatsDbContext;
        private readonly StatisticsDbContext _statsDbContext;
        private readonly ISteamService _steamService;
        private readonly IHubContext<StatisticsHub> _hubContext;

        public SyncMatchesCommandHandler(ServerStatsDbContext serverStatsDbContext, StatisticsDbContext statsDbContext,
            ISteamService steamService, IHubContext<StatisticsHub> hubContext)
        {
            _serverStatsDbContext = serverStatsDbContext;
            _statsDbContext = statsDbContext;
            _steamService = steamService;
            _hubContext = hubContext;
        }

        public async Task<Unit> Handle(SyncMatchesCommand _, CancellationToken cancellationToken)
        {
            var matches = await GetMatches(cancellationToken);

            foreach (var match in matches)
            {
                var matchToSync = await CreateMatch(match);
                await _statsDbContext.Matches.AddAsync(matchToSync, cancellationToken);
                await _statsDbContext.SaveChangesAsync(cancellationToken);
            }

            if (matches.Any())
            {
                await _hubContext.Clients.All.SendAsync("Refreshed", cancellationToken);
            }

            return await Unit.Task;
        }

        private async Task<List<long>> GetMatchIdsToSync(CancellationToken cancellationToken)
        {
            var serverMatchIds = new List<long>();

            try
            {
                serverMatchIds = await _serverStatsDbContext.Matches
                    .Select(x => x.MatchId)
                    .ToListAsync(cancellationToken);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            var syncedMatchIds = await _statsDbContext.Matches.Select(x => x.OriginalMatchId)
                .ToListAsync(cancellationToken);

            foreach (var syncedMatchId in syncedMatchIds.Where(syncedMatchId =>
                serverMatchIds.Contains(syncedMatchId)))
            {
                serverMatchIds.Remove(syncedMatchId);
            }

            return serverMatchIds;
        }

        private async Task<List<ServerMatch>> GetMatches(CancellationToken cancellationToken)
        {
            var matchIdsToSync = await GetMatchIdsToSync(cancellationToken);

            var matches = await _serverStatsDbContext.Matches
                .Where(x => matchIdsToSync.Contains(x.MatchId) && x.Team2 + x.Team3 > 0)
                .ToListAsync(cancellationToken);

            return matches;
        }

        private async Task<Player> GetOrCreatePlayer(MatchDetails matchDetails)
        {
            var player = await _statsDbContext.Players.FirstOrDefaultAsync(x => x.SteamId == matchDetails.SteamId);

            if (player == null)
            {
                player = new Player {Name = matchDetails.PlayerName, SteamId = matchDetails.SteamId};
                await GetPlayerSteamData(player);
            }

            return player;
        }

        private async Task<Team> GetOrCreateTeamAsync(IReadOnlyList<Player> players, string teamFlag)
        {
            var teamInMatches = await _statsDbContext.TeamInMatches.Include(p => p.PlayerInTeamInMatches)
                .ThenInclude(x => x.Player).ToListAsync();

            var teamInMatch = teamInMatches.FirstOrDefault(x =>
                x.PlayerInTeamInMatches.Select(pit => pit.Player.SteamId).OrderBy(o => o).ToList()
                    .SequenceEqual(players.Select(p => p.SteamId).ToList().OrderBy(z => z)));

            return teamInMatch?.Team ?? new Team
                {Flag = teamFlag, NameFromPlayer = RandomPickPlayerForTeamName(players)};
        }

        private async Task<Match> CreateMatch(ServerMatch serverMatch)
        {
            var matchDetails = await _serverStatsDbContext.MatchesDetails
                .Where(x => x.MatchId == serverMatch.MatchId && !string.IsNullOrEmpty(x.SteamId))
                .ToListAsync();

            var firstTeamMatchDetails = matchDetails.Where(x => x.Team == 2).ToList();
            var secondTeamMatchDetails = matchDetails.Where(x => x.Team == 3).ToList();

            var firstTeamPlayers = await GetOrCreateTeamPlayers(firstTeamMatchDetails);
            var secondTeamPlayers = await GetOrCreateTeamPlayers(secondTeamMatchDetails);

            var firstTeam = await GetOrCreateTeamAsync(firstTeamPlayers, serverMatch.TeamFlag1);
            var secondTeam = await GetOrCreateTeamAsync(secondTeamPlayers, serverMatch.TeamFlag2);

            return new Match
            {
                OriginalMatchId = serverMatch.MatchId,
                Map = serverMatch.Map,
                MatchFinishedAt = serverMatch.Timestamp,
                CreatedDate = DateTimeOffset.UtcNow,
                TeamInMatches = new List<TeamInMatch>
                {
                    new TeamInMatch
                    {
                        Team = firstTeam,
                        Result = GetMatchResult(serverMatch, true),
                        Score = serverMatch.Team2,
                        PlayerInTeamInMatches = firstTeamPlayers
                            .Select(x => CreatePlayersInTeamInMatch(x, firstTeamMatchDetails)).ToList()
                    },
                    new TeamInMatch
                    {
                        Team = secondTeam,
                        Result = GetMatchResult(serverMatch, false),
                        Score = serverMatch.Team3,
                        PlayerInTeamInMatches = secondTeamPlayers
                            .Select(x => CreatePlayersInTeamInMatch(x, secondTeamMatchDetails)).ToList()
                    }
                }
            };
        }

        private async Task GetPlayerSteamData(Player player)
        {
            var steamData = (await _steamService.GetPlayerSummary(player.SteamId)).ToSteamPlayerDataResponse();

            player.SteamName = steamData.SteamName;
            player.SteamProfileUrl = new Uri(steamData.ProfileUrl);
            player.SteamAvatarUri = new Uri(steamData.Avatar);
        }

        private static Player RandomPickPlayerForTeamName(IReadOnlyList<Player> players)
        {
            return players[new Random().Next(players.Count)];
        }

        private static MatchResult GetMatchResult(ServerMatch serverMatch, bool isFirstTeam)
        {
            if (serverMatch.Team2 > serverMatch.Team3)
            {
                return isFirstTeam ? MatchResult.Win : MatchResult.Lost;
            }

            if (serverMatch.Team3 > serverMatch.Team2)
            {
                return isFirstTeam ? MatchResult.Lost : MatchResult.Win;
            }

            return MatchResult.Draw;
        }

        private async Task<IReadOnlyList<Player>> GetOrCreateTeamPlayers(IEnumerable<MatchDetails> matchDetails)
        {
            var teamPlayers = new List<Player>();

            foreach (var matchDetail in matchDetails)
            {
                var player = await GetOrCreatePlayer(matchDetail);
                teamPlayers.Add(player);
            }

            return teamPlayers;
        }

        private static PlayerInTeamInMatch CreatePlayersInTeamInMatch(Player player,
            IEnumerable<MatchDetails> matchDetails)
        {
            var playerStats = matchDetails.First(x => player.SteamId == x.SteamId);

            return new PlayerInTeamInMatch
            {
                Player = player,
                Kills = playerStats.Kills,
                Assists = playerStats.Assists,
                Deaths = playerStats.Deaths,
                Mvp = playerStats.Mvps,
                Score = playerStats.Score
            };
        }
    }
}

