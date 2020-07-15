using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Obj.Twins.Games.Statistics.Components.Teams.Queries;

namespace Obj.Twins.Games.Api.Controllers
{
    [Route("api/[controller]")]
    public class TeamsController : Controller
    {
        private readonly IMediator _mediator;

        public TeamsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetTeams()
        {
            return Ok(await _mediator.Send(new GetTeamsQuery()));
        }

        [HttpGet("TeamDetails")]
        public IActionResult GetTeamDetails(Guid id)
        {
            return Ok();
        }
    }
}
