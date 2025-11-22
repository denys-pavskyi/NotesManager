namespace NotesManager.DAL.Repositories.Interfaces;

public interface IRepositoryWrapper
{
    INoteRepository NoteRepository { get; }

    public Task<int> SaveChangesAsync();
}