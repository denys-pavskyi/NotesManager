namespace NotesManager.BLL.Others.ResultPattern;

public class Result<T>
{
    public bool IsSuccess { get; private set; }
    public T? Value { get; private set; }
    public ErrorType? ErrorType { get; private set; }
    public string? ErrorMessage { get; private set; }

    private Result() { }

    public static Result<T> Ok(T? value)
    {
        return new Result<T>
        {
            IsSuccess = true,
            Value = value
        };
    }

    public static Result<T> Fail(ErrorType errorType, string errorMessage)
    {
        return new Result<T>
        {
            IsSuccess = false,
            ErrorType = errorType,
            ErrorMessage = errorMessage
        };
    }
}