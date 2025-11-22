using AutoMapper;
using Azure;
using NotesManager.BLL.Models.Dtos;
using NotesManager.BLL.Models.Requests;
using NotesManager.DAL.Entities;

namespace NotesManager.BLL.Others;

public class MapperProfile : Profile
{

    public MapperProfile()
    {
        CreateMap<Note, NoteDto>()
            .ReverseMap();

        CreateMap<CreateNoteRequest, Note>()
            .ReverseMap();

    }

}