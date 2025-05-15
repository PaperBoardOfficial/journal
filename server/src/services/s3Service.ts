import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { getConfig } from "../utils/config";
import {
  MediaType,
  PresignedUrlRequest,
  PresignedUrlResponse,
  CONTENT_TYPES,
  FILE_EXTENSIONS,
} from "shared";
import { Readable } from "stream";

class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    const { region, s3Bucket } = getConfig();
    this.s3Client = new S3Client({ region });
    this.bucketName = s3Bucket;
  }

  public async getPresignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return await getSignedUrl(this.s3Client, command, {
      expiresIn: getConfig().presignedUrlExpiration,
    });
  }

  public async generatePresignedUploadUrl(
    request: PresignedUrlRequest
  ): Promise<PresignedUrlResponse> {
    if (request.type === MediaType.TEXT) {
      throw new Error("Presigned URLs are not needed for text entries");
    }

    if (!CONTENT_TYPES[request.type] || !FILE_EXTENSIONS[request.type]) {
      throw new Error(`Unsupported media type: ${request.type}`);
    }

    const filePrefix = `journal/upload/${request.userId}/${uuidv4()}`;
    const key = `${filePrefix}${FILE_EXTENSIONS[request.type]}`;
    const contentType = CONTENT_TYPES[request.type];

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: getConfig().presignedUrlExpiration,
    });

    return {
      uploadUrl,
      fileKey: key,
    };
  }

  public async getObjectBuffer(objectKey: string): Promise<Buffer> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: objectKey,
      });

      const response = await this.s3Client.send(command);

      if (!response.Body) {
        throw new Error("Empty response body from S3");
      }
      
      const stream = response.Body as unknown as Readable;
      return await new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on("data", (chunk: Buffer) => chunks.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", reject);
      });
    } catch (error) {
      console.error("Error retrieving object from S3:", error);
      throw error;
    }
  }
}

export default new S3Service();
