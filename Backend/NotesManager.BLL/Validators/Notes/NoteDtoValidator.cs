using FluentValidation;
using NotesManager.BLL.Models.Dtos;

namespace NotesManager.BLL.Validators.Notes;

public class NoteDtoValidator : AbstractValidator<NoteDto>
{
    public NoteDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required")
            .MaximumLength(40).WithMessage("Title must be less than 40 characters");

        RuleFor(x => x.Content)
            .NotEmpty().WithMessage("Content is required")
            .MaximumLength(1000).WithMessage("Content must be less than 1000 characters");
    }
}