﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Obj.Twins.Games.Statistics.Persistence;

namespace Obj.Twins.Games.Statistics.Migrations
{
    [DbContext(typeof(StatisticsDbContext))]
    [Migration("20200724140206_AddCountryColumnForPlayer")]
    partial class AddCountryColumnForPlayer
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("Stats")
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Obj.Twins.Games.Statistics.Persistence.Models.Match", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("DemoUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Map")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("MatchFinishedAt")
                        .HasColumnType("datetime2");

                    b.Property<long>("OriginalMatchId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("OriginalMatchId")
                        .IsUnique();

                    b.ToTable("Match");
                });

            modelBuilder.Entity("Obj.Twins.Games.Statistics.Persistence.Models.Player", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SteamAvatarUri")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SteamId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("SteamName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SteamProfileUrl")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("SteamId")
                        .IsUnique()
                        .HasFilter("[SteamId] IS NOT NULL");

                    b.ToTable("Player");
                });

            modelBuilder.Entity("Obj.Twins.Games.Statistics.Persistence.Models.PlayerInTeamInMatch", b =>
                {
                    b.Property<Guid>("PlayerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TeamId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("MatchId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Assists")
                        .HasColumnType("int");

                    b.Property<int>("Deaths")
                        .HasColumnType("int");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("Kills")
                        .HasColumnType("int");

                    b.Property<int>("Mvp")
                        .HasColumnType("int");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.HasKey("PlayerId", "TeamId", "MatchId");

                    b.HasIndex("MatchId");

                    b.HasIndex("TeamId", "MatchId");

                    b.ToTable("PlayerInTeamInMatch");
                });

            modelBuilder.Entity("Obj.Twins.Games.Statistics.Persistence.Models.Team", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Flag")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<Guid>("NameFromPlayerId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("NameFromPlayerId");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("Obj.Twins.Games.Statistics.Persistence.Models.TeamInMatch", b =>
                {
                    b.Property<Guid>("TeamId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("MatchId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Result")
                        .HasColumnType("int");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.HasKey("TeamId", "MatchId");

                    b.HasIndex("MatchId");

                    b.ToTable("TeamInMatch");
                });

            modelBuilder.Entity("Obj.Twins.Games.Statistics.Persistence.Models.PlayerInTeamInMatch", b =>
                {
                    b.HasOne("Obj.Twins.Games.Statistics.Persistence.Models.Match", "Match")
                        .WithMany()
                        .HasForeignKey("MatchId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Obj.Twins.Games.Statistics.Persistence.Models.Player", "Player")
                        .WithMany("PlayerInTeamInMatches")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Obj.Twins.Games.Statistics.Persistence.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Obj.Twins.Games.Statistics.Persistence.Models.TeamInMatch", "TeamInMatch")
                        .WithMany("PlayerInTeamInMatches")
                        .HasForeignKey("TeamId", "MatchId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Obj.Twins.Games.Statistics.Persistence.Models.Team", b =>
                {
                    b.HasOne("Obj.Twins.Games.Statistics.Persistence.Models.Player", "NameFromPlayer")
                        .WithMany()
                        .HasForeignKey("NameFromPlayerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Obj.Twins.Games.Statistics.Persistence.Models.TeamInMatch", b =>
                {
                    b.HasOne("Obj.Twins.Games.Statistics.Persistence.Models.Match", "Match")
                        .WithMany("TeamInMatches")
                        .HasForeignKey("MatchId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Obj.Twins.Games.Statistics.Persistence.Models.Team", "Team")
                        .WithMany("TeamInMatches")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
