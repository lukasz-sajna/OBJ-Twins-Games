using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Obj.Twins.Games.DataSync.Hubs;
using Obj.Twins.Games.Demo.Client.Services;
using Obj.Twins.Games.Statistics.Persistence;

namespace Obj.Twins.Games.DataSync.Components.Commands
{
    public class SyncMatchesDemoCommand : IRequest
    {
    }

    internal class SyncMatchesDemoCommandHandler : IRequestHandler<SyncMatchesDemoCommand>
    {
        private readonly IDemoService _demoService;
        private readonly StatisticsDbContext _statsDbContext;
        private readonly IHubContext<StatisticsHub> _hubContext;

        public SyncMatchesDemoCommandHandler(IDemoService demoService, StatisticsDbContext statsDbContext, IHubContext<StatisticsHub> hubContext)
        {
            _demoService = demoService;
            _statsDbContext = statsDbContext;
            _hubContext = hubContext;
        }
        public async Task<Unit> Handle(SyncMatchesDemoCommand request, CancellationToken cancellationToken)
        {
            var matches = _statsDbContext.Matches;
            await _demoService.RefreshMatchDemoList();

            foreach (var match in matches)
            {
                var demoUrl =_demoService.GetDemoUrlForMatch(match.Map, match.MatchFinishedAt);
                
                match.DemoUrl = demoUrl != null ? new Uri(demoUrl) : null;

            }

            var isDataChanged = _statsDbContext.ChangeTracker.HasChanges();

            await _statsDbContext.SaveChangesAsync(cancellationToken);

            if (isDataChanged)
            {
                await _hubContext.Clients.All.SendAsync("Refreshed", cancellationToken);
            }

            return Unit.Value;
        }
    }
}
