using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace NotesManager.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddedSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "Id", "Content", "CreatedAt", "Title", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("550e8400-e29b-41d4-a716-446655440001"), "This is your first note. Start organizing your thoughts and ideas!", new DateTime(2024, 1, 15, 10, 0, 0, 0, DateTimeKind.Utc), "Welcome to Notes", null },
                    { new Guid("550e8400-e29b-41d4-a716-446655440002"), "Remember to update the team on your progress during the standup meeting.", new DateTime(2024, 1, 14, 10, 0, 0, 0, DateTimeKind.Utc), "Daily Standup", null },
                    { new Guid("550e8400-e29b-41d4-a716-446655440003"), "Complete the API implementation and testing by end of this week.", new DateTime(2024, 1, 13, 10, 0, 0, 0, DateTimeKind.Utc), "Project Deadline", new DateTime(2024, 1, 14, 10, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("550e8400-e29b-41d4-a716-446655440004"), "Focus on logic, performance, and code style. Be constructive with feedback.", new DateTime(2024, 1, 12, 10, 0, 0, 0, DateTimeKind.Utc), "Code Review Tips", null },
                    { new Guid("550e8400-e29b-41d4-a716-446655440005"), "Discussed Q1 goals, team expansion, and new technology stack adoption.", new DateTime(2024, 1, 11, 10, 0, 0, 0, DateTimeKind.Utc), "Meeting Notes", new DateTime(2024, 1, 13, 10, 0, 0, 0, DateTimeKind.Utc) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "Id",
                keyValue: new Guid("550e8400-e29b-41d4-a716-446655440001"));

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "Id",
                keyValue: new Guid("550e8400-e29b-41d4-a716-446655440002"));

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "Id",
                keyValue: new Guid("550e8400-e29b-41d4-a716-446655440003"));

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "Id",
                keyValue: new Guid("550e8400-e29b-41d4-a716-446655440004"));

            migrationBuilder.DeleteData(
                table: "Notes",
                keyColumn: "Id",
                keyValue: new Guid("550e8400-e29b-41d4-a716-446655440005"));
        }
    }
}
