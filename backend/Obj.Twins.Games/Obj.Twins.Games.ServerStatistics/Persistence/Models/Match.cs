using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Obj.Twins.Games.ServerStatistics.Persistence.Models
{
    [Table("sql_matches_scoretotal")]
    public class Match
    {
        [Key] [Required] [Column("match_id")] public long MatchId { get; set; }

        [Column("timestamp")] public DateTime Timestamp { get; set; }

        [Column("team_0")] public int Team0 { get; set; }

        [Column("team_1")] public int Team1 { get; set; }

        [Column("team_2")] public int Team2 { get; set; }

        [Column("team_3")] public int Team3 { get; set; }

        [Column("teamname_1")] [MaxLength(64)] public string TeamName1 { get; set; }

        [Column("teamname_2")] [MaxLength(64)] public string TeamName2 { get; set; }

        [Column("teamflag_1")] [MaxLength(64)] public string TeamFlag1 { get; set; }

        [Column("teamflag_2")] [MaxLength(64)] public string TeamFlag2 { get; set; }

        [Column("map")] [MaxLength(128)] public string Map { get; set; }
    }
}
