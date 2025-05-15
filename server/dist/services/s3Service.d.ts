import { PresignedUrlRequest, PresignedUrlResponse } from "shared";
declare class S3Service {
    private s3Client;
    private bucketName;
    constructor();
    getPresignedUrl(key: string): Promise<string>;
    generatePresignedUploadUrl(request: PresignedUrlRequest): Promise<PresignedUrlResponse>;
    getObjectBuffer(objectKey: string): Promise<Buffer>;
}
declare const _default: S3Service;
export default _default;
