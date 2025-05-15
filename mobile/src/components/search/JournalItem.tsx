import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { JournalEntry, MediaType } from "shared";
import storageService from "@/src/services/storageService";
import { TextEntryContent } from "./TextEntryContent";
import { ImageEntryContent } from "./ImageEntryContent";
import { AudioEntryContent } from "./AudioEntryContent";
import { FullscreenImageModal } from "./FullscreenImageModal";
import { LoadingContent } from "./LoadingContent";
import { InfoButton } from "./InfoButton";
import { TagsList } from "./TagsList";

interface JournalItemProps {
  item: JournalEntry;
}

export const JournalItem: React.FC<JournalItemProps> = ({ item }) => {
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const loadMediaContent = async () => {
    try {
      if (item.type === MediaType.TEXT) {
        return;
      }

      setIsLoading(true);

      const localPath = storageService.getLocalPathForS3Key(item.data);

      if (localPath) {
        setMediaUrl(localPath);
      } else {
        console.log(`No local file found for: ${item.data}`);
        setMediaUrl(null);
      }
    } catch (error) {
      console.error("Failed to load media content:", error);
      setMediaUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMediaContent();
  }, [item.data]);

  const renderMediaContent = () => {
    if (isLoading) {
      return <LoadingContent />;
    }

    switch (item.type) {
      case MediaType.TEXT:
        return <TextEntryContent item={item} />;

      case MediaType.IMAGE:
        return (
          <ImageEntryContent
            item={item}
            mediaUrl={mediaUrl}
            onImagePress={() => setShowFullImage(true)}
          />
        );

      case MediaType.AUDIO:
        return <AudioEntryContent item={item} mediaUrl={mediaUrl} />;

      default:
        return (
          <Text className="text-dark-100 mb-2">
            Unsupported media type: {item.type}
          </Text>
        );
    }
  };

  return (
    <View className="p-4 bg-dark-700 rounded-lg mb-3 border border-dark-500">
      {renderMediaContent()}

      {/* Common footer with tags and metadata */}
      <View className="flex-row justify-between items-center mt-2">
        {/* Tags on the left */}
        <TagsList tags={item.tags} />

        {/* Date and info button on the right */}
        <View className="flex-row items-center">
          <Text className="text-dark-300 text-xs mr-2">
            {new Date(item.timestamp).toLocaleDateString()}
          </Text>
          <InfoButton
            mood={item.mood}
            score={item.score || 0}
            timestamp={item.timestamp}
            location={item.location}
          />
        </View>
      </View>

      <FullscreenImageModal
        imageUrl={mediaUrl}
        visible={showFullImage}
        onClose={() => setShowFullImage(false)}
      />
    </View>
  );
};
