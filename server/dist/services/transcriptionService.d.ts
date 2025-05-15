declare class TranscriptionService {
    private client;
    constructor();
    transcribeAudio(audioUrl: string): Promise<string>;
}
declare const _default: TranscriptionService;
export default _default;
