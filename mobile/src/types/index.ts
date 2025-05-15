export enum FilterChip {
  TAGS = "tags",
  TYPE = "type",
  DATE_FROM = "dateFrom",
  DATE_TO = "dateTo",
}

export interface MoodOption {
  name: string;
  emoji: string;
}

export const moods: MoodOption[] = [
  { name: "Happy", emoji: "😊" },
  { name: "Sad", emoji: "😔" },
  { name: "Excited", emoji: "🤩" },
  { name: "Calm", emoji: "😌" },
  { name: "Charged", emoji: "💪" },
  { name: "Rocket", emoji: "🚀" },
  { name: "Grateful", emoji: "🙏" },
  { name: "Tired", emoji: "😴" },
  { name: "Angry", emoji: "😡" },
  { name: "Anxious", emoji: "😰" },
  { name: "Stressed", emoji: "😫" },
  { name: "Neutral", emoji: "😐" },
];

// Mapping mood names to emojis for quick lookup
export const moodEmojis: Record<string, string> = moods.reduce(
  (acc, mood) => ({
    ...acc,
    [mood.name.toLowerCase()]: mood.emoji,
  }),
  {}
);

// Helper function to get mood emoji
export const getMoodEmoji = (mood?: string): string => {
  if (!mood) return "";
  return moodEmojis[mood.toLowerCase()] || "";
};
