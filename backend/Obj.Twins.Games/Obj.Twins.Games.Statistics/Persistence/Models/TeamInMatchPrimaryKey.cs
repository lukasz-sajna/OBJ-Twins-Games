using System;

namespace Obj.Twins.Games.Statistics.Persistence.Models
{
    public class TeamInMatchPrimaryKey
    {
        public TeamInMatchPrimaryKey(Guid teamId, Guid matchId)
        {
            TeamId = teamId;
            MatchId = matchId;
        }

        public Guid TeamId { get; }

        public Guid MatchId { get; }
    }
}
