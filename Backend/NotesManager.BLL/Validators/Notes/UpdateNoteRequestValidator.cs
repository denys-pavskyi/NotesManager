using FluentValidation;
using NotesManager.BLL.Models.Requests;

namespace NotesManager.BLL.Validators.Notes;

public class UpdateNoteRequestValidator : AbstractValidator<UpdateNoteRequest>
{
    public UpdateNoteRequestValidator()
    {
        RuleFor(x => x.Title).AddTitleRules();
        RuleFor(x => x.Content).AddContentRules();
    }
}