import React from "react";
import { View, Text } from "react-native";

interface TagsListProps {
  tags: string[];
}

export const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  if (!tags.length) return null;

  return (
    <View className="flex-row flex-wrap flex-1">
      {tags.map((tag) => (
        <View key={tag} className="bg-dark-600 px-2 py-1 rounded mr-2 mb-1">
          <Text className="text-dark-200 text-xs">{tag}</Text>
        </View>
      ))}
    </View>
  );
};
