import * as FileSystem from "expo-file-system";
import { MediaType, PresignedUrlRequest, CONTENT_TYPES } from "shared";
import apiService from "./apiService";
import storageService from "./storageService";

interface UploadProgressCallback {
  (progress: number): void;
}

class FileService {

  public async uploadFileToS3(
    fileUri: string,
    mediaType: MediaType,
    userId: string,
    onProgress?: UploadProgressCallback
  ): Promise<string> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        throw new Error("File doesn't exist");
      }

      const contentType = CONTENT_TYPES[mediaType];

      const presignedUrlRequest: PresignedUrlRequest = {
        userId,
        type: mediaType,
      };

      const presignedUrlResponse = await apiService.getPresignedUrl(
        presignedUrlRequest
      );

      const uploadCallback = (progress: {
        totalBytesSent: number;
        totalBytesExpectedToSend: number;
      }) => {
        const percentDone = Math.round(
          (progress.totalBytesSent / progress.totalBytesExpectedToSend) * 100
        );
        if (onProgress) {
          onProgress(percentDone);
        }
      };

      const uploadTask = FileSystem.createUploadTask(
        presignedUrlResponse.uploadUrl,
        fileUri,
        {
          httpMethod: "PUT",
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
          headers: {
            "Content-Type": contentType,
          },
          sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
        },
        uploadCallback
      );

      const uploadResult = await uploadTask.uploadAsync();

      if (!uploadResult || uploadResult.status !== 200) {
        throw new Error(
          `Upload failed with status: ${uploadResult?.status || "unknown"}`
        );
      }

      storageService.storeMediaMapping(presignedUrlResponse.fileKey, fileUri);

      return presignedUrlResponse.fileKey;
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw error;
    }
  }
}

export default new FileService();
