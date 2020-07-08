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
    public class GetPlayersQuery : IRequest<List<PlayerResponse>>
    {
    }

    internal class GetPlayersQueryHandler : IRequestHandler<GetPlayersQuery, List<PlayerResponse>>
    {
        private readonly StatsDbContext _statsDbContext;

        public GetPlayersQueryHandler(StatsDbContext statsDbContext)
        {
            _statsDbContext = statsDbContext;
        }

        public async Task<List<PlayerResponse>> Handle(GetPlayersQuery request, CancellationToken cancellationToken)
        {
            var players = await _statsDbContext.PlayerInTeamInMatches.Include(x => x.Player)
                .Select(p => p.ToPlayerResponse())
                .ToListAsync(cancellationToken);

            return players.ToOverallPlayerStats();
        }
    }
}
