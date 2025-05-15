import "@/global.css";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import permissionService from "@/src/services/permissionService";
import { ToastProvider } from "@/src/components/ui/ToastManager";

const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    permissionService.requestAllPermissions();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <View className="flex-1 bg-dark-900">
          <StatusBar hidden={true} />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Screen name="(tabs)" />
          </Stack>
        </View>
      </ToastProvider>
    </QueryClientProvider>
  );
}
