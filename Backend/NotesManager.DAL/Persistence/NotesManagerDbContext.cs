using Microsoft.EntityFrameworkCore;
using NotesManager.DAL.Entities;

namespace NotesManager.DAL.Persistence;

public class NotesManagerDbContext : DbContext
{
    public DbSet<Note> Notes { get; set; }

    public NotesManagerDbContext(DbContextOptions<NotesManagerDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        DataSeeder.SeedNotes(modelBuilder);
    }
}