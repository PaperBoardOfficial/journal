import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getMoodEmoji } from "../../types";

interface LocationInfo {
  name?: string;
  latitude: number;
  longitude: number;
}

interface InfoButtonProps {
  mood?: string;
  score: number;
  timestamp: string;
  location?: LocationInfo;
}

export const InfoButton: React.FC<InfoButtonProps> = ({
  mood,
  score,
  timestamp,
  location,
}) => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  const getLocationDisplay = () => {
    if (!location) return null;

    if (location.name) {
      return (
        <>
          <View className="flex-row items-center">
            <Ionicons name="location" size={16} color="#A1A1AA" />
            <Text className="text-dark-100 ml-1">{location.name}</Text>
          </View>
          <Text className="text-dark-300 text-xs mt-1 ml-5">
            {location.latitude}, {location.longitude}
          </Text>
        </>
      );
    }

    return (
      <View className="flex-row items-center">
        <Ionicons name="location" size={16} color="#A1A1AA" />
        <Text className="text-dark-100 ml-1">
          {location.latitude}, {location.longitude}
        </Text>
      </View>
    );
  };

  return (
    <>
      <TouchableOpacity
        className="bg-dark-600 rounded-full p-1"
        onPress={() => setShowInfoModal(true)}
      >
        <Ionicons name="information-circle-outline" size={20} color="#A1A1AA" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={showInfoModal}
        animationType="fade"
        onRequestClose={() => setShowInfoModal(false)}
      >
        <Pressable
          className="flex-1 justify-center items-center bg-black/70"
          onPress={() => setShowInfoModal(false)}
        >
          <Pressable className="bg-dark-700 p-4 rounded-lg w-4/5 m-4">
            <View className="flex-row justify-between mb-4">
              <Text className="text-dark-100 font-bold text-lg">
                Entry Details
              </Text>
              <TouchableOpacity onPress={() => setShowInfoModal(false)}>
                <Ionicons name="close" size={24} color="#A1A1AA" />
              </TouchableOpacity>
            </View>

            <View className="mb-3">
              <Text className="text-dark-300 mb-1">Date</Text>
              <View className="flex-row items-center">
                <Ionicons name="calendar" size={16} color="#A1A1AA" />
                <Text className="text-dark-100 ml-1">
                  {new Date(timestamp).toLocaleDateString()}{" "}
                  {new Date(timestamp).toLocaleTimeString()}
                </Text>
              </View>
            </View>

            {mood && (
              <View className="mb-3">
                <Text className="text-dark-300 mb-1">Mood</Text>
                <View className="flex-row items-center">
                  <Text className="text-dark-100">
                    {getMoodEmoji(mood)} {mood}
                  </Text>
                </View>
              </View>
            )}

            {location && (
              <View className="mb-3">
                <Text className="text-dark-300 mb-1">Location</Text>
                {getLocationDisplay()}
              </View>
            )}

            <View>
              <Text className="text-dark-300 mb-1">Relevance Score</Text>
              <View className="flex-row items-center">
                <Ionicons name="analytics" size={16} color="#A1A1AA" />
                <Text className="text-dark-100 ml-1">
                  {(score * 100).toFixed(2)}%
                </Text>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};
