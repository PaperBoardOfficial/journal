import {
  JournalEntryPayload,
  MediaType,
  SearchQueryParams,
  PresignedUrlRequest,
} from "shared";
import mem0Service from "./mem0Service";
import s3Service from "./s3Service";
import validationService from "./validationService";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventQueryStringParameters,
  APIGatewayProxyResult,
} from "aws-lambda";
import { errorResponse, successResponse } from "../utils/apiResponses";

class JournalService {
  public async handleJournalEntryRequest(
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> {
    try {
      const payload = event.body as unknown as JournalEntryPayload;
      const validationError = validationService.validateJournalPayload(payload);
      if (validationError) {
        return validationError;
      }
      const result = await mem0Service.addJournalEntry(payload);
      return successResponse(result, "Journal entry added successfully");
    } catch (error) {
      console.error("Error adding journal entry:", error);
      return errorResponse(error as Error, 500);
    }
  }

  public async handlePresignedUrlRequest(
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> {
    try {
      const payload = event.body as unknown as PresignedUrlRequest;
      const validationError =
        validationService.validatePresignedUrlRequest(payload);
      if (validationError) {
        return validationError;
      }
      const presignedUrlResponse = await s3Service.generatePresignedUploadUrl(
        payload
      );
      return successResponse(
        presignedUrlResponse,
        "Presigned URL generated successfully"
      );
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      return errorResponse(error as Error, 500);
    }
  }

  public async handleSearchJournalRequest(
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> {
    try {
      const payload = this.parseSearchParams(event.queryStringParameters || {});
      const validationError = validationService.validateSearchParams(payload);
      if (validationError) {
        return validationError;
      }
      const result = await mem0Service.searchEntries(payload);
      return successResponse(result, "Journal entries retrieved successfully");
    } catch (error) {
      console.error("Error searching journal entries:", error);
      return errorResponse(error as Error, 500);
    }
  }

  private parseSearchParams(
    queryParams: APIGatewayProxyEventQueryStringParameters
  ): SearchQueryParams {
    const searchParams: SearchQueryParams = {
      userId: queryParams.userId || "",
      query: queryParams.query || "",
      dateFrom: queryParams.dateFrom || "",
      dateTo: queryParams.dateTo || "",
    };
    if (queryParams.tags) {
      searchParams.tags = queryParams.tags.split(",");
    }
    if (queryParams.types) {
      searchParams.types = queryParams.types.split(",") as MediaType[];
    }
    return searchParams;
  }
}
export default new JournalService();
