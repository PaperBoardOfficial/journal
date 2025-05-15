"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (data, message) => {
    const response = {
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
exports.successResponse = successResponse;
const errorResponse = (error, statusCode = 500) => {
    const message = typeof error === "string" ? error : error.message;
    const response = {
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
exports.errorResponse = errorResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpUmVzcG9uc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2FwaVJlc3BvbnNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHTyxNQUFNLGVBQWUsR0FBRyxDQUM3QixJQUFPLEVBQ1AsT0FBZ0IsRUFDTyxFQUFFO0lBQ3pCLE1BQU0sUUFBUSxHQUFtQjtRQUMvQixPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUk7UUFDSixPQUFPO0tBQ1IsQ0FBQztJQUVGLE9BQU87UUFDTCxVQUFVLEVBQUUsR0FBRztRQUNmLE9BQU8sRUFBRTtZQUNQLGNBQWMsRUFBRSxrQkFBa0I7U0FDbkM7UUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7S0FDL0IsQ0FBQztBQUNKLENBQUMsQ0FBQztBQWpCVyxRQUFBLGVBQWUsbUJBaUIxQjtBQUVLLE1BQU0sYUFBYSxHQUFHLENBQzNCLEtBQXFCLEVBQ3JCLGFBQXFCLEdBQUcsRUFDRCxFQUFFO0lBQ3pCLE1BQU0sT0FBTyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBRWxFLE1BQU0sUUFBUSxHQUFzQjtRQUNsQyxPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSxPQUFPO0tBQ2YsQ0FBQztJQUVGLE9BQU87UUFDTCxVQUFVO1FBQ1YsT0FBTyxFQUFFO1lBQ1AsY0FBYyxFQUFFLGtCQUFrQjtTQUNuQztRQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztLQUMvQixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBbEJXLFFBQUEsYUFBYSxpQkFrQnhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5UmVzdWx0IH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcbmltcG9ydCB7IEFwaVJlc3BvbnNlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBzdWNjZXNzUmVzcG9uc2UgPSA8VD4oXG4gIGRhdGE6IFQsXG4gIG1lc3NhZ2U/OiBzdHJpbmdcbik6IEFQSUdhdGV3YXlQcm94eVJlc3VsdCA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlOiBBcGlSZXNwb25zZTxUPiA9IHtcbiAgICBzdWNjZXNzOiB0cnVlLFxuICAgIGRhdGEsXG4gICAgbWVzc2FnZSxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBlcnJvclJlc3BvbnNlID0gKFxuICBlcnJvcjogRXJyb3IgfCBzdHJpbmcsXG4gIHN0YXR1c0NvZGU6IG51bWJlciA9IDUwMFxuKTogQVBJR2F0ZXdheVByb3h5UmVzdWx0ID0+IHtcbiAgY29uc3QgbWVzc2FnZSA9IHR5cGVvZiBlcnJvciA9PT0gXCJzdHJpbmdcIiA/IGVycm9yIDogZXJyb3IubWVzc2FnZTtcblxuICBjb25zdCByZXNwb25zZTogQXBpUmVzcG9uc2U8bnVsbD4gPSB7XG4gICAgc3VjY2VzczogZmFsc2UsXG4gICAgZXJyb3I6IG1lc3NhZ2UsXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzdGF0dXNDb2RlLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpLFxuICB9O1xufTtcbiJdfQ==