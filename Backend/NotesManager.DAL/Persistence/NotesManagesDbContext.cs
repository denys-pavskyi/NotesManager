using Microsoft.EntityFrameworkCore;
using NotesManager.DAL.Entities;

namespace NotesManager.DAL.Persistence;

public class NotesManagesDbContext : DbContext
{
    public DbSet<Note> Notes { get; set; }

    public NotesManagesDbContext(DbContextOptions<NotesManagesDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}