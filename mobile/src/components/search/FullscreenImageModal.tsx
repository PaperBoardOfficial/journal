import React from "react";
import {
  Modal,
  Pressable,
  View,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FullscreenImageModalProps {
  imageUrl: string | null;
  visible: boolean;
  onClose: () => void;
}

export const FullscreenImageModal: React.FC<FullscreenImageModalProps> = ({
  imageUrl,
  visible,
  onClose,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-black">
        <Pressable
          className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2"
          onPress={onClose}
        >
          <Ionicons name="close" size={24} color="#fff" />
        </Pressable>

        <View className="flex-1 justify-center items-center">
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: screenWidth,
                height: screenHeight * 0.8,
                resizeMode: "contain",
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};
