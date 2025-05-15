import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SectionList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { JournalEntry, MediaType } from "shared";
import { JournalItem } from "./JournalItem";

interface ResultsListProps {
  results: JournalEntry[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
  hasSearchParams: boolean;
}

export const ResultsList: React.FC<ResultsListProps> = ({
  results,
  isLoading,
  isError,
  error,
  refetch,
  hasSearchParams,
}) => {
  if (isLoading) {
    return <ActivityIndicator size="large" color="#E5E5E5" />;
  }

  if (isError) {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-red-500 mb-2">
          {error instanceof Error
            ? error.message
            : "Failed to fetch results. Please try again."}
        </Text>
        <TouchableOpacity
          className="bg-dark-600 px-4 py-2 rounded"
          onPress={refetch}
        >
          <Text className="text-dark-100">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (results.length === 0) {
    return (
      <View className="items-center justify-center flex-1">
        <Ionicons name="search-outline" size={48} color="#737373" />
        <Text className="text-dark-300 mt-2">
          {hasSearchParams ? "No results found" : "Search for journal entries"}
        </Text>
      </View>
    );
  }

  const groupedResults = () => {
    const sortedResults = [...results].sort((a, b) => b.score - a.score);

    const sections = [];

    const imageEntries = sortedResults.filter(
      (item) => item.type === MediaType.IMAGE
    );
    const audioEntries = sortedResults.filter(
      (item) => item.type === MediaType.AUDIO
    );
    const textEntries = sortedResults.filter(
      (item) => item.type === MediaType.TEXT
    );

    if (imageEntries.length > 0) {
      sections.push({ data: imageEntries });
    }

    if (audioEntries.length > 0) {
      sections.push({ data: audioEntries });
    }

    if (textEntries.length > 0) {
      sections.push({ data: textEntries });
    }

    return sections;
  };

  return (
    <SectionList
      sections={groupedResults()}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <JournalItem item={item} />}
      contentContainerStyle={{ paddingBottom: 20 }}
      stickySectionHeadersEnabled={false}
    />
  );
};
