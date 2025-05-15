import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Location from "expo-location";
import { MediaType, JournalEntryPayload, JournalMetadata } from "shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiService from "@/src/services/apiService";
import storageService from "@/src/services/storageService";
import fileService from "@/src/services/fileService";
import { NewTagDialog } from "@/src/components/add/NewTagDialog";
import { useToast } from "@/src/components/ui/ToastManager";

export default function TagSelectionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const textContent = params.textContent as string | undefined;
  const photoUri = params.photoUri as string | undefined;
  const audioUri = params.audioUri as string | undefined;
  const mood = params.mood as string;

  const [tags, setTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [showTagDialog, setShowTagDialog] = useState(false);
  const [location, setLocation] = useState<
    JournalMetadata["location"] | undefined
  >(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const { showToast } = useToast();

  const queryClient = useQueryClient();

  // Clear the progress animation interval on component unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Smoothly animate the progress bar
  useEffect(() => {
    if (isSubmitting && uploadProgress > 0) {
      // If the display is behind the actual progress, animate to catch up
      if (displayProgress < uploadProgress) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }

        progressIntervalRef.current = setInterval(() => {
          setDisplayProgress((current) => {
            // Gradually approach the target progress
            const nextProgress = Math.min(current + 1, uploadProgress);

            // Once we reach the target, clear the interval
            if (nextProgress >= uploadProgress) {
              if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
              }
            }

            return nextProgress;
          });
        }, 50); // Update every 50ms for smooth animation
      }
    } else {
      // Reset the progress when not submitting
      setDisplayProgress(0);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  }, [isSubmitting, uploadProgress, displayProgress]);

  useEffect(() => {
    const storedTags = storageService.getAvailableTags();
    if (storedTags.length > 0) {
      setAvailableTags(storedTags);
    }
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const addressResponse = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      const cityName = addressResponse[0]?.city || "";

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        name: cityName,
      });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const createJournalMutation = useMutation({
    mutationFn: (payload: JournalEntryPayload) =>
      apiService.createJournal(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      router.navigate("/(tabs)/add");
      showToast({
        message: "Journal entry created successfully!",
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Error creating journal entry:", error);
      showToast({
        message: "Failed to save journal entry. Please try again.",
        type: "error",
      });
      setIsSubmitting(false);
    },
  });

  const updateTagsStorage = () => {
    tags.forEach((tag) => {
      if (!availableTags.includes(tag)) {
        storageService.addTag(tag);
      }
    });
  };

  const handleProgressUpdate = (progress: number) => {
    setUploadProgress(progress);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setUploadProgress(0);
    setDisplayProgress(0);

    try {
      const metadata: JournalMetadata = {
        timestamp: new Date().toISOString(),
        tags,
      };

      if (mood) metadata.mood = mood;
      if (location) metadata.location = location;

      updateTagsStorage();

      let entryType: MediaType;
      let entryData: string = "";

      if (audioUri || photoUri) {
        const mediaUri = audioUri || photoUri;
        entryType = audioUri ? MediaType.AUDIO : MediaType.IMAGE;

        // Add initial progress for better user feedback
        setUploadProgress(5);

        if (mediaUri) {
          entryData = await fileService.uploadFileToS3(
            mediaUri,
            entryType,
            "user123",
            handleProgressUpdate
          );
        }
      } else {
        entryType = MediaType.TEXT;
        entryData = textContent || "";
      }

      // For texts, we can show a predetermined progress pattern
      if (entryType === MediaType.TEXT) {
        // Simulate progress for text submissions
        setUploadProgress(30);
        setTimeout(() => setUploadProgress(60), 300);
        setTimeout(() => setUploadProgress(90), 600);
      }

      createJournalMutation.mutate({
        type: entryType,
        data: entryData,
        metadata,
        userId: "user123",
      });
    } catch (error) {
      console.error("Error uploading and creating journal entry:", error);
      showToast({
        message:
          "Failed to upload media and save journal entry. Please try again.",
        type: "error",
      });
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleAddNewTag = (newTag: string) => {
    if (!availableTags.includes(newTag)) {
      setAvailableTags([...availableTags, newTag]);
      storageService.addTag(newTag);
    }
    if (!tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-dark-800">
      <View className="px-4 py-3 flex-row items-center">
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#E5E5E5" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white mx-auto">Tags</Text>
        <View style={{ width: 24 }}></View>
      </View>

      <ScrollView className="flex-1 px-4 pt-4">
        <View className="flex-row flex-wrap justify-center">
          {availableTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              className={
                tags.includes(tag)
                  ? "bg-dark-500 rounded-xl px-5 py-3 m-2"
                  : "bg-dark-700 rounded-xl px-5 py-3 m-2"
              }
              onPress={() => toggleTag(tag)}
            >
              <Text className="text-white text-center text-base font-medium">
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            className="bg-dark-600 rounded-xl w-12 h-12 m-2 items-center justify-center"
            onPress={() => setShowTagDialog(true)}
          >
            <Ionicons name="add" size={24} color="#E5E5E5" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isSubmitting && (
        <View className="px-4 mt-2">
          <View className="bg-dark-700 h-2 rounded-full w-full">
            <View
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${displayProgress}%` }}
            />
          </View>
          <Text className="text-white text-center mt-1">
            {displayProgress}%
          </Text>
        </View>
      )}

      <View className="p-4 mb-16">
        <TouchableOpacity
          className="bg-dark-600 rounded-lg p-3 w-full"
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text className="text-white font-medium text-center">
            {isSubmitting
              ? textContent
                ? "Processing..."
                : "Uploading..."
              : "Submit"}
          </Text>
        </TouchableOpacity>
      </View>

      <NewTagDialog
        visible={showTagDialog}
        onClose={() => setShowTagDialog(false)}
        onAddTag={handleAddNewTag}
      />
    </SafeAreaView>
  );
}
