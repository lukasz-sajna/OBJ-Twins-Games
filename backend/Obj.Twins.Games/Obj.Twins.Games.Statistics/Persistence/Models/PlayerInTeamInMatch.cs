using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Obj.Twins.Games.Statistics.Persistence.Models
{
    [Table(nameof(PlayerInTeamInMatch))]
    public class PlayerInTeamInMatch
    {
        public Guid PlayerId { get; set; }

        public Player Player { get; set; }

        public Guid TeamId { get; set; }

        public Guid MatchId { get; set; }

        public TeamInMatch TeamInMatch { get; set; }

        public int Kills { get; set; }

        public int Assists { get; set; }

        public int Deaths { get; set; }

        public int Mvp { get; set; }

        public int Score { get; set; }

        public bool IsDeleted { get; set; }

    }
}
