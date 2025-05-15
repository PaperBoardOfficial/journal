import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAudioRecorder, RecordingPresets } from "expo-audio";
import { useToast } from "@/src/components/ui/ToastManager";

export default function AudioRecorderScreen() {
  const router = useRouter();
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    let interval: number;

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      setRecordingTime(0);
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      setIsRecording(true);
      setRecordingComplete(false);
    } catch (error) {
      console.error("Error starting recording:", error);
      showToast({
        message: "Failed to start recording",
        type: "error",
      });
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecorder.stop();
      setIsRecording(false);
      setRecordingComplete(true);
      console.log("Recording available at:", audioRecorder.uri);
    } catch (error) {
      console.error("Error stopping recording:", error);
      showToast({
        message: "Failed to stop recording",
        type: "error",
      });
    }
  };

  const handleNext = () => {
    if (recordingComplete && audioRecorder.uri) {
      router.push({
        pathname: "/journal/mood-selection",
        params: { audioUri: audioRecorder.uri },
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-dark-800">
      <View className="px-4 py-3 flex-row items-center">
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#E5E5E5" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white mx-auto">
          Record Audio
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      <View className="flex-1 justify-center px-6">
        {/* Timer display */}
        <View className="mb-16 items-center">
          <Text
            className={`${
              isRecording ? "text-red-400" : "text-white"
            } text-6xl font-light`}
          >
            {formatTime(recordingTime)}
          </Text>

          <Text className="text-gray-400 mt-3 text-base">
            {isRecording
              ? "Recording..."
              : recordingComplete
              ? "Recording complete"
              : "Ready to record"}
          </Text>
        </View>

        {/* Recording controls */}
        <View className="items-center">
          {!recordingComplete ? (
            <TouchableOpacity
              className={`${
                isRecording ? "bg-red-500" : "bg-dark-500"
              } w-20 h-20 rounded-full items-center justify-center`}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <Ionicons
                name={isRecording ? "stop" : "mic"}
                size={32}
                color="#E5E5E5"
              />
            </TouchableOpacity>
          ) : (
            <View className="flex-row justify-between w-full px-16">
              <TouchableOpacity
                className="bg-dark-600 w-20 h-20 rounded-full items-center justify-center"
                onPress={startRecording}
              >
                <Ionicons name="refresh" size={28} color="#E5E5E5" />
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-dark-500 w-20 h-20 rounded-full items-center justify-center"
                onPress={handleNext}
              >
                <Ionicons name="checkmark" size={32} color="#E5E5E5" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
