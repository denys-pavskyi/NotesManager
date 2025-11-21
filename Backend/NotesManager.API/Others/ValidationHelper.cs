using FluentValidation;
using FluentValidation.Results;
using NotesManager.BLL.Others.ResultPattern;
using NotesManager.API.Models;

namespace NotesManager.API.Others;

public static class ValidationHelper
{
    public static async Task<ErrorResponse?> ValidateAsync<T>(this T obj, IValidator<T> validator)
    {
        var validationResult = await validator.ValidateAsync(obj);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors
      .GroupBy(e => e.PropertyName)
       .ToDictionary(
     g => g.Key,
            g => g.Select(e => e.ErrorMessage).ToList()
    );

          return new ErrorResponse
    {
       StatusCode = 400,
       Message = "Validation failed",
  Errors = errors
       };
        }

        return null;
    }
}
