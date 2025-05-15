import { MMKV } from "react-native-mmkv";

class StorageService {
  private storage: MMKV;
  private static readonly TAGS_KEY = "journal-tags";
  private static readonly MEDIA_MAPPING_KEY = "media-mapping"; // Key for S3 key to local path mapping

  constructor() {
    this.storage = new MMKV({
      id: "journal-app-storage",
    });
  }

  public getAvailableTags(): string[] {
    const tagsJson = this.storage.getString(StorageService.TAGS_KEY);
    return tagsJson ? JSON.parse(tagsJson) : [];
  }

  public setAvailableTags(tags: string[]): void {
    this.storage.set(StorageService.TAGS_KEY, JSON.stringify(tags));
  }

  public addTag(tag: string): void {
    const tags = this.getAvailableTags();
    if (!tags.includes(tag)) {
      tags.push(tag);
      this.setAvailableTags(tags);
    }
  }

  public removeTag(tag: string): void {
    const tags = this.getAvailableTags();
    this.setAvailableTags(tags.filter((t) => t !== tag));
  }

  public getMediaMappings(): Record<string, string> {
    const mappingJson = this.storage.getString(
      StorageService.MEDIA_MAPPING_KEY
    );
    return mappingJson ? JSON.parse(mappingJson) : {};
  }

  public storeMediaMapping(s3Key: string, localPath: string): void {
    const mappings = this.getMediaMappings();
    mappings[s3Key] = localPath;
    this.storage.set(
      StorageService.MEDIA_MAPPING_KEY,
      JSON.stringify(mappings)
    );
  }

  public getLocalPathForS3Key(s3Key: string): string | null {
    const mappings = this.getMediaMappings();
    return mappings[s3Key] || null;
  }

  public removeMediaMapping(s3Key: string): void {
    const mappings = this.getMediaMappings();
    if (mappings[s3Key]) {
      delete mappings[s3Key];
      this.storage.set(
        StorageService.MEDIA_MAPPING_KEY,
        JSON.stringify(mappings)
      );
    }
  }
}

export default new StorageService();
