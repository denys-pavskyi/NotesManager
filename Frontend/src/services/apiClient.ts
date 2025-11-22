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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      const errorData = error.response.data as ApiErrorResponse;
      throw ApiError.fromResponse(errorData);
    }

    throw new ApiError(
      500,
      error.message || "An unexpected error occurred",
      null,
      new Date().toISOString()
    );
  }
);