using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Migrations
{
    public partial class SeedUpTasks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.InsertData(
                table: "Boards",
                columns: new[] { "board_id", "board_name" },
                values: new object[] { "myBoard", "My board" });

            migrationBuilder.InsertData(
                table: "Columns",
                columns: new[] { "column_id", "board_id", "column_name" },
                values: new object[] { "myColumn", "myBoard", "My Column" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "task_id", "column_id", "deadline", "task_description", "is_done", "subtask_id", "task_name" },
                values: new object[] { "myTaks", "myColumn", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "My Task1" });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "task_id", "column_id", "deadline", "task_description", "is_done", "subtask_id", "task_name" },
                values: new object[] { "myTaks2", "myColumn", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "My Task2" });
        }

    }
}
