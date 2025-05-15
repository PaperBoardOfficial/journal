export declare enum MediaType {
    IMAGE = "image",
    AUDIO = "audio",
    TEXT = "text"
}
export declare const CONTENT_TYPES: {
    image: string;
    audio: string;
    text: string;
};
export declare const FILE_EXTENSIONS: {
    image: string;
    audio: string;
    text: string;
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
    data: string;
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
