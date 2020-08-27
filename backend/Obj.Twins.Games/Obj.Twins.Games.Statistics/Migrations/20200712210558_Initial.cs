using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Obj.Twins.Games.Statistics.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Stats");

            migrationBuilder.CreateTable(
                name: "Match",
                schema: "Stats",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    OriginalMatchId = table.Column<long>(nullable: false),
                    Map = table.Column<string>(nullable: true),
                    DemoUrl = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    MatchFinishedAt = table.Column<DateTime>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Match", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Player",
                schema: "Stats",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    SteamId = table.Column<string>(nullable: true),
                    SteamName = table.Column<string>(nullable: true),
                    SteamProfileUrl = table.Column<string>(nullable: true),
                    SteamAvatarUri = table.Column<string>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Player", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                schema: "Stats",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Flag = table.Column<string>(nullable: true),
                    NameFromPlayerId = table.Column<Guid>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Teams_Player_NameFromPlayerId",
                        column: x => x.NameFromPlayerId,
                        principalSchema: "Stats",
                        principalTable: "Player",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TeamInMatch",
                schema: "Stats",
                columns: table => new
                {
                    MatchId = table.Column<Guid>(nullable: false),
                    TeamId = table.Column<Guid>(nullable: false),
                    Score = table.Column<int>(nullable: false),
                    Result = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamInMatch", x => new { x.TeamId, x.MatchId });
                    table.ForeignKey(
                        name: "FK_TeamInMatch_Match_MatchId",
                        column: x => x.MatchId,
                        principalSchema: "Stats",
                        principalTable: "Match",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TeamInMatch_Teams_TeamId",
                        column: x => x.TeamId,
                        principalSchema: "Stats",
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PlayerInTeamInMatch",
                schema: "Stats",
                columns: table => new
                {
                    PlayerId = table.Column<Guid>(nullable: false),
                    TeamId = table.Column<Guid>(nullable: false),
                    MatchId = table.Column<Guid>(nullable: false),
                    Kills = table.Column<int>(nullable: false),
                    Assists = table.Column<int>(nullable: false),
                    Deaths = table.Column<int>(nullable: false),
                    Mvp = table.Column<int>(nullable: false),
                    Score = table.Column<int>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerInTeamInMatch", x => new { x.PlayerId, x.TeamId, x.MatchId });
                    table.ForeignKey(
                        name: "FK_PlayerInTeamInMatch_Player_PlayerId",
                        column: x => x.PlayerId,
                        principalSchema: "Stats",
                        principalTable: "Player",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PlayerInTeamInMatch_TeamInMatch_TeamId_MatchId",
                        columns: x => new { x.TeamId, x.MatchId },
                        principalSchema: "Stats",
                        principalTable: "TeamInMatch",
                        principalColumns: new[] { "TeamId", "MatchId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Match_OriginalMatchId",
                schema: "Stats",
                table: "Match",
                column: "OriginalMatchId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Player_SteamId",
                schema: "Stats",
                table: "Player",
                column: "SteamId",
                unique: true,
                filter: "[SteamId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerInTeamInMatch_TeamId_MatchId",
                schema: "Stats",
                table: "PlayerInTeamInMatch",
                columns: new[] { "TeamId", "MatchId" });

            migrationBuilder.CreateIndex(
                name: "IX_TeamInMatch_MatchId",
                schema: "Stats",
                table: "TeamInMatch",
                column: "MatchId");

            migrationBuilder.CreateIndex(
                name: "IX_Teams_NameFromPlayerId",
                schema: "Stats",
                table: "Teams",
                column: "NameFromPlayerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlayerInTeamInMatch",
                schema: "Stats");

            migrationBuilder.DropTable(
                name: "TeamInMatch",
                schema: "Stats");

            migrationBuilder.DropTable(
                name: "Match",
                schema: "Stats");

            migrationBuilder.DropTable(
                name: "Teams",
                schema: "Stats");

            migrationBuilder.DropTable(
                name: "Player",
                schema: "Stats");
        }
    }
}
