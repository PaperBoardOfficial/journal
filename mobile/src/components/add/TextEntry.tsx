import React from "react";
import { View, TextInput } from "react-native";

interface TextEntryProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function TextEntry({ value, onChangeText }: TextEntryProps) {
  return (
    <View className="flex-1 p-4">
      <TextInput
        className="bg-dark-700 p-4 rounded-lg text-white flex-1 min-h-[70%] border border-gray-500"
        placeholder="Write your thoughts here..."
        placeholderTextColor="#737373"
        multiline
        textAlignVertical="top"
        value={value}
        onChangeText={onChangeText}
        style={{ fontSize: 16 }}
      />
    </View>
  );
}
