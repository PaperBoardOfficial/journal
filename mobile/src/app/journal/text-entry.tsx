import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TextEntry } from "@/src/components/add/TextEntry";
import { useToast } from "@/src/components/ui/ToastManager";

export default function TextEntryScreen() {
  const router = useRouter();
  const [textContent, setTextContent] = useState("");
  const { showToast } = useToast();

  const handleNext = () => {
    if (!textContent.trim()) {
      showToast({
        message: "Please enter some text before continuing",
        type: "error",
      });
      return;
    }

    router.push({
      pathname: "/journal/mood-selection",
      params: { textContent },
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
        <Text className="text-xl font-bold text-white mx-auto">
          Write Your Entry
        </Text>
        <View style={{ width: 24 }}></View>
      </View>

      <View className="flex-1">
        <TextEntry value={textContent} onChangeText={setTextContent} />
      </View>

      <View className="p-4 mt-auto mb-10">
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
