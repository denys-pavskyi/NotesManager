using Microsoft.AspNetCore.Mvc;
using NotesManager.BLL.Others.ResultPattern;

namespace NotesManager.API.Others;

public static class ResultExtensions
{
    public static IActionResult ToActionResult<T>(this Result<T> result)
    {
        if (result.IsSuccess)
        {
            return new OkObjectResult(result.Value);
        }

        return result.ErrorType switch
        {
            ErrorType.NotFound => new NotFoundObjectResult(result.ErrorMessage),
            ErrorType.Validation => new BadRequestObjectResult(result.ErrorMessage),
            ErrorType.Conflict => new ConflictObjectResult(result.ErrorMessage),
            ErrorType.Unauthorized => new UnauthorizedObjectResult(result.ErrorMessage),
            ErrorType.Forbidden => new ForbidResult(),
            _ => new ObjectResult(result.ErrorMessage)
            {
                StatusCode = StatusCodes.Status500InternalServerError
            }
        };
    }
}