export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
export interface Config {
    mem0ApiKey: string;
    assemblyAiApiKey: string;
    s3Bucket: string;
    region: string;
    presignedUrlExpiration: number;
    geminiApiKey?: string;
    geminiModel?: string;
}
