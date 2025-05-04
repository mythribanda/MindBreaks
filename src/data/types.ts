
export type MoodType = 'energized' | 'focused' | 'tired' | 'distracted' | 'stressed' | 'creative';

export type BreakActivityType = 'riddle' | 'doodle' | 'sound' | 'creative' | 'stretch' | 'video' | 'game' | 'interactive' | 'virtual';

export type BreakActivity = {
  id: string;
  title: string;
  description: string;
  type: BreakActivityType;
  duration: number; // in minutes
  icon: string;
  moodBenefit: MoodType[];
  videoUrl?: string; // YouTube embed URL for video activities
  gameType?: 'memory' | 'wordAssociation' | 'focusTarget' | 'pattern' | 'breathing'; // Type of game for game activities
  interactiveType?: 'mindfulness' | 'gratitude' | 'visual' | 'ideation'; // Type of interactive activity
};

export type UserBreak = {
  id: string;
  activityId: string;
  startTime: Date;
  endTime: Date;
  completed: boolean;
  moodBefore?: MoodType;
  moodAfter?: MoodType;
};

export type User = {
  id: string;
  name: string;
  email: string;
  streak: number;
  totalBreaks: number;
  lastBreakDate?: Date;
};
