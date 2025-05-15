import React, { useEffect } from "react";
import { Text, Animated } from "react-native";

interface ToastProps {
  visible: boolean;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = "info",
  duration = 3000,
}) => {
  const translateY = new Animated.Value(100);
  const opacity = new Animated.Value(0);

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-800";
      case "error":
        return "bg-red-800";
      default:
        return "bg-dark-600";
    }
  };

  useEffect(() => {
    if (visible) {
      // Show toast
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after specified duration
      const timer = setTimeout(() => {
        // Hide toast
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, message]);

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity,
        position: "absolute",
        bottom: 100,
        left: 20,
        right: 20,
      }}
      className={`${getBgColor()} p-4 rounded-xl shadow-lg`}
    >
      <Text className="text-white text-center font-medium">{message}</Text>
    </Animated.View>
  );
};
