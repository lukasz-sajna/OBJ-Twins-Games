using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Obj.Twins.Games.Statistics.Components.Players.Contracts;
using Obj.Twins.Games.Statistics.Components.Players.Contracts.Extensions;
using Obj.Twins.Games.Statistics.Persistence;

namespace Obj.Twins.Games.Statistics.Components.Players.Queries
{
    public class GetPlayerDetailsQuery : IRequest<PlayerDetailsResponse>
    {
        public Guid Id { get; set; }
    }

    internal class GetPlayerDetailsQueryHandler: IRequestHandler<GetPlayerDetailsQuery, PlayerDetailsResponse>
    {
        private readonly StatisticsDbContext _statisticsDbContext;

        public GetPlayerDetailsQueryHandler(StatisticsDbContext statisticsDbContext)
        {
            _statisticsDbContext = statisticsDbContext;
        }

        public async Task<PlayerDetailsResponse> Handle(GetPlayerDetailsQuery request, CancellationToken cancellationToken)
        {
            var player = await _statisticsDbContext.Players
                .Include(p => p.PlayerInTeamInMatches)
                .ThenInclude(ptm => ptm.Match)
                .ThenInclude(m => m.TeamInMatches)
                .ThenInclude(o=>o.PlayerInTeamInMatches)
                .Include(p => p.PlayerInTeamInMatches)
                .ThenInclude(t => t.Team)
                .ThenInclude(z => z.NameFromPlayer)
                .FirstOrDefaultAsync(x => x.Id.Equals(request.Id) && !x.IsDeleted, cancellationToken);

            var playerTeams = await _statisticsDbContext.Teams
                .Include(t => t.NameFromPlayer)
                .Include(t => t.TeamInMatches)
                .ThenInclude(tim => tim.PlayerInTeamInMatches)
                .Where(x => x.TeamInMatches.Any(z => z.PlayerInTeamInMatches.Any(p => p.PlayerId.Equals(request.Id))))
                .ToListAsync(cancellationToken);

            var playerMatches = await _statisticsDbContext.Matches
                .Include(m => m.TeamInMatches)
                .ThenInclude(tim=>tim.Team)
                .ThenInclude(p=>p.NameFromPlayer)
                .Where(x => x.TeamInMatches.Any(z => z.PlayerInTeamInMatches.Any(c => c.PlayerId.Equals(request.Id))))
                .ToListAsync(cancellationToken);

            return player.ToPlayerDetailsResponse(playerTeams, playerMatches);
        }
    }
}
