using Microsoft.EntityFrameworkCore;
using Obj.Twins.Games.ServerStatistics.Persistence.Models;

namespace Obj.Twins.Games.ServerStatistics.Persistence
{
    public class ServerStatsDbContext : DbContext
    {
        public ServerStatsDbContext(DbContextOptions<ServerStatsDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MatchDetails>().HasNoKey();
        }

        public DbSet<MatchDetails> MatchesDetails { get; set; }

        public DbSet<Match> Matches { get; set; }
    }
}
