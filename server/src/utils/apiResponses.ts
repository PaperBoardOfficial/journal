import { APIGatewayProxyResult } from "aws-lambda";
import { ApiResponse } from "../types";

export const successResponse = <T>(
  data: T,
  message?: string
): APIGatewayProxyResult => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};

export const errorResponse = (
  error: Error | string,
  statusCode: number = 500
): APIGatewayProxyResult => {
  const message = typeof error === "string" ? error : error.message;

  const response: ApiResponse<null> = {
    success: false,
    error: message,
  };

  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};
