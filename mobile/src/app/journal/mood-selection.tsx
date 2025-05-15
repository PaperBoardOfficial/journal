import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MoodSelector } from "@/src/components/add/MoodSelector";

export default function MoodSelectionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const textContent = params.textContent as string | undefined;
  const photoUri = params.photoUri as string | undefined;
  const audioUri = params.audioUri as string | undefined;

  const [mood, setMood] = useState<string | undefined>(undefined);

  const handleNext = () => {
    // Mood is optional, so we can proceed without selection
    router.push({
      pathname: "/journal/tag-selection",
      params: {
        textContent: textContent || "",
        photoUri: photoUri || "",
        audioUri: audioUri || "",
        mood: mood || "",
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-dark-800">
      <View className="px-4 py-3 flex-row items-center">
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#E5E5E5" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white mx-auto">Mood</Text>
        <View style={{ width: 24 }}></View>
      </View>

      <View className="flex-1">
        <MoodSelector selectedMood={mood} onMoodSelect={setMood} />
      </View>

      <View className="p-4 mb-16">
        <TouchableOpacity
          className="bg-dark-600 rounded-lg p-3 w-full"
          onPress={handleNext}
        >
          <Text className="text-white font-medium text-center">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
