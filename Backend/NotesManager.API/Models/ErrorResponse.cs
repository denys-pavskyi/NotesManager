namespace NotesManager.API.Models;

public class ErrorResponse
{
 public int StatusCode { get; set; }
    public string Message { get; set; } = null!;
    public Dictionary<string, List<string>>? Errors { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
