using NotesManager.DAL.Entities;

namespace NotesManager.DAL.Repositories.Interfaces;

public interface INoteRepository
{
    Task<Note?> GetByIdAsync(Guid id);
    Task<List<Note>> GetAllAsync();
    Task AddAsync(Note note);
    void Update(Note note);
    void Remove(Note note);
}