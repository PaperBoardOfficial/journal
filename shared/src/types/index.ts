export enum MediaType {
  IMAGE = "image",
  AUDIO = "audio",
  TEXT = "text",
}

export const CONTENT_TYPES = {
  [MediaType.IMAGE]: "image/jpeg",
  [MediaType.AUDIO]: "audio/mpeg",
  [MediaType.TEXT]: "text/plain",
};

export const FILE_EXTENSIONS = {
  [MediaType.IMAGE]: ".jpg",
  [MediaType.AUDIO]: ".mp3",
  [MediaType.TEXT]: ".txt",
};

export interface JournalMetadata {
  timestamp: string;
  tags: string[];
  mood?: string;
  location?: {
    latitude: number;
    longitude: number;
    name?: string;
  };
}

export interface JournalEntryPayload {
  type: MediaType;
  data: string; // Text content for TEXT type or S3 key for IMAGE/AUDIO types
  metadata: JournalMetadata;
  userId: string;
}

export interface SearchQueryParams {
  query: string;
  types?: MediaType[];
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  userId: string;
}

export interface PresignedUrlRequest {
  userId: string;
  type: MediaType;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  fileKey: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  memory: string;
  data: string;
  type: MediaType;
  timestamp: string;
  tags: string[];
  mood?: string;
  location?: {
    latitude: number;
    longitude: number;
    name?: string;
  };
  score: number;
}
