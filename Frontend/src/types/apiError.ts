import type { ApiErrorResponse } from "./apiErrorResponse";


export class ApiError extends Error {
    statusCode: number;
    message: string;
    errors: Record<string, string[]> | null;
    timestamp: string;

    constructor(
        statusCode: number,
        message: string,
        errors: Record<string, string[]> | null = null,
        timestamp: string
    ) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.timestamp = timestamp;
    }

    static fromResponse(errorData: ApiErrorResponse): ApiError {
        return new ApiError(
            errorData.statusCode,
            errorData.message,
            errorData.errors,
            errorData.timestamp
        );
    }

    hasValidationErrors(): boolean {
        return this.errors !== null && Object.keys(this.errors).length > 0;
    }

    getValidationErrors(): string[] {
        if (!this.errors) return [];
        return Object.values(this.errors).flat();
    }
}