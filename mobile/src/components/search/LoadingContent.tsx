import React from "react";
import { View, ActivityIndicator } from "react-native";

export const LoadingContent: React.FC = () => {
  return (
    <View className="h-40 bg-dark-600 rounded items-center justify-center mb-2">
      <ActivityIndicator size="large" color="#E5E5E5" />
    </View>
  );
};
