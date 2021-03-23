using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Migrations
{
    public partial class CreateUsersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "TEXT", nullable: false),
                    username = table.Column<string>(type: "char(50)", nullable: false),
                    password = table.Column<string>(type: "char(250)", nullable: false),
                    email = table.Column<string>(type: "char(250)", nullable: false),
                    taken_quests = table.Column<string>(type: "char", nullable: true),
                    done_quests = table.Column<string>(type: "char", nullable: true),
                    badges = table.Column<string>(type: "char", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.user_id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "user_id", "badges", "done_quests", "email", "password", "taken_quests", "username" },
                values: new object[] { "First", null, null, "stub@stub.com", "12345", null, "Márton Szabó" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
