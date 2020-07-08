using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Obj.Twins.Games.Statistics.Persistence.Models
{
    public class Team : Entity
    {
        public string Name => $"team_{NameFromPlayer.SteamName}";

        public string Flag { get; set; }

        public ICollection<TeamInMatch> TeamInMatches { get; set; }

        [ForeignKey("NameFromPlayerId")]
        public Guid NameFromPlayerId { get; set; }

        public Player NameFromPlayer { get; set; }


        public bool IsDeleted { get; set; }
    }
}
