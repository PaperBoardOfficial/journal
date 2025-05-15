import { Memory } from "mem0ai";
import { JournalEntryPayload, SearchQueryParams, JournalEntry } from "shared";
declare class Mem0Service {
    private client;
    private geminiApiKey;
    private geminiModel;
    private genAI;
    constructor();
    private addUserIdFilter;
    private addDateFilter;
    private addTypeFilter;
    private addTagFilter;
    searchEntries(params: SearchQueryParams): Promise<JournalEntry[]>;
    private parseSearchResults;
    private getImageDescription;
    private getImageMessage;
    private getAudioMessage;
    addJournalEntry(entry: JournalEntryPayload): Promise<Memory[]>;
}
declare const _default: Mem0Service;
export default _default;
