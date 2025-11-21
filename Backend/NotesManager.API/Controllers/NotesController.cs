using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NotesManager.BLL.Models.Dtos;
using NotesManager.BLL.Services.Interfaces;
using NotesManager.API.Others;
using NotesManager.BLL.Others.ResultPattern;

namespace NotesManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly INoteService _noteService;

        public NotesController(INoteService noteService)
        {
            _noteService = noteService;
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
            var result = await _noteService.AddAsync(noteDto);
            return result.ToActionResult();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] NoteDto noteDto)
        {
            if (id != noteDto.Id)
            {
                return Result<NoteDto>.Fail(BLL.Others.ResultPattern.ErrorType.Validation, "Id in URL and body do not match").ToActionResult();
            }
            var result = await _noteService.UpdateAsync(noteDto);
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
