using AutoMapper;
using Azure;
using NotesManager.BLL.Models.Dtos;
using NotesManager.DAL.Entities;

namespace NotesManager.BLL.Others;

public class MapperProfile : Profile
{

    public MapperProfile()
    {
        CreateMap<Note, NoteDto>()
            .ReverseMap();
        
    }

}