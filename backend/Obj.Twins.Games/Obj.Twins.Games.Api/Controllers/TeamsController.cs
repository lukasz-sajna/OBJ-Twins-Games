using System;
using MediatR;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult GetTeams()
        {
            return Ok();
        }

        [HttpGet("TeamDetails")]
        public IActionResult GetTeamDetails(Guid id)
        {
            return Ok();
        }
    }
}
