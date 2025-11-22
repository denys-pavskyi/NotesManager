using System.ComponentModel.DataAnnotations;

namespace NotesManager.DAL.Entities;

public class Note
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(40)]
    public string Title { get; set; } = null!;

    [Required]
    [MaxLength(1000)]
    public string Content { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}