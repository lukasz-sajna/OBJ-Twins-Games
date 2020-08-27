using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Obj.Twins.Games.Statistics.Components.Matches.Enums;

namespace Obj.Twins.Games.Statistics.Persistence.Models
{
    [Table(nameof(TeamInMatch))]
    public class TeamInMatch
    {
        public Guid MatchId { get; set; }

        public Match Match { get; set; }

        public Guid TeamId { get; set; }

        public Team Team { get; set; }

        public ICollection<PlayerInTeamInMatch> PlayerInTeamInMatches { get; set; }

        public int Score { get; set; }

        public MatchResult Result { get; set; }

        public object GetPrimaryKey()
        {
            return new { TeamId, MatchId };
        }
    }
}
