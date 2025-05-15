import { Camera } from "expo-camera";
import { AudioModule } from "expo-audio";
import * as Location from "expo-location";

class PermissionService {
  public async requestAllPermissions(): Promise<void> {
    try {
      await Camera.requestCameraPermissionsAsync();
      await AudioModule.requestRecordingPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
    } catch (error) {
      console.error("Error requesting permissions:", error);
    }
  }
}

export default new PermissionService();
