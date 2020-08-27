using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Obj.Twins.Games.DataSync.Components.Queries;
using Obj.Twins.Games.Statistics.Components.Players.Queries;

namespace Obj.Twins.Games.Api.Controllers
{
    [Route("api/[controller]")]
    public class PlayersController : Controller
    {
        private readonly IMediator _mediator;

        public PlayersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlayers()
        {
            return Ok(await _mediator.Send(new GetPlayersQuery()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlayerDetails(Guid id)
        {
            var result = await _mediator.Send(new GetPlayerDetailsQuery {Id = id});

            return Ok(result);
        }

        [HttpGet("{id}/status")]
        public async Task<IActionResult> GetPlayerStatus(Guid id)
        {
            var result = await _mediator.Send(new GetPlayerSteamStatusQuery {Id = id});

            return Ok(result);
        }
    }
}
