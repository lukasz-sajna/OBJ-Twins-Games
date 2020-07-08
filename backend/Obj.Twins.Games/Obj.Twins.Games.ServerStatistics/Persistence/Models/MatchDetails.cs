using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Obj.Twins.Games.ServerStatistics.Persistence.Models
{
    [Table("sql_matches")]
    public class MatchDetails
    {
        [Column("match_id")] public long MatchId { get; set; }

        [Column("name")] [MaxLength(65)] public string PlayerName { get; set; }

        [Column("steamid64")] [MaxLength(64)] public string SteamId { get; set; }

        [Column("team")] public int Team { get; set; }

        [Column("alive")] public int Alive { get; set; }

        [Column("ping")] public int Ping { get; set; }

        [Column("account")] public int Account { get; set; }

        [Column("kills")] public int Kills { get; set; }

        [Column("assists")] public int Assists { get; set; }

        [Column("deaths")] public int Deaths { get; set; }

        [Column("mvps")] public int Mvps { get; set; }

        [Column("score")] public int Score { get; set; }
    }
}
