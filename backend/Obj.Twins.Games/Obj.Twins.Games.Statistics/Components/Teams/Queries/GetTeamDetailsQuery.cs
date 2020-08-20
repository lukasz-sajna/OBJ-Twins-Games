using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Obj.Twins.Games.Statistics.Components.Teams.Contracts;
using Obj.Twins.Games.Statistics.Components.Teams.Contracts.Extensions;
using Obj.Twins.Games.Statistics.Persistence;

namespace Obj.Twins.Games.Statistics.Components.Teams.Queries
{
    public class GetTeamDetailsQuery : IRequest<TeamDetailsResponse>
    {
        public Guid Id { get; set; }
    }

    internal class GetTeamDetailsQueryHandler : IRequestHandler<GetTeamDetailsQuery, TeamDetailsResponse>
    {
        private readonly StatisticsDbContext _statisticsDbContext;

        public GetTeamDetailsQueryHandler(StatisticsDbContext statisticsDbContext)
        {
            _statisticsDbContext = statisticsDbContext;
        }

        public async Task<TeamDetailsResponse> Handle(GetTeamDetailsQuery request, CancellationToken cancellationToken)
        {
            var team = await _statisticsDbContext.GetTeams()
                .FirstOrDefaultAsync(x => x.Id.Equals(request.Id) && !x.IsDeleted, cancellationToken);

            var matches = await _statisticsDbContext.GetMatches()
                .Where(x => x.TeamInMatches.Any(x => x.TeamId.Equals(team.Id)))
                .ToListAsync(cancellationToken);

            return team.ToTeamDetailsResponse(matches);
        }
    }
}
