import { APIGatewayProxyResult } from "aws-lambda";
import { JournalEntryPayload, PresignedUrlRequest, SearchQueryParams } from "shared";
declare class ValidationService {
    validateJournalPayload(payload: JournalEntryPayload): APIGatewayProxyResult | null;
    validatePresignedUrlRequest(payload: PresignedUrlRequest): APIGatewayProxyResult | null;
    validateSearchParams(payload: SearchQueryParams): APIGatewayProxyResult | null;
    private isValidMediaType;
}
declare const _default: ValidationService;
export default _default;
