using FluentValidation;

namespace NotesManager.BLL.Validators.Notes;

public static class NoteValidationRules
{
    public static void AddTitleRules<T>(this IRuleBuilderInitial<T, string> ruleBuilder)
    {
        ruleBuilder
            .NotEmpty().WithMessage("Title is required")
            .MaximumLength(40).WithMessage("Title must be less than 40 characters");
    }

    public static void AddContentRules<T>(this IRuleBuilderInitial<T, string> ruleBuilder)
    {
        ruleBuilder
            .NotEmpty().WithMessage("Content is required")
            .MaximumLength(1000).WithMessage("Content must be less than 1000 characters");
    }
}