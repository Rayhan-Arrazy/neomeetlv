import { AxiosError } from "axios";

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export function isApiError(error: unknown): error is AxiosError<ApiError> {
  return error instanceof AxiosError && error.response?.data?.message !== undefined;
}