import { AssemblyAI } from "assemblyai";
import { getConfig } from "../utils/config";

class TranscriptionService {
  private client: AssemblyAI;

  public constructor() {
    this.client = new AssemblyAI({
      apiKey: getConfig().assemblyAiApiKey,
    });
  }

  public async transcribeAudio(audioUrl: string): Promise<string> {
    try {
      const transcript = await this.client.transcripts.transcribe({
        audio: audioUrl,
      });
      return transcript.text || "";
    } catch (error) {
      console.error("Error transcribing audio:", error);
      throw new Error("Failed to transcribe audio");
    }
  }
}

export default new TranscriptionService();
