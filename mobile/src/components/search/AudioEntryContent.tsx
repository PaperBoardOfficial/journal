import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { JournalEntry } from "shared";
import { MemoryText } from "./MemoryText";
import { AudioPlayer } from "./AudioPlayer";

interface AudioEntryContentProps {
  item: JournalEntry;
  mediaUrl: string | null;
}

export const AudioEntryContent: React.FC<AudioEntryContentProps> = ({
  item,
  mediaUrl,
}) => {
  if (mediaUrl) {
    return (
      <View className="mb-2">
        {/* Audio player */}
        <View className="bg-dark-600/30 rounded-lg p-2 mb-2">
          <AudioPlayer uri={mediaUrl} />
        </View>

        {/* Memory with transcript icon */}
        <MemoryText memory={item.memory} />
      </View>
    );
  }

  return (
    <View className="mb-2">
      {/* Placeholder for unavailable audio */}
      <View className="bg-dark-600 rounded p-3 mb-2 items-center">
        <Ionicons name="mic-off" size={24} color="#737373" />
        <Text className="text-dark-300 mt-1">Audio unavailable</Text>
      </View>

      {/* Memory with transcript icon */}
      <MemoryText memory={item.memory} />
    </View>
  );
};
