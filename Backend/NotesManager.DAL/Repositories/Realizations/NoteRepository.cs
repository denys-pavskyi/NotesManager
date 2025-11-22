using Microsoft.EntityFrameworkCore;
using NotesManager.DAL.Entities;
using NotesManager.DAL.Persistence;
using NotesManager.DAL.Repositories.Interfaces;

namespace NotesManager.DAL.Repositories.Realizations;

public class NoteRepository: INoteRepository
{
    private readonly NotesManagerDbContext _context;

    public NoteRepository(NotesManagerDbContext context)
    {
        _context = context;
    }

    public Task<Note?> GetByIdAsync(Guid id)
    {
        var note = _context.Notes.FirstOrDefaultAsync(n => n.Id == id);
        return note;
    }

    public Task<List<Note>> GetAllAsync()
    {
        var notes = _context.Notes.ToListAsync();
        return notes;
    }

    public async Task AddAsync(Note note)
    {
        await _context.Notes.AddAsync(note);
    }

    public void Update(Note note)
    {
        _context.Notes.Update(note);
    }

    public void Remove(Note note)
    {
        _context.Notes.Remove(note);
    }
}