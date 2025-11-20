using System.ComponentModel.DataAnnotations;

namespace NotesManager.DAL.Entities;

public class Note
{
    [Key]
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public string Content { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}