import React from "react";
import { View, Text } from "react-native";
import { JournalEntry } from "shared";

interface TextEntryContentProps {
  item: JournalEntry;
}

export const TextEntryContent: React.FC<TextEntryContentProps> = ({ item }) => {
  return (
    <View className="mb-2">
      {/* Text content */}
      <Text className="text-dark-100 mb-3" numberOfLines={4}>
        {item.data}
      </Text>
    </View>
  );
};
