using System;

namespace Obj.Twins.Games.Statistics.Components.Teams.Contracts
{
    public class PlayerInTeamResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public Uri Avatar { get; set; }
    }
}
