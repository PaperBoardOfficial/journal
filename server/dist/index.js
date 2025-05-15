"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = __importDefault(require("@middy/core"));
const http_cors_1 = __importDefault(require("@middy/http-cors"));
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const apiResponses_1 = require("./utils/apiResponses");
const journalService_1 = __importDefault(require("./services/journalService"));
const lambdaHandler = async (event) => {
    try {
        console.log("Event:", JSON.stringify(event, null, 2));
        const path = event.path;
        const method = event.httpMethod;
        if (path === "/api/v1/journal") {
            if (method === "POST") {
                return await journalService_1.default.handleJournalEntryRequest(event);
            }
            else if (method === "GET") {
                return await journalService_1.default.handleSearchJournalRequest(event);
            }
        }
        else if (path === "/api/v1/presigned-url") {
            if (method === "POST") {
                return await journalService_1.default.handlePresignedUrlRequest(event);
            }
        }
        return (0, apiResponses_1.errorResponse)(`Path not found: ${path}`, 404);
    }
    catch (error) {
        console.error("Unhandled error:", error);
        return (0, apiResponses_1.errorResponse)("Internal server error", 500);
    }
};
exports.handler = (0, core_1.default)(lambdaHandler)
    .use((0, http_json_body_parser_1.default)())
    .use((0, http_cors_1.default)({
    origin: "*",
    headers: "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsdURBQWdDO0FBQ2hDLGlFQUF3QztBQUN4Qyx5RkFBOEQ7QUFFOUQsdURBQXFEO0FBQ3JELCtFQUF1RDtBQUV2RCxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ3pCLEtBQTJCLEVBQ0ssRUFBRTtJQUNsQyxJQUFJLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0RCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFFaEMsSUFBSSxJQUFJLEtBQUssaUJBQWlCLEVBQUUsQ0FBQztZQUMvQixJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUUsQ0FBQztnQkFDdEIsT0FBTyxNQUFNLHdCQUFjLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0QsQ0FBQztpQkFBTSxJQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUUsQ0FBQztnQkFDNUIsT0FBTyxNQUFNLHdCQUFjLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEUsQ0FBQztRQUNILENBQUM7YUFBTSxJQUFJLElBQUksS0FBSyx1QkFBdUIsRUFBRSxDQUFDO1lBQzVDLElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRSxDQUFDO2dCQUN0QixPQUFPLE1BQU0sd0JBQWMsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvRCxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sSUFBQSw0QkFBYSxFQUFDLG1CQUFtQixJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFBLDRCQUFhLEVBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckQsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVXLFFBQUEsT0FBTyxHQUFHLElBQUEsY0FBSyxFQUFDLGFBQWEsQ0FBQztLQUN4QyxHQUFHLENBQUMsSUFBQSwrQkFBa0IsR0FBRSxDQUFDO0tBQ3pCLEdBQUcsQ0FDRixJQUFBLG1CQUFRLEVBQUM7SUFDUCxNQUFNLEVBQUUsR0FBRztJQUNYLE9BQU8sRUFDTCxzRUFBc0U7SUFDeEUsT0FBTyxFQUFFLDZCQUE2QjtJQUN0QyxXQUFXLEVBQUUsSUFBSTtDQUNsQixDQUFDLENBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQSUdhdGV3YXlQcm94eUV2ZW50LCBBUElHYXRld2F5UHJveHlSZXN1bHQgfSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xuaW1wb3J0IG1pZGR5IGZyb20gXCJAbWlkZHkvY29yZVwiO1xuaW1wb3J0IGh0dHBDb3JzIGZyb20gXCJAbWlkZHkvaHR0cC1jb3JzXCI7XG5pbXBvcnQgaHR0cEpzb25Cb2R5UGFyc2VyIGZyb20gXCJAbWlkZHkvaHR0cC1qc29uLWJvZHktcGFyc2VyXCI7XG5cbmltcG9ydCB7IGVycm9yUmVzcG9uc2UgfSBmcm9tIFwiLi91dGlscy9hcGlSZXNwb25zZXNcIjtcbmltcG9ydCBqb3VybmFsU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlcy9qb3VybmFsU2VydmljZVwiO1xuXG5jb25zdCBsYW1iZGFIYW5kbGVyID0gYXN5bmMgKFxuICBldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnRcbik6IFByb21pc2U8QVBJR2F0ZXdheVByb3h5UmVzdWx0PiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2coXCJFdmVudDpcIiwgSlNPTi5zdHJpbmdpZnkoZXZlbnQsIG51bGwsIDIpKTtcblxuICAgIGNvbnN0IHBhdGggPSBldmVudC5wYXRoO1xuICAgIGNvbnN0IG1ldGhvZCA9IGV2ZW50Lmh0dHBNZXRob2Q7XG5cbiAgICBpZiAocGF0aCA9PT0gXCIvYXBpL3YxL2pvdXJuYWxcIikge1xuICAgICAgaWYgKG1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGpvdXJuYWxTZXJ2aWNlLmhhbmRsZUpvdXJuYWxFbnRyeVJlcXVlc3QoZXZlbnQpO1xuICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGpvdXJuYWxTZXJ2aWNlLmhhbmRsZVNlYXJjaEpvdXJuYWxSZXF1ZXN0KGV2ZW50KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBhdGggPT09IFwiL2FwaS92MS9wcmVzaWduZWQtdXJsXCIpIHtcbiAgICAgIGlmIChtZXRob2QgPT09IFwiUE9TVFwiKSB7XG4gICAgICAgIHJldHVybiBhd2FpdCBqb3VybmFsU2VydmljZS5oYW5kbGVQcmVzaWduZWRVcmxSZXF1ZXN0KGV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZXJyb3JSZXNwb25zZShgUGF0aCBub3QgZm91bmQ6ICR7cGF0aH1gLCA0MDQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJVbmhhbmRsZWQgZXJyb3I6XCIsIGVycm9yKTtcbiAgICByZXR1cm4gZXJyb3JSZXNwb25zZShcIkludGVybmFsIHNlcnZlciBlcnJvclwiLCA1MDApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IG1pZGR5KGxhbWJkYUhhbmRsZXIpXG4gIC51c2UoaHR0cEpzb25Cb2R5UGFyc2VyKCkpXG4gIC51c2UoXG4gICAgaHR0cENvcnMoe1xuICAgICAgb3JpZ2luOiBcIipcIixcbiAgICAgIGhlYWRlcnM6XG4gICAgICAgIFwiQ29udGVudC1UeXBlLFgtQW16LURhdGUsQXV0aG9yaXphdGlvbixYLUFwaS1LZXksWC1BbXotU2VjdXJpdHktVG9rZW5cIixcbiAgICAgIG1ldGhvZHM6IFwiR0VULFBPU1QsUFVULERFTEVURSxPUFRJT05TXCIsXG4gICAgICBjcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9KVxuICApO1xuIl19