using System.Collections.Generic;
using Obj.Twins.Games.Statistics.Components.Players.Contracts;

namespace Obj.Twins.Games.Statistics.Components.Matches.Contracts
{
    public class TeamInMatchDetailsResponse : TeamInMatchResponse
    {
        public List<PlayerResponse> Players { get; set; }
    }
}