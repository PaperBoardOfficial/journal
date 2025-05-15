import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import storageService from "@/src/services/storageService";
import { MediaType, SearchQueryParams } from "shared";
import apiService from "@/src/services/apiService";
import { FilterChip } from "@/src/types";
import { SearchBar } from "@/src/components/search/SearchBar";
import { FilterChips } from "@/src/components/search/FilterChips";
import { ResultsList } from "@/src/components/search/ResultsList";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedTypes, setSelectedTypes] = useState<MediaType[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);

  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDateMode, setCurrentDateMode] = useState<"from" | "to">("from");

  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchQueryParams>({
    query: "",
    userId: "",
  });

  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    setAvailableTags(storageService.getAvailableTags());
  }, []);

  const {
    data: results = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["journals", searchParams],
    queryFn: () => apiService.searchJournals(searchParams),
    enabled: searchPerformed,
  });

  const handleSearch = () => {
    const params: SearchQueryParams = {
      query: searchQuery || "",
      userId: "user123",
    };

    if (selectedTypes.length > 0) {
      // @ts-ignore
      params.types = selectedTypes.join(",");
    }

    if (selectedTags.length > 0) {
      // @ts-ignore
      params.tags = selectedTags.join(",");
    }

    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;

    setSearchParams(params);
    setSearchPerformed(true);
  };

  const toggleType = (type: MediaType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const openFilterModal = (filter: FilterChip) => {
    if (filter === FilterChip.TYPE) {
      setShowTypeSelector(true);
    } else if (filter === FilterChip.TAGS) {
      setShowTagSelector(true);
    } else if (
      filter === FilterChip.DATE_FROM ||
      filter === FilterChip.DATE_TO
    ) {
      const currentDate =
        filter === FilterChip.DATE_FROM
          ? dateFrom
            ? new Date(dateFrom)
            : new Date()
          : dateTo
          ? new Date(dateTo)
          : new Date();

      setTempDate(currentDate);
      setCurrentDateMode(filter === FilterChip.DATE_FROM ? "from" : "to");
      setShowDatePicker(true);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate && event.type === "set") {
      setTempDate(selectedDate);
      applyDateSelection(selectedDate);
    }
  };

  const applyDateSelection = (date: Date = tempDate) => {
    const isoString = date.toISOString();
    if (currentDateMode === "from") {
      setDateFrom(isoString);
    } else {
      setDateTo(isoString);
    }
  };

  const getTypeIcon = (type: MediaType) => {
    switch (type) {
      case MediaType.IMAGE:
        return "image-outline";
      case MediaType.AUDIO:
        return "mic-outline";
      case MediaType.TEXT:
        return "document-text-outline";
      default:
        return "help-circle-outline";
    }
  };

  const getTypeLabel = (type: MediaType) => {
    switch (type) {
      case MediaType.IMAGE:
        return "Image";
      case MediaType.AUDIO:
        return "Audio";
      case MediaType.TEXT:
        return "Text";
      default:
        return type;
    }
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-dark-800">
      {/* Sticky search header */}
      <View className="bg-dark-900 px-4 pt-2 pb-3 shadow-sm z-10">
        {/* Search bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearch={handleSearch}
        />

        {/* Filter chips */}
        <FilterChips
          selectedTypes={selectedTypes}
          selectedTags={selectedTags}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onPressFilter={openFilterModal}
        />
      </View>

      {/* Results */}
      <View className="flex-1 px-4 pt-4">
        <ResultsList
          results={results}
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
          hasSearchParams={Object.keys(searchParams).length > 0}
        />
      </View>

      {/* Simplified Type Selector Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showTypeSelector}
        onRequestClose={() => setShowTypeSelector(false)}
      >
        <Pressable
          className="flex-1 justify-center items-center bg-black/70"
          onPress={() => setShowTypeSelector(false)}
        >
          <View
            className="bg-dark-900 rounded-lg w-3/5 p-2"
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            {Object.values(MediaType).map((type) => (
              <TouchableOpacity
                key={type}
                className={`flex-row items-center py-3 px-4 mb-1 rounded-md ${
                  selectedTypes.includes(type) ? "bg-white/10" : ""
                }`}
                onPress={() => toggleType(type)}
              >
                <Ionicons
                  name={getTypeIcon(type)}
                  size={22}
                  color={selectedTypes.includes(type) ? "#E5E5E5" : "#9CA3AF"}
                />
                <Text
                  className={`ml-3 flex-1 text-base ${
                    selectedTypes.includes(type)
                      ? "text-white font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {getTypeLabel(type)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Tag Selector Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showTagSelector}
        onRequestClose={() => setShowTagSelector(false)}
      >
        <Pressable
          className="flex-1 justify-center items-center bg-black/70"
          onPress={() => setShowTagSelector(false)}
        >
          <View
            className="bg-dark-900 rounded-lg w-4/5 p-2 max-h-[60%]"
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            {availableTags.length > 0 ? (
              <FlatList
                data={availableTags}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className={`flex-row items-center py-2.5 px-4 mb-0.5 rounded-md ${
                      selectedTags.includes(item) ? "bg-white/10" : ""
                    }`}
                    onPress={() => toggleTag(item)}
                  >
                    <Ionicons
                      name="pricetag-outline"
                      size={18}
                      color={
                        selectedTags.includes(item) ? "#E5E5E5" : "#9CA3AF"
                      }
                    />
                    <Text
                      className={`ml-2.5 flex-1 text-sm ${
                        selectedTags.includes(item)
                          ? "text-white font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <Text className="text-gray-400 text-center p-4 text-sm">
                No tags available
              </Text>
            )}
          </View>
        </Pressable>
      </Modal>

      {/* Date Picker*/}
      {showDatePicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="spinner"
          onChange={onDateChange}
        />
      )}
    </SafeAreaView>
  );
}
