"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assemblyai_1 = require("assemblyai");
const config_1 = require("../utils/config");
class TranscriptionService {
    constructor() {
        this.client = new assemblyai_1.AssemblyAI({
            apiKey: (0, config_1.getConfig)().assemblyAiApiKey,
        });
    }
    async transcribeAudio(audioUrl) {
        try {
            const transcript = await this.client.transcripts.transcribe({
                audio: audioUrl,
            });
            return transcript.text || "";
        }
        catch (error) {
            console.error("Error transcribing audio:", error);
            throw new Error("Failed to transcribe audio");
        }
    }
}
exports.default = new TranscriptionService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNjcmlwdGlvblNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvdHJhbnNjcmlwdGlvblNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBd0M7QUFDeEMsNENBQTRDO0FBRTVDLE1BQU0sb0JBQW9CO0lBR3hCO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHVCQUFVLENBQUM7WUFDM0IsTUFBTSxFQUFFLElBQUEsa0JBQVMsR0FBRSxDQUFDLGdCQUFnQjtTQUNyQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxRQUFnQjtRQUMzQyxJQUFJLENBQUM7WUFDSCxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztnQkFDMUQsS0FBSyxFQUFFLFFBQVE7YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxVQUFVLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMvQixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEQsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ2hELENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLG9CQUFvQixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3NlbWJseUFJIH0gZnJvbSBcImFzc2VtYmx5YWlcIjtcbmltcG9ydCB7IGdldENvbmZpZyB9IGZyb20gXCIuLi91dGlscy9jb25maWdcIjtcblxuY2xhc3MgVHJhbnNjcmlwdGlvblNlcnZpY2Uge1xuICBwcml2YXRlIGNsaWVudDogQXNzZW1ibHlBSTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jbGllbnQgPSBuZXcgQXNzZW1ibHlBSSh7XG4gICAgICBhcGlLZXk6IGdldENvbmZpZygpLmFzc2VtYmx5QWlBcGlLZXksXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdHJhbnNjcmliZUF1ZGlvKGF1ZGlvVXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0cmFuc2NyaXB0ID0gYXdhaXQgdGhpcy5jbGllbnQudHJhbnNjcmlwdHMudHJhbnNjcmliZSh7XG4gICAgICAgIGF1ZGlvOiBhdWRpb1VybCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRyYW5zY3JpcHQudGV4dCB8fCBcIlwiO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdHJhbnNjcmliaW5nIGF1ZGlvOlwiLCBlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gdHJhbnNjcmliZSBhdWRpb1wiKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFRyYW5zY3JpcHRpb25TZXJ2aWNlKCk7XG4iXX0=