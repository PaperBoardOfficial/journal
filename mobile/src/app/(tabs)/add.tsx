import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MediaType } from "shared";
import { Ionicons } from "@expo/vector-icons";

export default function AddScreen() {
  const router = useRouter();

  const handleMediaTypeSelect = (type: MediaType) => {
    if (type === MediaType.TEXT) {
      router.push("/journal/text-entry");
    } else if (type === MediaType.IMAGE) {
      router.push("/journal/camera-capture");
    } else if (type === MediaType.AUDIO) {
      router.push("/journal/audio-recorder");
    }
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-dark-800">
      <View className="flex-1 w-full p-6">
        <Text className="text-2xl font-bold text-dark-100 mb-6 text-center">
          New Journal
        </Text>

        <TouchableOpacity
          className="bg-dark-700 rounded-lg p-4 flex-row items-center mb-4"
          onPress={() => handleMediaTypeSelect(MediaType.TEXT)}
        >
          <Ionicons name="document-text" size={24} color="#E5E5E5" />
          <Text className="text-lg text-dark-100 ml-3">Text Note</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-dark-700 rounded-lg p-4 flex-row items-center mb-4"
          onPress={() => handleMediaTypeSelect(MediaType.IMAGE)}
        >
          <Ionicons name="camera" size={24} color="#E5E5E5" />
          <Text className="text-lg text-dark-100 ml-3">Take a Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-dark-700 rounded-lg p-4 flex-row items-center"
          onPress={() => handleMediaTypeSelect(MediaType.AUDIO)}
        >
          <Ionicons name="mic" size={24} color="#E5E5E5" />
          <Text className="text-lg text-dark-100 ml-3">Record Audio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
