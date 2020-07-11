using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Obj.Twins.Games.Statistics.Components.Matches.Queries;

namespace Obj.Twins.Games.Api.Controllers
{
    [Route("api/[controller]")]
    public class MatchesController : Controller
    {
        private readonly IMediator _mediator;

        public MatchesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetMatchesAsync()
        {
            return Ok(await _mediator.Send(new GetMatchesQuery()));
        }

        [HttpGet("MatchDetails")]
        public async Task<IActionResult> GetMatchDetails(Guid id)
        {
            return Ok(await _mediator.Send(new GetMatchDetailsQuery {Id = id}));
        }
    }
}
