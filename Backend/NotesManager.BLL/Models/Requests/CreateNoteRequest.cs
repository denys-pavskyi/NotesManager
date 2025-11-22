namespace NotesManager.BLL.Models.Requests;

public class CreateNoteRequest
{
    public string Title { get; set; } = null!;
    public string Content { get; set; } = null!;
}