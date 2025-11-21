using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;
using NotesManager.API.Others;
using NotesManager.API.Models;
using NotesManager.BLL.Models.Dtos;
using NotesManager.BLL.Models.Requests;
using NotesManager.BLL.Others.ResultPattern;
using NotesManager.BLL.Services.Interfaces;

namespace NotesManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly INoteService _noteService;
        private readonly IValidator<NoteDto> _noteDtoValidator;
        private readonly IValidator<UpdateNoteRequest> _updateNoteRequestValidator;

        public NotesController(
            INoteService noteService,
            IValidator<NoteDto> noteDtoValidator,
            IValidator<UpdateNoteRequest> updateNoteRequestValidator)
        {
            _noteService = noteService;
            _noteDtoValidator = noteDtoValidator;
            _updateNoteRequestValidator = updateNoteRequestValidator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _noteService.GetAllAsync();
            return result.ToActionResult();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _noteService.GetByIdAsync(id);
            return result.ToActionResult();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NoteDto noteDto)
        {
            var validationError = await noteDto.ValidateAsync(_noteDtoValidator);
            if (validationError != null)
                return BadRequest(validationError);

            var result = await _noteService.AddAsync(noteDto);
            return result.ToActionResult();
        }

        [HttpPut("{noteId}")]
        public async Task<IActionResult> Update(Guid noteId, [FromBody] UpdateNoteRequest updateNoteRequest)
        {
            var validationError = await updateNoteRequest.ValidateAsync(_updateNoteRequestValidator);
            if (validationError != null)
                return BadRequest(validationError);

            var result = await _noteService.UpdateAsync(noteId, updateNoteRequest);
            return result.ToActionResult();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _noteService.RemoveAsync(id);
            return result.ToActionResult();
        }
    }
}
