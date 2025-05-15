import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";

interface AudioPlayerProps {
  uri: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ uri }) => {
  const player = useAudioPlayer({ uri });
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setElapsed(0);
    setIsPlaying(false);

    return () => {
      clearTimer();
    };
  }, [uri]);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    clearTimer();

    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsed((prev) => {
          const newTime = prev + 0.1;
          const actualDuration = player.duration || 0;
          if (actualDuration > 0 && newTime >= actualDuration) {
            clearTimer();
            player.pause();
            setIsPlaying(false);
            return actualDuration;
          }
          return newTime;
        });
      }, 100);
    }

    return clearTimer;
  }, [isPlaying, player]);

  const togglePlayback = async () => {
    try {
      if (isPlaying) {
        player.pause();
        setIsPlaying(false);
      } else {
        const actualDuration = player.duration || 0;
        if (actualDuration > 0 && elapsed >= actualDuration) {
          setElapsed(0);
        }
        player.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error controlling audio playback:", error);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View className="flex-row items-center">
      <TouchableOpacity
        className="bg-dark-500 h-8 w-8 rounded-full items-center justify-center"
        onPress={togglePlayback}
      >
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={16}
          color="#E5E5E5"
        />
      </TouchableOpacity>

      <View className="flex-1 ml-3">
        <View className="h-1.5 bg-dark-800 rounded-full w-full">
          <View
            className="bg-dark-300 h-1.5 rounded-full"
            style={{
              width: player.duration
                ? `${(elapsed / player.duration) * 100}%`
                : "0%",
            }}
          />
        </View>
        <Text className="text-dark-300 text-xs mt-1">
          {formatTime(elapsed)} /{" "}
          {player.duration ? formatTime(player.duration) : "--:--"}
        </Text>
      </View>
    </View>
  );
};
