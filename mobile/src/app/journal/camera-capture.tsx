import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { CameraView, CameraType } from "expo-camera";

export default function CameraCaptureScreen() {
  const router = useRouter();
  const [photo, setPhoto] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [isReady, setIsReady] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        console.log("Taking picture...");
        const picture = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          skipProcessing: false,
        });
        console.log("Picture taken:", picture.uri);
        if (picture) {
          setPhoto(picture.uri);
        }
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    } else {
      console.log("Camera ref is null");
    }
  };

  const retakePicture = () => {
    setPhoto(null);
  };

  const handleNext = () => {
    if (photo) {
      router.push({
        pathname: "/journal/mood-selection",
        params: { photoUri: photo },
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const onCameraReady = () => {
    console.log("Camera is ready");
    setIsReady(true);
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-dark-800">
      <View className="px-4 py-3 flex-row items-center">
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#E5E5E5" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white mx-auto">
          Capture Image
        </Text>
        <View className="w-6"></View>
      </View>

      {!photo ? (
        <View className="flex-1 relative">
          <CameraView
            ref={cameraRef}
            style={{ flex: 1, width: "100%", height: "100%" }}
            className="flex-1 w-full h-full"
            facing={facing}
            flash="off"
            onMountError={(error) =>
              console.error("Camera mount error:", error)
            }
            onCameraReady={onCameraReady}
          />

          {/* Loading indicator while camera initializes */}
          {!isReady && (
            <View className="absolute inset-0 justify-center items-center bg-black/30">
              <ActivityIndicator size="large" color="#E5E5E5" />
            </View>
          )}

          {/* Camera controls - absolutely positioned over the camera */}
          <View className="absolute bottom-0 left-0 right-0 pb-10">
            <View className="flex-row justify-between items-center px-10">
              <TouchableOpacity
                className="bg-[rgba(32,32,32,0.8)] w-16 h-16 rounded-full items-center justify-center"
                onPress={toggleCameraFacing}
                disabled={!isReady}
              >
                <Ionicons
                  name="camera-reverse-outline"
                  size={28}
                  color="#E5E5E5"
                />
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-white w-20 h-20 rounded-full items-center justify-center"
                onPress={takePicture}
                disabled={!isReady}
              >
                <View className="bg-[#202020] w-16 h-16 rounded-full border-2 border-white"></View>
              </TouchableOpacity>

              <View className="w-16"></View>
            </View>
          </View>
        </View>
      ) : (
        <View className="flex-1">
          <Image
            source={{ uri: photo }}
            className="flex-1"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 pb-10">
            <View className="flex-row justify-between items-center px-10">
              <TouchableOpacity
                className="bg-dark-800/80 w-16 h-16 rounded-full items-center justify-center"
                onPress={retakePicture}
              >
                <Ionicons name="refresh-outline" size={28} color="#E5E5E5" />
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-dark-500 w-16 h-16 rounded-full items-center justify-center"
                onPress={handleNext}
              >
                <Ionicons name="checkmark" size={28} color="#E5E5E5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
