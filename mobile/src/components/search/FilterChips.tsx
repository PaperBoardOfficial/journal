import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { MediaType } from "shared";
import { FilterChip } from "@/src/types";

interface FilterChipsProps {
  selectedTypes: MediaType[];
  selectedTags: string[];
  dateFrom: string | null;
  dateTo: string | null;
  onPressFilter: (filter: FilterChip) => void;
}

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return `${date.getMonth() + 1}/${date.getDate()}/${date
    .getFullYear()
    .toString()
    .slice(2)}`;
};

export const FilterChips: React.FC<FilterChipsProps> = ({
  selectedTypes,
  selectedTags,
  dateFrom,
  dateTo,
  onPressFilter,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-1"
    >
      <TouchableOpacity
        className={`mr-2 px-3 py-1 rounded-full ${
          selectedTypes.length > 0 ? "bg-dark-600" : "bg-dark-700"
        }`}
        onPress={() => onPressFilter(FilterChip.TYPE)}
      >
        <Text className="text-dark-100">
          Type {selectedTypes.length > 0 ? `(${selectedTypes.length})` : ""}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`mr-2 px-3 py-1 rounded-full ${
          selectedTags.length > 0 ? "bg-dark-600" : "bg-dark-700"
        }`}
        onPress={() => onPressFilter(FilterChip.TAGS)}
      >
        <Text className="text-dark-100">
          Tags {selectedTags.length > 0 ? `(${selectedTags.length})` : ""}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`mr-2 px-3 py-1 rounded-full ${
          dateFrom ? "bg-dark-600" : "bg-dark-700"
        }`}
        onPress={() => onPressFilter(FilterChip.DATE_FROM)}
      >
        <Text className="text-dark-100">
          From {dateFrom ? formatDate(dateFrom) : ""}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`px-3 py-1 rounded-full ${
          dateTo ? "bg-dark-600" : "bg-dark-700"
        }`}
        onPress={() => onPressFilter(FilterChip.DATE_TO)}
      >
        <Text className="text-dark-100">
          To {dateTo ? formatDate(dateTo) : ""}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
