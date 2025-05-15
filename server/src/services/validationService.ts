import { APIGatewayProxyResult } from "aws-lambda";
import {
  JournalEntryPayload,
  MediaType,
  PresignedUrlRequest,
  SearchQueryParams,
} from "shared";
import { errorResponse } from "../utils/apiResponses";

class ValidationService {
  public validateJournalPayload(
    payload: JournalEntryPayload
  ): APIGatewayProxyResult | null {
    if (!payload.type) {
      return errorResponse("Missing entry type", 400);
    }
    if (!payload.data) {
      return errorResponse("Missing data", 400);
    }
    if (!payload.metadata || !payload.metadata.timestamp || !payload.metadata.tags) {
      return errorResponse("Missing required metadata", 400);
    }
    if (!payload.userId) {
      return errorResponse("Missing userId", 400);
    }
    return null;
  }

  public validatePresignedUrlRequest(
    payload: PresignedUrlRequest
  ): APIGatewayProxyResult | null {
    if (!payload.userId) {
      return errorResponse("Missing userId", 400);
    }
    if (!this.isValidMediaType(payload.type)) {
      return errorResponse("Invalid media type", 400);
    }
    return null;
  }

  public validateSearchParams(
    payload: SearchQueryParams
  ): APIGatewayProxyResult | null {
    if (!payload.userId) {
      return errorResponse("Missing userId parameter", 400);
    }
    if (!payload.query) {
      return errorResponse("Missing query parameter", 400);
    }
    const hasInvalidType = payload.types?.some(
      (type) => !this.isValidMediaType(type)
    );
    if (hasInvalidType) {
      return errorResponse("Invalid types parameter", 400);
    }
    return null;
  }

  private isValidMediaType(type: string): boolean {
    return Object.values(MediaType).includes(type as MediaType);
  }
}

export default new ValidationService();
