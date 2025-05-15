import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { JournalEntry } from "shared";
import { MemoryText } from "./MemoryText";

interface ImageEntryContentProps {
  item: JournalEntry;
  mediaUrl: string | null;
  onImagePress: () => void;
}

export const ImageEntryContent: React.FC<ImageEntryContentProps> = ({
  item,
  mediaUrl,
  onImagePress,
}) => {
  if (mediaUrl) {
    return (
      <View className="mb-2">
        {/* Image display - now wrapped in TouchableOpacity */}
        <TouchableOpacity activeOpacity={0.9} onPress={onImagePress}>
          <Image
            source={{ uri: mediaUrl }}
            className="h-40 w-full rounded mb-2"
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* Memory with description icon */}
        <MemoryText memory={item.memory} />
      </View>
    );
  }

  return (
    <View className="mb-2">
      {/* Placeholder for unavailable image */}
      <View className="h-40 bg-dark-600 rounded items-center justify-center mb-2">
        <Ionicons name="image" size={48} color="#737373" />
        <Text className="text-dark-300 mt-2">Image unavailable</Text>
      </View>

      {/* Memory text */}
      <MemoryText memory={item.memory} />
    </View>
  );
};
