using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Obj.Twins.Games.Statistics.Components.Players.Contracts;
using Obj.Twins.Games.Statistics.Components.Players.Contracts.Extensions;
using Obj.Twins.Games.Statistics.Persistence;

namespace Obj.Twins.Games.Statistics.Components.Players.Queries
{
    public class GetFilteredPlayersQuery : IRequest<List<PlayerResponse>>
    {
        public DateTime Begin;
        public DateTime End;
    }

    internal class GetFilteredPlayersQueryHandler : IRequestHandler<GetFilteredPlayersQuery, List<PlayerResponse>>
    {
        private readonly StatisticsDbContext _statsDbContext;

        public GetFilteredPlayersQueryHandler(StatisticsDbContext statsDbContext)
        {
            _statsDbContext = statsDbContext;
        }

        public async Task<List<PlayerResponse>> Handle(GetFilteredPlayersQuery request, CancellationToken cancellationToken)
        {
            var players = await _statsDbContext.PlayerInTeamInMatches.Include(x => x.Player)
                .Include(tm => tm.TeamInMatch)
                .ThenInclude(m => m.Match)
                .Where(pt => pt.Match.MatchFinishedAt > request.Begin && pt.Match.MatchFinishedAt <= request.End)
                .Select(p => p.ToPlayerResponse())
                .ToListAsync(cancellationToken);
                
            return players.ToOverallPlayerStats();
        }
    }
}
