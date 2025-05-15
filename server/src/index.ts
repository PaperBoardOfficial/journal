import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import httpCors from "@middy/http-cors";
import httpJsonBodyParser from "@middy/http-json-body-parser";

import { errorResponse } from "./utils/apiResponses";
import journalService from "./services/journalService";

const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log("Event:", JSON.stringify(event, null, 2));

    const path = event.path;
    const method = event.httpMethod;

    if (path === "/api/v1/journal") {
      if (method === "POST") {
        return await journalService.handleJournalEntryRequest(event);
      } else if (method === "GET") {
        return await journalService.handleSearchJournalRequest(event);
      }
    } else if (path === "/api/v1/presigned-url") {
      if (method === "POST") {
        return await journalService.handlePresignedUrlRequest(event);
      }
    }

    return errorResponse(`Path not found: ${path}`, 404);
  } catch (error) {
    console.error("Unhandled error:", error);
    return errorResponse("Internal server error", 500);
  }
};

export const handler = middy(lambdaHandler)
  .use(httpJsonBodyParser())
  .use(
    httpCors({
      origin: "*",
      headers:
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      methods: "GET,POST,PUT,DELETE,OPTIONS",
      credentials: true,
    })
  );
