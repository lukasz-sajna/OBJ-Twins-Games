using System;
using System.Linq;
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
            var matchesWithoutDemoUrl = _statsDbContext.Matches.Where(x => x.DemoUrl == null);

            foreach (var matchWithoutDemoUrl in matchesWithoutDemoUrl)
            {
                var demoUrl =
                    await _demoService.GetDemoUrlForMatch(matchWithoutDemoUrl.Map, matchWithoutDemoUrl.MatchFinishedAt);

                if (demoUrl != null)
                {
                    matchWithoutDemoUrl.DemoUrl = new Uri(demoUrl);
                }
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
