import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { moods, MoodOption } from "../../types";

interface MoodSelectorProps {
  selectedMood?: string;
  onMoodSelect: (mood: string) => void;
}

export function MoodSelector({
  selectedMood,
  onMoodSelect,
}: MoodSelectorProps) {
  const handleMoodSelection = (mood: string) => {
    if (selectedMood === mood) {
      onMoodSelect("");
    } else {
      onMoodSelect(mood);
    }
  };

  return (
    <ScrollView
      className="flex-1 px-4 pt-4"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row flex-wrap justify-center">
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.name}
            className={`w-1/3 items-center justify-center mb-8 ${
              selectedMood === mood.name ? "opacity-100" : "opacity-70"
            }`}
            onPress={() => handleMoodSelection(mood.name)}
          >
            <View
              className={`w-20 h-20 rounded-full items-center justify-center mb-2 ${
                selectedMood === mood.name ? "bg-dark-500" : "bg-dark-700"
              }`}
            >
              <Text style={{ fontSize: 40 }}>{mood.emoji}</Text>
            </View>
            <Text className="text-white text-center">{mood.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
