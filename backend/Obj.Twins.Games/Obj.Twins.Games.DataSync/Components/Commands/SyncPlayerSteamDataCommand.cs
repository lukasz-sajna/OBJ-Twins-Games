using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Obj.Twins.Games.DataSync.Hubs;
using Obj.Twins.Games.Statistics.Persistence;
using Obj.Twins.Games.Statistics.Persistence.Models;
using Obj.Twins.Games.Steam.Client.Contracts;
using Obj.Twins.Games.Steam.Client.Services;

namespace Obj.Twins.Games.DataSync.Components.Commands
{
    public class SyncPlayerSteamDataCommand : IRequest
    {
    }

    internal class SyncPlayerSteamDataCommandHandler : IRequestHandler<SyncPlayerSteamDataCommand>
    {
        private readonly StatisticsDbContext _statsDbContext;
        private readonly ISteamService _steamService;
        private readonly IHubContext<StatisticsHub> _hubContext;

        public SyncPlayerSteamDataCommandHandler(StatisticsDbContext statsDbContext, ISteamService steamService, IHubContext<StatisticsHub> hubContext)
        {
            _statsDbContext = statsDbContext;
            _steamService = steamService;
            _hubContext = hubContext;
        }

        public async Task<Unit> Handle(SyncPlayerSteamDataCommand request, CancellationToken cancellationToken)
        {
            var players = _statsDbContext.Players.AsQueryable();

            foreach (var player in players)
            {
                await UpdatePlayerSteamData(player);
            }

            var isDataChanged = _statsDbContext.ChangeTracker.HasChanges();

            await _statsDbContext.SaveChangesAsync(cancellationToken);

            if(isDataChanged)
            {
                await _hubContext.Clients.All.SendAsync("Refreshed", cancellationToken);
            }

            return await Unit.Task;
        }

        private async Task UpdatePlayerSteamData(Player player)
        {
            var playerSteamData = (await _steamService.GetPlayerSummary(player.SteamId)).ToSteamPlayerDataResponse();

            player.SteamName = playerSteamData.SteamName;
            player.SteamProfileUrl = new Uri(playerSteamData.ProfileUrl);
            player.SteamAvatarUri = new Uri(playerSteamData.Avatar);
        }
    }
}
