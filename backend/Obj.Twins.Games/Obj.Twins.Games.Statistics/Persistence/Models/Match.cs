using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace Obj.Twins.Games.Statistics.Persistence.Models
{
    [Table(nameof(Match))]
    public class Match : Entity
    {
        public long OriginalMatchId { get; set; }

        public string Map { get; set; }

        public Uri DemoUrl { get; set; }

        public DateTimeOffset CreatedDate {get; set; }

        public DateTime MatchFinishedAt { get; set; }

        public ICollection<TeamInMatch> TeamInMatches { get; set; }

        public bool IsDeleted { get; set; }
    }
}
