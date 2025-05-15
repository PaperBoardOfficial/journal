import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
declare class JournalService {
    handleJournalEntryRequest(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>;
    handlePresignedUrlRequest(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>;
    handleSearchJournalRequest(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>;
    private parseSearchParams;
}
declare const _default: JournalService;
export default _default;
