using FluentValidation;
using NotesManager.BLL.Models.Dtos;

namespace NotesManager.BLL.Validators.Notes;

public class NoteDtoValidator : AbstractValidator<NoteDto>
{
    public NoteDtoValidator()
    {
        RuleFor(x => x.Title).AddTitleRules();
        RuleFor(x => x.Content).AddContentRules();
    }
}