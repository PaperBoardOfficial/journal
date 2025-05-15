import { APIGatewayProxyResult } from "aws-lambda";
export declare const successResponse: <T>(data: T, message?: string) => APIGatewayProxyResult;
export declare const errorResponse: (error: Error | string, statusCode?: number) => APIGatewayProxyResult;
