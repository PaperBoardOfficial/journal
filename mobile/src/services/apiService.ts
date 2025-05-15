import axios from "axios";
import {
  JournalEntry,
  SearchQueryParams,
  JournalEntryPayload,
  PresignedUrlRequest,
  PresignedUrlResponse,
} from "shared";

const API_BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/v1`;

class ApiService {
  public async searchJournals(
    params: SearchQueryParams
  ): Promise<JournalEntry[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/journal`, { params });
      return response.data.data;
    } catch (error) {
      console.error("Error searching journals:", error);
      throw error;
    }
  }

  public async createJournal(
    payload: JournalEntryPayload
  ): Promise<JournalEntry> {
    try {
      const response = await axios.post(`${API_BASE_URL}/journal`, payload);
      return response.data.data;
    } catch (error) {
      console.error("Error creating journal entry:", error);
      throw error;
    }
  }

  public async getPresignedUrl(
    payload: PresignedUrlRequest
  ): Promise<PresignedUrlResponse> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/presigned-url`,
        payload
      );
      return response.data.data;
    } catch (error) {
      console.error("Error getting presigned URL:", error);
      throw error;
    }
  }
}

export default new ApiService();
