using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Obj.Twins.Games.Statistics.Persistence.Models
{
    [Table(nameof(Player))]
    public class Player : Entity
    {
        public string Name { get; set; }

        public string SteamId { get; set; }

        public string SteamName { get; set; }

        public Uri SteamProfileUrl { get; set; }

        public Uri SteamAvatarUri { get; set; }

        public ICollection<PlayerInTeamInMatch> PlayerInTeamInMatches { get; set; }

        public bool IsDeleted { get; set; }
    }
}
