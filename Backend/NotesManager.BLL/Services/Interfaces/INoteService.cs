using NotesManager.BLL.Models.Dtos;
using NotesManager.BLL.Models.Requests;
using NotesManager.BLL.Others.ResultPattern;

namespace NotesManager.BLL.Services.Interfaces;

public interface INoteService
{
    Task<Result<NoteDto>> GetByIdAsync(Guid id);
    Task<Result<List<NoteDto>>> GetAllAsync();
    Task<Result<NoteDto>> AddAsync(CreateNoteRequest noteCreateRequest);
    Task<Result<NoteDto>> UpdateAsync(Guid noteId, UpdateNoteRequest noteUpdateRequest);
    Task<Result<bool>> RemoveAsync(Guid id);
}