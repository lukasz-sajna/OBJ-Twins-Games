using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Obj.Twins.Games.Statistics.Components.Matches.Contracts;
using Obj.Twins.Games.Statistics.Components.Matches.Contracts.Extensions;
using Obj.Twins.Games.Statistics.Persistence;

namespace Obj.Twins.Games.Statistics.Components.Matches.Queries
{
    public class GetMatchesQuery : IRequest<List<MatchResponse>>
    {
        internal class GetMatchesQueryHandler : IRequestHandler<GetMatchesQuery, List<MatchResponse>>
        {
            private readonly StatisticsDbContext _statsDbContext;

            public GetMatchesQueryHandler(StatisticsDbContext statsDbContext)
            {
                _statsDbContext = statsDbContext;
            }
            public async Task<List<MatchResponse>> Handle(GetMatchesQuery request, CancellationToken cancellationToken)
            {
                var matches = await _statsDbContext.GetMatches().ToListAsync(cancellationToken);

                return matches.Select(x => x.ToMatchResponse()).ToList();
            }
        }
    }
}
