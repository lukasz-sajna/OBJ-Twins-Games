using System.Collections.Generic;
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
    public class GetTeamsQuery : IRequest<List<TeamResponse>>
    {
    }

    internal class GetTeamsQueryHandler : IRequestHandler<GetTeamsQuery, List<TeamResponse>>
    {
        private readonly StatisticsDbContext _statisticsDbContext;

        public GetTeamsQueryHandler(StatisticsDbContext statisticsDbContext)
        {
            _statisticsDbContext = statisticsDbContext;
        }
        public async Task<List<TeamResponse>> Handle(GetTeamsQuery request, CancellationToken cancellationToken)
        {
            var teams = await _statisticsDbContext.GetTeams().ToListAsync(cancellationToken);

            var mappedTeams = teams.Select(x => x.ToTeamResponse()).ToList();

            return mappedTeams;
        }
    }
}
