using FluentValidation;
using NotesManager.BLL.Models.Requests;

namespace NotesManager.BLL.Validators.Notes;

public class CreateNoteRequestValidator : AbstractValidator<CreateNoteRequest>
{
    public CreateNoteRequestValidator()
    {
        RuleFor(x => x.Title).AddTitleRules();
        RuleFor(x => x.Content).AddContentRules();
    }
}