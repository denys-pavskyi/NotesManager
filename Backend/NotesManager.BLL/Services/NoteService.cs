using AutoMapper;
using NotesManager.BLL.Models.Dtos;
using NotesManager.BLL.Models.Requests;
using NotesManager.BLL.Others.ResultPattern;
using NotesManager.BLL.Services.Interfaces;
using NotesManager.DAL.Entities;
using NotesManager.DAL.Repositories.Interfaces;

namespace NotesManager.BLL.Services;

public class NoteService : INoteService
{
    private readonly IRepositoryWrapper _repositoryWrapper;
    private readonly IMapper _mapper;

    public NoteService(IRepositoryWrapper repositoryWrapper, IMapper mapper)
    {
        _repositoryWrapper = repositoryWrapper;
        _mapper = mapper;
    }

    public async Task<Result<NoteDto>> GetByIdAsync(Guid id)
    {
        var note = await _repositoryWrapper.NoteRepository.GetByIdAsync(id);
        if (note == null)
        {
            return Result<NoteDto>.Fail(
                ErrorType.NotFound, 
                "Note was not found");
        }
        var dto = _mapper.Map<NoteDto>(note);
        return Result<NoteDto>.Ok(dto);
    }

    public async Task<Result<List<NoteDto>>> GetAllAsync()
    {
        var notes = await _repositoryWrapper.NoteRepository.GetAllAsync();
        var dtos = _mapper.Map<List<NoteDto>>(notes);

        return Result<List<NoteDto>>.Ok(dtos);
    }

    public async Task<Result<NoteDto>> AddAsync(CreateNoteRequest noteCreateRequest)
    {
        var note = _mapper.Map<Note>(noteCreateRequest);

        var dateOfCreation = DateTime.UtcNow;
        note.CreatedAt = dateOfCreation;
        note.UpdatedAt = dateOfCreation;

        await _repositoryWrapper.NoteRepository.AddAsync(note);

        var resultIsSuccess = await _repositoryWrapper.SaveChangesAsync() > 0;
        if (resultIsSuccess)
        {
            var dto = _mapper.Map<NoteDto>(note);
            return Result<NoteDto>.Ok(dto);
        }
        return Result<NoteDto>.Fail(
            ErrorType.Internal, 
            "Failed to add note");
    }

    public async Task<Result<NoteDto>> UpdateAsync(Guid noteId, UpdateNoteRequest noteUpdateRequest)
    {
        var note = await _repositoryWrapper.NoteRepository.GetByIdAsync(noteId);
        if (note == null)
        {
            return Result<NoteDto>.Fail(
                ErrorType.NotFound, 
                "Note was not found"
                );
        }

        note.Title = noteUpdateRequest.Title;
        note.Content = noteUpdateRequest.Content;
        note.UpdatedAt = DateTime.UtcNow;

        _repositoryWrapper.NoteRepository.Update(note);

        var resultIsSuccess = await _repositoryWrapper.SaveChangesAsync() > 0;
        if (resultIsSuccess)
        {
            var dto = _mapper.Map<NoteDto>(note);
            return Result<NoteDto>.Ok(dto);
        }
        return Result<NoteDto>.Fail(
            ErrorType.Internal, 
            "Failed to update note");
    }

    public async Task<Result<NoteDto>> RemoveAsync(Guid id)
    {
        var note = await _repositoryWrapper.NoteRepository.GetByIdAsync(id);
        if (note == null)
        {
            return Result<NoteDto>.Fail(
                ErrorType.NotFound, 
                "Note not found");
        }
        _repositoryWrapper.NoteRepository.Remove(note);
        var resultIsSuccess = await _repositoryWrapper.SaveChangesAsync() > 0;
        if (resultIsSuccess)
        {
            var noteDto = _mapper.Map<NoteDto>(note);
            return Result<NoteDto>.Ok(noteDto);
        }
        return Result<NoteDto>.Fail(
            ErrorType.Internal, 
            "Failed to remove note");
    }
}