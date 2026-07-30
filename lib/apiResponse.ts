import { NextResponse } from "next/server";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  count?: number;
}

/**
 * Returns a standardized HTTP 2xx Success JSON Response.
 */
export function successResponse<T>(
  data: T,
  message = "Operation successful",
  status = 200,
  extraProps: Record<string, any> = {},
) {
  const body: ApiResponse<T> = {
    success: true,
    message,
    data,
    ...extraProps,
  };
  return NextResponse.json(body, { status });
}

/**
 * Returns a standardized HTTP 4xx/5xx Error JSON Response.
 */
export function errorResponse(
  error: string | Error,
  status = 400,
  message = "An error occurred",
) {
  const errorMessage = typeof error === "string" ? error : error.message;
  const body: ApiResponse = {
    success: false,
    message,
    error: errorMessage,
  };
  return NextResponse.json(body, { status });
}

/**
 * Returns a standardized HTTP 401 Unauthorized Response.
 */
export function unauthorizedResponse(
  message = "Unauthorized access. Please login.",
) {
  return errorResponse(message, 401, "Authentication Required");
}
