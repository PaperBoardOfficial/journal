import React, { useState } from "react";
import {
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NewTagDialogProps {
  visible: boolean;
  onClose: () => void;
  onAddTag: (tag: string) => void;
}

export const NewTagDialog: React.FC<NewTagDialogProps> = ({
  visible,
  onClose,
  onAddTag,
}) => {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim()) {
      onAddTag(newTag.trim());
      setNewTag("");
      onClose();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center">
        <Pressable className="absolute inset-0 bg-black/50" onPress={onClose} />
        <View className="bg-dark-700 rounded-xl w-4/5 p-4">
          <TextInput
            className="bg-dark-600 text-white px-3 py-2 rounded-lg mb-4"
            placeholder="Enter tag name..."
            placeholderTextColor="#737373"
            value={newTag}
            onChangeText={setNewTag}
            autoFocus
          />

          <View className="flex-row justify-between px-20">
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-dark-600 items-center justify-center"
              onPress={onClose}
            >
              <Ionicons name="close" size={20} color="#E5E5E5" />
            </TouchableOpacity>

            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-dark-500 items-center justify-center"
              onPress={handleAddTag}
            >
              <Ionicons name="checkmark" size={20} color="#E5E5E5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
