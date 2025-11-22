import axios from "axios";
import { API_BASE_URL } from "../consts/api";
import type { ApiErrorResponse } from "../types/apiErrorResponse";
import { ApiError } from "../types/apiError";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let errorCallback: ((error: ApiError) => void) | null = null;

export const setErrorCallback = (callback: (error: ApiError) => void) => {
  errorCallback = callback;
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let apiError: ApiError;

    if (error.response?.data) {
      const errorData = error.response.data as ApiErrorResponse;
      apiError = ApiError.fromResponse(errorData);
    } else {
      apiError = new ApiError(
        500,
        error.message || "An unexpected error occurred",
        null,
        new Date().toISOString()
      );
    }

    // Call the error callback if it's set
    if (errorCallback) {
      errorCallback(apiError);
    }

    throw apiError;
  }
);