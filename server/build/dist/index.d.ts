import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
export declare const handler: middy.MiddyfiedHandler<Omit<APIGatewayProxyEvent, "body"> & {
    body: import("type-fest").JsonValue;
} & APIGatewayProxyEvent, APIGatewayProxyResult, Error, import("aws-lambda").Context>;
