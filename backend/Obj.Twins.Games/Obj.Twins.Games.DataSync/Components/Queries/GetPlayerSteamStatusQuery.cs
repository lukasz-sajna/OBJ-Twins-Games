using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Obj.Twins.Games.Statistics.Persistence;
using Obj.Twins.Games.Steam.Client.Contracts;
using Obj.Twins.Games.Steam.Client.Services;

namespace Obj.Twins.Games.DataSync.Components.Queries
{
    public class GetPlayerSteamStatusQuery : IRequest<SteamStatusPlayerDataResponse>
    {
        public Guid Id { get; set; }
    }

    internal class GetPlayerSteamStatusQueryHandler : IRequestHandler<GetPlayerSteamStatusQuery, SteamStatusPlayerDataResponse>
    {
        private readonly ISteamService _steamService;
        private readonly StatisticsDbContext _statisticsDbContext;

        public GetPlayerSteamStatusQueryHandler(ISteamService steamService, StatisticsDbContext statisticsDbContext)
        {
            _steamService = steamService;
            _statisticsDbContext = statisticsDbContext;
        }

        public async Task<SteamStatusPlayerDataResponse> Handle(GetPlayerSteamStatusQuery request, CancellationToken cancellationToken)
        {
            var playerSteamId = (await _statisticsDbContext.Players.FindAsync(request.Id)).SteamId;

            return (await _steamService.GetPlayerSummary(playerSteamId)).ToSteamStatusPlayerDataResponse();
        }
    }
}
