import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MemoryTextProps {
  memory: string | undefined;
}

export const MemoryText: React.FC<MemoryTextProps> = ({ memory }) => {
  if (!memory) return null;

  return (
    <View className="flex-row mb-3">
      <Ionicons
        name="document-text-outline"
        size={16}
        color="#A1A1AA"
        style={{ marginTop: 2, marginRight: 6 }}
      />
      <Text className="text-dark-100 flex-1">{memory}</Text>
    </View>
  );
};
