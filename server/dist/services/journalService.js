"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mem0Service_1 = __importDefault(require("./mem0Service"));
const s3Service_1 = __importDefault(require("./s3Service"));
const validationService_1 = __importDefault(require("./validationService"));
const apiResponses_1 = require("../utils/apiResponses");
class JournalService {
    async handleJournalEntryRequest(event) {
        try {
            const payload = event.body;
            const validationError = validationService_1.default.validateJournalPayload(payload);
            if (validationError) {
                return validationError;
            }
            const result = await mem0Service_1.default.addJournalEntry(payload);
            return (0, apiResponses_1.successResponse)(result, "Journal entry added successfully");
        }
        catch (error) {
            console.error("Error adding journal entry:", error);
            return (0, apiResponses_1.errorResponse)(error, 500);
        }
    }
    async handlePresignedUrlRequest(event) {
        try {
            const payload = event.body;
            const validationError = validationService_1.default.validatePresignedUrlRequest(payload);
            if (validationError) {
                return validationError;
            }
            const presignedUrlResponse = await s3Service_1.default.generatePresignedUploadUrl(payload);
            return (0, apiResponses_1.successResponse)(presignedUrlResponse, "Presigned URL generated successfully");
        }
        catch (error) {
            console.error("Error generating presigned URL:", error);
            return (0, apiResponses_1.errorResponse)(error, 500);
        }
    }
    async handleSearchJournalRequest(event) {
        try {
            const payload = this.parseSearchParams(event.queryStringParameters || {});
            const validationError = validationService_1.default.validateSearchParams(payload);
            if (validationError) {
                return validationError;
            }
            const result = await mem0Service_1.default.searchEntries(payload);
            return (0, apiResponses_1.successResponse)(result, "Journal entries retrieved successfully");
        }
        catch (error) {
            console.error("Error searching journal entries:", error);
            return (0, apiResponses_1.errorResponse)(error, 500);
        }
    }
    parseSearchParams(queryParams) {
        const searchParams = {
            userId: queryParams.userId || "",
            query: queryParams.query || "",
            dateFrom: queryParams.dateFrom || "",
            dateTo: queryParams.dateTo || "",
        };
        if (queryParams.tags) {
            searchParams.tags = queryParams.tags.split(",");
        }
        if (queryParams.types) {
            searchParams.types = queryParams.types.split(",");
        }
        return searchParams;
    }
}
exports.default = new JournalService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam91cm5hbFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvam91cm5hbFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFNQSxnRUFBd0M7QUFDeEMsNERBQW9DO0FBQ3BDLDRFQUFvRDtBQU1wRCx3REFBdUU7QUFFdkUsTUFBTSxjQUFjO0lBQ1gsS0FBSyxDQUFDLHlCQUF5QixDQUNwQyxLQUEyQjtRQUUzQixJQUFJLENBQUM7WUFDSCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBc0MsQ0FBQztZQUM3RCxNQUFNLGVBQWUsR0FBRywyQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRSxJQUFJLGVBQWUsRUFBRSxDQUFDO2dCQUNwQixPQUFPLGVBQWUsQ0FBQztZQUN6QixDQUFDO1lBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxxQkFBVyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxPQUFPLElBQUEsOEJBQWUsRUFBQyxNQUFNLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEQsT0FBTyxJQUFBLDRCQUFhLEVBQUMsS0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLHlCQUF5QixDQUNwQyxLQUEyQjtRQUUzQixJQUFJLENBQUM7WUFDSCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBc0MsQ0FBQztZQUM3RCxNQUFNLGVBQWUsR0FDbkIsMkJBQWlCLENBQUMsMkJBQTJCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekQsSUFBSSxlQUFlLEVBQUUsQ0FBQztnQkFDcEIsT0FBTyxlQUFlLENBQUM7WUFDekIsQ0FBQztZQUNELE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxtQkFBUyxDQUFDLDBCQUEwQixDQUNyRSxPQUFPLENBQ1IsQ0FBQztZQUNGLE9BQU8sSUFBQSw4QkFBZSxFQUNwQixvQkFBb0IsRUFDcEIsc0NBQXNDLENBQ3ZDLENBQUM7UUFDSixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEQsT0FBTyxJQUFBLDRCQUFhLEVBQUMsS0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLDBCQUEwQixDQUNyQyxLQUEyQjtRQUUzQixJQUFJLENBQUM7WUFDSCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLHFCQUFxQixJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sZUFBZSxHQUFHLDJCQUFpQixDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hFLElBQUksZUFBZSxFQUFFLENBQUM7Z0JBQ3BCLE9BQU8sZUFBZSxDQUFDO1lBQ3pCLENBQUM7WUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLHFCQUFXLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hELE9BQU8sSUFBQSw4QkFBZSxFQUFDLE1BQU0sRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN6RCxPQUFPLElBQUEsNEJBQWEsRUFBQyxLQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDNUMsQ0FBQztJQUNILENBQUM7SUFFTyxpQkFBaUIsQ0FDdkIsV0FBc0Q7UUFFdEQsTUFBTSxZQUFZLEdBQXNCO1lBQ3RDLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTSxJQUFJLEVBQUU7WUFDaEMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUM5QixRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVEsSUFBSSxFQUFFO1lBQ3BDLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTSxJQUFJLEVBQUU7U0FDakMsQ0FBQztRQUNGLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLFlBQVksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNELElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RCLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFnQixDQUFDO1FBQ25FLENBQUM7UUFDRCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0NBQ0Y7QUFDRCxrQkFBZSxJQUFJLGNBQWMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSm91cm5hbEVudHJ5UGF5bG9hZCxcbiAgTWVkaWFUeXBlLFxuICBTZWFyY2hRdWVyeVBhcmFtcyxcbiAgUHJlc2lnbmVkVXJsUmVxdWVzdCxcbn0gZnJvbSBcInNoYXJlZFwiO1xuaW1wb3J0IG1lbTBTZXJ2aWNlIGZyb20gXCIuL21lbTBTZXJ2aWNlXCI7XG5pbXBvcnQgczNTZXJ2aWNlIGZyb20gXCIuL3MzU2VydmljZVwiO1xuaW1wb3J0IHZhbGlkYXRpb25TZXJ2aWNlIGZyb20gXCIuL3ZhbGlkYXRpb25TZXJ2aWNlXCI7XG5pbXBvcnQge1xuICBBUElHYXRld2F5UHJveHlFdmVudCxcbiAgQVBJR2F0ZXdheVByb3h5RXZlbnRRdWVyeVN0cmluZ1BhcmFtZXRlcnMsXG4gIEFQSUdhdGV3YXlQcm94eVJlc3VsdCxcbn0gZnJvbSBcImF3cy1sYW1iZGFcIjtcbmltcG9ydCB7IGVycm9yUmVzcG9uc2UsIHN1Y2Nlc3NSZXNwb25zZSB9IGZyb20gXCIuLi91dGlscy9hcGlSZXNwb25zZXNcIjtcblxuY2xhc3MgSm91cm5hbFNlcnZpY2Uge1xuICBwdWJsaWMgYXN5bmMgaGFuZGxlSm91cm5hbEVudHJ5UmVxdWVzdChcbiAgICBldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnRcbiAgKTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHQ+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGF5bG9hZCA9IGV2ZW50LmJvZHkgYXMgdW5rbm93biBhcyBKb3VybmFsRW50cnlQYXlsb2FkO1xuICAgICAgY29uc3QgdmFsaWRhdGlvbkVycm9yID0gdmFsaWRhdGlvblNlcnZpY2UudmFsaWRhdGVKb3VybmFsUGF5bG9hZChwYXlsb2FkKTtcbiAgICAgIGlmICh2YWxpZGF0aW9uRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25FcnJvcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1lbTBTZXJ2aWNlLmFkZEpvdXJuYWxFbnRyeShwYXlsb2FkKTtcbiAgICAgIHJldHVybiBzdWNjZXNzUmVzcG9uc2UocmVzdWx0LCBcIkpvdXJuYWwgZW50cnkgYWRkZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWRkaW5nIGpvdXJuYWwgZW50cnk6XCIsIGVycm9yKTtcbiAgICAgIHJldHVybiBlcnJvclJlc3BvbnNlKGVycm9yIGFzIEVycm9yLCA1MDApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBoYW5kbGVQcmVzaWduZWRVcmxSZXF1ZXN0KFxuICAgIGV2ZW50OiBBUElHYXRld2F5UHJveHlFdmVudFxuICApOiBQcm9taXNlPEFQSUdhdGV3YXlQcm94eVJlc3VsdD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXlsb2FkID0gZXZlbnQuYm9keSBhcyB1bmtub3duIGFzIFByZXNpZ25lZFVybFJlcXVlc3Q7XG4gICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3IgPVxuICAgICAgICB2YWxpZGF0aW9uU2VydmljZS52YWxpZGF0ZVByZXNpZ25lZFVybFJlcXVlc3QocGF5bG9hZCk7XG4gICAgICBpZiAodmFsaWRhdGlvbkVycm9yKSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9uRXJyb3I7XG4gICAgICB9XG4gICAgICBjb25zdCBwcmVzaWduZWRVcmxSZXNwb25zZSA9IGF3YWl0IHMzU2VydmljZS5nZW5lcmF0ZVByZXNpZ25lZFVwbG9hZFVybChcbiAgICAgICAgcGF5bG9hZFxuICAgICAgKTtcbiAgICAgIHJldHVybiBzdWNjZXNzUmVzcG9uc2UoXG4gICAgICAgIHByZXNpZ25lZFVybFJlc3BvbnNlLFxuICAgICAgICBcIlByZXNpZ25lZCBVUkwgZ2VuZXJhdGVkIHN1Y2Nlc3NmdWxseVwiXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZ2VuZXJhdGluZyBwcmVzaWduZWQgVVJMOlwiLCBlcnJvcik7XG4gICAgICByZXR1cm4gZXJyb3JSZXNwb25zZShlcnJvciBhcyBFcnJvciwgNTAwKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgaGFuZGxlU2VhcmNoSm91cm5hbFJlcXVlc3QoXG4gICAgZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50XG4gICk6IFByb21pc2U8QVBJR2F0ZXdheVByb3h5UmVzdWx0PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLnBhcnNlU2VhcmNoUGFyYW1zKGV2ZW50LnF1ZXJ5U3RyaW5nUGFyYW1ldGVycyB8fCB7fSk7XG4gICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3IgPSB2YWxpZGF0aW9uU2VydmljZS52YWxpZGF0ZVNlYXJjaFBhcmFtcyhwYXlsb2FkKTtcbiAgICAgIGlmICh2YWxpZGF0aW9uRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25FcnJvcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1lbTBTZXJ2aWNlLnNlYXJjaEVudHJpZXMocGF5bG9hZCk7XG4gICAgICByZXR1cm4gc3VjY2Vzc1Jlc3BvbnNlKHJlc3VsdCwgXCJKb3VybmFsIGVudHJpZXMgcmV0cmlldmVkIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlYXJjaGluZyBqb3VybmFsIGVudHJpZXM6XCIsIGVycm9yKTtcbiAgICAgIHJldHVybiBlcnJvclJlc3BvbnNlKGVycm9yIGFzIEVycm9yLCA1MDApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VTZWFyY2hQYXJhbXMoXG4gICAgcXVlcnlQYXJhbXM6IEFQSUdhdGV3YXlQcm94eUV2ZW50UXVlcnlTdHJpbmdQYXJhbWV0ZXJzXG4gICk6IFNlYXJjaFF1ZXJ5UGFyYW1zIHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXM6IFNlYXJjaFF1ZXJ5UGFyYW1zID0ge1xuICAgICAgdXNlcklkOiBxdWVyeVBhcmFtcy51c2VySWQgfHwgXCJcIixcbiAgICAgIHF1ZXJ5OiBxdWVyeVBhcmFtcy5xdWVyeSB8fCBcIlwiLFxuICAgICAgZGF0ZUZyb206IHF1ZXJ5UGFyYW1zLmRhdGVGcm9tIHx8IFwiXCIsXG4gICAgICBkYXRlVG86IHF1ZXJ5UGFyYW1zLmRhdGVUbyB8fCBcIlwiLFxuICAgIH07XG4gICAgaWYgKHF1ZXJ5UGFyYW1zLnRhZ3MpIHtcbiAgICAgIHNlYXJjaFBhcmFtcy50YWdzID0gcXVlcnlQYXJhbXMudGFncy5zcGxpdChcIixcIik7XG4gICAgfVxuICAgIGlmIChxdWVyeVBhcmFtcy50eXBlcykge1xuICAgICAgc2VhcmNoUGFyYW1zLnR5cGVzID0gcXVlcnlQYXJhbXMudHlwZXMuc3BsaXQoXCIsXCIpIGFzIE1lZGlhVHlwZVtdO1xuICAgIH1cbiAgICByZXR1cm4gc2VhcmNoUGFyYW1zO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgSm91cm5hbFNlcnZpY2UoKTtcbiJdfQ==