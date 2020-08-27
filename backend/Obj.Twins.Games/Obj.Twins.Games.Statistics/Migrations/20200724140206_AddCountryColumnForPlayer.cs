using Microsoft.EntityFrameworkCore.Migrations;

namespace Obj.Twins.Games.Statistics.Migrations
{
    public partial class AddCountryColumnForPlayer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Country",
                schema: "Stats",
                table: "Player",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PlayerInTeamInMatch_MatchId",
                schema: "Stats",
                table: "PlayerInTeamInMatch",
                column: "MatchId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerInTeamInMatch_Match_MatchId",
                schema: "Stats",
                table: "PlayerInTeamInMatch",
                column: "MatchId",
                principalSchema: "Stats",
                principalTable: "Match",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerInTeamInMatch_Teams_TeamId",
                schema: "Stats",
                table: "PlayerInTeamInMatch",
                column: "TeamId",
                principalSchema: "Stats",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlayerInTeamInMatch_Match_MatchId",
                schema: "Stats",
                table: "PlayerInTeamInMatch");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerInTeamInMatch_Teams_TeamId",
                schema: "Stats",
                table: "PlayerInTeamInMatch");

            migrationBuilder.DropIndex(
                name: "IX_PlayerInTeamInMatch_MatchId",
                schema: "Stats",
                table: "PlayerInTeamInMatch");

            migrationBuilder.DropColumn(
                name: "Country",
                schema: "Stats",
                table: "Player");
        }
    }
}
