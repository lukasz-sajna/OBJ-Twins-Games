﻿using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Obj.Twins.Games.Statistics.Persistence.Models;

namespace Obj.Twins.Games.Statistics.Persistence
{
    public class StatisticsDbContext : DbContext
    {
        public StatisticsDbContext(DbContextOptions<StatisticsDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("Stats");

            var cascadeFKs = modelBuilder.Model.GetEntityTypes()
                .SelectMany(t => t.GetForeignKeys())
                .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var fk in cascadeFKs)
                fk.DeleteBehavior = DeleteBehavior.Restrict;
            
            modelBuilder.Entity<TeamInMatch>()
                .HasKey(tm => new {tm.TeamId, tm.MatchId});

            modelBuilder.Entity<TeamInMatch>()
                .HasOne(tm => tm.Team)
                .WithMany(t => t.TeamInMatches)
                .HasForeignKey(tm => tm.TeamId);

            modelBuilder.Entity<TeamInMatch>()
                .HasOne(tm => tm.Match)
                .WithMany(m => m.TeamInMatches)
                .HasForeignKey(tm => tm.MatchId);


            modelBuilder.Entity<PlayerInTeamInMatch>()
                .HasKey(tm => new {tm.PlayerId, tm.TeamId, tm.MatchId});

            modelBuilder.Entity<PlayerInTeamInMatch>()
                .HasOne(tm => tm.Player)
                .WithMany(t => t.PlayerInTeamInMatches)
                .HasForeignKey(tm => tm.PlayerId);

            modelBuilder.Entity<PlayerInTeamInMatch>()
                .HasOne(tm => tm.TeamInMatch)
                .WithMany(m => m.PlayerInTeamInMatches)
                .HasForeignKey(tm => new {tm.TeamId, tm.MatchId});

            modelBuilder.Entity<Player>()
                .HasIndex(p => p.SteamId)
                .IsUnique();

            modelBuilder.Entity<Match>()
                .HasIndex(m => m.OriginalMatchId)
                .IsUnique();

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Match> Matches { get; set; }

        public DbSet<Team> Teams { get; set; }

        public DbSet<Player> Players { get; set; }

        public DbSet<TeamInMatch> TeamInMatches { get; set; }

        public DbSet<PlayerInTeamInMatch> PlayerInTeamInMatches { get; set; }

        public IQueryable<Match> GetMatches()
        {
            return Matches.Include(x => x.TeamInMatches).ThenInclude(x => x.Team).ThenInclude(x => x.NameFromPlayer)
                .Where(x => !x.IsDeleted)
                .OrderByDescending(m => m.MatchFinishedAt);
        }

        public Task<Match> GetMatchDetails(Guid id, CancellationToken cancellationToken = default)
        {
            return Matches
                .Include(x => x.TeamInMatches)
                .ThenInclude(x => x.PlayerInTeamInMatches)
                .ThenInclude(x => x.Player)
                .Include(x => x.TeamInMatches)
                .ThenInclude(x => x.Team)
                .ThenInclude(x => x.NameFromPlayer)
                .Where(x => !x.IsDeleted)
                .FirstOrDefaultAsync(x => x.Id.Equals(id), cancellationToken);
        }

        public IQueryable<Team> GetTeams()
        {
            return Teams
                .Include(t => t.NameFromPlayer)
                .Include(t => t.TeamInMatches)
                .ThenInclude(tim => tim.Match)
                .Where(m => !m.IsDeleted)
                .Include(t => t.TeamInMatches)
                .ThenInclude(p => p.PlayerInTeamInMatches)
                .ThenInclude(pim => pim.Player);
        }

    }
}
