import { Config } from "../types";

export const getConfig = (): Config => {
  const mem0ApiKey = process.env.MEM0_API_KEY;
  const assemblyAiApiKey = process.env.ASSEMBLYAI_API_KEY;
  const s3Bucket = process.env.S3_BUCKET_NAME;
  const region = process.env.AWS_REGION || "ap-south-1";
  const presignedUrlExpiration = parseInt(
    process.env.PRESIGNED_URL_EXPIRATION || "3600"
  );
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const geminiModel = process.env.GEMINI_MODEL || "gemini-2.0-flash";

  if (!mem0ApiKey) {
    throw new Error("MEM0_API_KEY environment variable is not set");
  }

  if (!assemblyAiApiKey) {
    throw new Error("ASSEMBLYAI_API_KEY environment variable is not set");
  }

  if (!s3Bucket) {
    throw new Error("S3_BUCKET_NAME environment variable is not set");
  }

  if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }

  return {
    mem0ApiKey,
    assemblyAiApiKey,
    s3Bucket,
    region,
    presignedUrlExpiration,
    geminiApiKey,
    geminiModel,
  };
};
