using Microsoft.AspNetCore.Mvc;
using NotesManager.BLL.Others.ResultPattern;
using NotesManager.API.Models;

namespace NotesManager.API.Others;

public static class ResultExtensions
{
    public static IActionResult ToActionResult<T>(this Result<T> result)
    {
        if (result.IsSuccess)
        {
            return new OkObjectResult(result.Value);
        }

        var errorResponse = new ErrorResponse
        {
            Message = result.ErrorMessage ?? "An error occurred",
            Timestamp = DateTime.UtcNow
        };

        return result.ErrorType switch
        {
            ErrorType.NotFound => CreateErrorResult(errorResponse, 404, "Not Found"),
            ErrorType.Validation => CreateErrorResult(errorResponse, 400, "Validation Error"),
            ErrorType.Conflict => CreateErrorResult(errorResponse, 409, "Conflict"),
            ErrorType.Unauthorized => CreateErrorResult(errorResponse, 401, "Unauthorized"),
            ErrorType.Forbidden => CreateErrorResult(errorResponse, 403, "Forbidden"),
            _ => CreateErrorResult(errorResponse, 500, "Internal Server Error")
        };
    }

    private static IActionResult CreateErrorResult(ErrorResponse errorResponse, int statusCode, string statusMessage)
    {
        errorResponse.StatusCode = statusCode;
        return new ObjectResult(errorResponse)
        {
            StatusCode = statusCode
        };
    }
}