using Microsoft.EntityFrameworkCore;
using NotesManager.DAL.Entities;

namespace NotesManager.DAL.Persistence;

public static class DataSeeder
{
    public static void SeedNotes(ModelBuilder modelBuilder)
    {
        var baseDate = new DateTime(2024, 1, 15, 10, 0, 0, DateTimeKind.Utc);

        modelBuilder.Entity<Note>().HasData(
            new Note
            {
                Id = new Guid("550e8400-e29b-41d4-a716-446655440001"),
                Title = "Welcome to Notes",
                Content = "This is your first note. Start organizing your thoughts and ideas!",
                CreatedAt = baseDate,
                UpdatedAt = null
            },
            new Note
            {
                Id = new Guid("550e8400-e29b-41d4-a716-446655440002"),
                Title = "Daily Standup",
                Content = "Remember to update the team on your progress during the standup meeting.",
                CreatedAt = baseDate.AddDays(-1),
                UpdatedAt = null
            },
            new Note
            {
                Id = new Guid("550e8400-e29b-41d4-a716-446655440003"),
                Title = "Project Deadline",
                Content = "Complete the API implementation and testing by end of this week.",
                CreatedAt = baseDate.AddDays(-2),
                UpdatedAt = baseDate.AddDays(-1)
            },
            new Note
            {
                Id = new Guid("550e8400-e29b-41d4-a716-446655440004"),
                Title = "Code Review Tips",
                Content = "Focus on logic, performance, and code style. Be constructive with feedback.",
                CreatedAt = baseDate.AddDays(-3),
                UpdatedAt = null
            },
            new Note
            {
                Id = new Guid("550e8400-e29b-41d4-a716-446655440005"),
                Title = "Meeting Notes",
                Content = "Discussed Q1 goals, team expansion, and new technology stack adoption.",
                CreatedAt = baseDate.AddDays(-4),
                UpdatedAt = baseDate.AddDays(-2)
            }
        );
    }
}