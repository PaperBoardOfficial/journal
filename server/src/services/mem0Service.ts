import { Memory, MemoryClient, SearchOptions } from "mem0ai";
import {
  JournalEntryPayload,
  MediaType,
  SearchQueryParams,
  JournalEntry,
} from "shared";
import { getConfig } from "../utils/config";
import s3Service from "./s3Service";
import transcriptionService from "./transcriptionService";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

class Mem0Service {
  private client: MemoryClient;
  private geminiApiKey: string | undefined;
  private geminiModel: string | undefined;
  private genAI: any = null;

  constructor() {
    const config = getConfig();
    this.client = new MemoryClient({
      apiKey: config.mem0ApiKey,
    });
    this.geminiApiKey = config.geminiApiKey;
    this.geminiModel = config.geminiModel;
    this.genAI = new GoogleGenAI({ apiKey: this.geminiApiKey });
  }

  private addUserIdFilter(
    filters: Record<string, any>,
    params: SearchQueryParams
  ) {
    filters.AND.push({ user_id: params.userId });
  }

  private addDateFilter(
    filters: Record<string, any>,
    params: SearchQueryParams
  ) {
    if (params.dateFrom || params.dateTo) {
      const dateFilter: any = {};
      if (params.dateFrom) {
        dateFilter.gte = params.dateFrom;
      }
      if (params.dateTo) {
        dateFilter.lte = params.dateTo;
      }
      filters.AND.push({ created_at: dateFilter });
    }
  }

  private addTypeFilter(
    filters: Record<string, any>,
    params: SearchQueryParams
  ) {
    if (params.types && params.types.length > 0) {
      const typeFilters = params.types.map((type) => ({
        metadata: { type },
      }));

      filters.AND.push({
        OR: typeFilters,
      });
    }
  }
  private addTagFilter(
    filters: Record<string, any>,
    params: SearchQueryParams
  ) {
    if (params.tags && params.tags.length > 0) {
      filters.AND.push({
        metadata: {
          tags: params.tags,
        },
      });
    }
  }
  public async searchEntries(
    params: SearchQueryParams
  ): Promise<JournalEntry[]> {
    console.log("params", JSON.stringify(params, null, 2));
    const filters: Record<string, any> = {
      AND: [],
    };
    this.addUserIdFilter(filters, params);
    this.addDateFilter(filters, params);
    this.addTypeFilter(filters, params);
    this.addTagFilter(filters, params);
    console.log("filters", JSON.stringify(filters, null, 2));
    const searchOptions: SearchOptions = {
      user_id: params.userId,
      filters,
      api_version: "v2",
    };

    const searchResults = await this.client.search(params.query, searchOptions);
    console.log("searchResults", JSON.stringify(searchResults, null, 2));
    return this.parseSearchResults(searchResults);
  }

  private parseSearchResults(searchResults: Memory[]): JournalEntry[] {
    return searchResults.map((result) => ({
      id: result.id,
      userId: result.user_id ?? "",
      memory: result.memory ?? "",
      timestamp: result.metadata.timestamp ?? {},
      tags: result.metadata.tags ?? [],
      mood: result.metadata.mood ?? "",
      location: result.metadata.location ?? {},
      data: result.metadata.data ?? "",
      score: result.score ?? 0,
      type: result.metadata.type ?? MediaType.TEXT,
    }));
  }

  private async getImageDescription(s3ObjectKey: string): Promise<string> {
    try {
      const imageData = await s3Service.getObjectBuffer(s3ObjectKey);
      const originalFilename =
        s3ObjectKey.split("/").pop() || "journal-image.jpg";
      const imageFile = new File([imageData], originalFilename, {
        type: "image/jpeg",
      });

      const uploadedGeminiFile = await this.genAI.files.upload({
        file: imageFile,
        config: { mimeType: "image/jpeg" },
      });

      const promptText = process.env.IMAGE_DESCRIPTION_PROMPT ||
        "Please describe what's in this image in 1-2 simple sentences. Focus only on the main subject/activity.";

      const result = await this.genAI.models.generateContent({
        model: this.geminiModel,
        contents: createUserContent([
          createPartFromUri(
            uploadedGeminiFile.uri,
            uploadedGeminiFile.mimeType
          ),
          promptText,
        ]),
      });

      return result.text;
    } catch (error) {
      console.error("Error generating image description:", error);
      throw new Error("Error generating image description");
    }
  }

  private async getImageMessage(data: string): Promise<string> {
    const imageDescription = await this.getImageDescription(data);
    return imageDescription;
  }

  private async getAudioMessage(data: string): Promise<string> {
    const audioUrl = await s3Service.getPresignedUrl(data);
    const transcription = await transcriptionService.transcribeAudio(audioUrl);
    return transcription;
  }
  public async addJournalEntry(entry: JournalEntryPayload): Promise<Memory[]> {
    let message: string;
    switch (entry.type) {
      case MediaType.TEXT:
        message = entry.data;
        break;
      case MediaType.IMAGE:
        message = await this.getImageMessage(entry.data);
        break;
      case MediaType.AUDIO:
        message = await this.getAudioMessage(entry.data);
        break;
      default:
        throw new Error(`Unsupported media type: ${entry.type}`);
    }
    const result = await this.client.add(message, {
      user_id: entry.userId,
      metadata: {
        ...entry.metadata,
        data: entry.data,
        type: entry.type,
      },
      api_version: "v2",
      infer: false,
    });
    console.log("result", JSON.stringify(result, null, 2));
    return result;
  }
}

export default new Mem0Service();
