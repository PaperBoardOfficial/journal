import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
}) => {
  return (
    <View className="flex-row items-center mb-3">
      <TextInput
        className="flex-1 h-12 bg-dark-700 text-dark-100 px-3 rounded-l-lg"
        placeholder="Search journals..."
        placeholderTextColor="#737373"
        value={searchQuery}
        onChangeText={onSearchQueryChange}
      />
      <TouchableOpacity
        className="bg-dark-600 h-12 px-4 justify-center rounded-r-lg"
        onPress={onSearch}
      >
        <Text className="text-dark-100 font-medium">Search</Text>
      </TouchableOpacity>
    </View>
  );
};
