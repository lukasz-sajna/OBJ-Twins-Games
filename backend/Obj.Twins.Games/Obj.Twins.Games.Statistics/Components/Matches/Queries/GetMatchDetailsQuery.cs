using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Obj.Twins.Games.Statistics.Components.Matches.Contracts;
using Obj.Twins.Games.Statistics.Components.Matches.Contracts.Extensions;
using Obj.Twins.Games.Statistics.Persistence;

namespace Obj.Twins.Games.Statistics.Components.Matches.Queries
{
    public class GetMatchDetailsQuery : IRequest<MatchDetailsResponse>
    {
        public Guid Id { get; set; }
    }

    internal class GetMatchDetailsQueryHandler : IRequestHandler<GetMatchDetailsQuery, MatchDetailsResponse>
    {
        private readonly StatisticsDbContext _statsDbContext;

        public GetMatchDetailsQueryHandler(StatisticsDbContext statsDbContext)
        {
            _statsDbContext = statsDbContext;
        }

        public async Task<MatchDetailsResponse> Handle(GetMatchDetailsQuery request, CancellationToken cancellationToken)
        {
            var match = await _statsDbContext.GetMatchDetails(request.Id, cancellationToken);

            return match.ToMatchDetailsResponse();
        }
    }
}
