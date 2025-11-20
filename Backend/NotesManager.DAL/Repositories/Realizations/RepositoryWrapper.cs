using NotesManager.DAL.Persistence;
using NotesManager.DAL.Repositories.Interfaces;

namespace NotesManager.DAL.Repositories.Realizations;

public class RepositoryWrapper: IRepositoryWrapper
{
    private readonly NotesManagerDbContext _dbContext;
    private INoteRepository _noteRepository;

    public RepositoryWrapper(NotesManagerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public INoteRepository NoteRepository
    {
        get
        {   
            if (_noteRepository is null)
            {
                _noteRepository = new NoteRepository(_dbContext);
            }

            return _noteRepository;
        }
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _dbContext.SaveChangesAsync();
    }

}