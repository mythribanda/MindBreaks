import { BreakActivity, MoodType, User, UserBreak } from "./types";

export const mockActivities: BreakActivity[] = [
  {
    id: "1",
    title: "Cosmic Riddle",
    description: "Expand your neural pathways with this mind-bender: I'm something that surrounds you daily but can't be touched. I change form constantly yet remain the same. What am I?",
    type: "riddle",
    duration: 3,
    icon: "brain",
    moodBenefit: ["focused", "creative"],
  },
  {
    id: "2",
    title: "Digital Doodle Quest",
    description: "Draw a futuristic transportation device using only 5 lines. There are no wrong answers - let your imagination soar!",
    type: "doodle",
    duration: 5,
    icon: "pen",
    moodBenefit: ["creative", "energized"],
  },
  {
    id: "3",
    title: "Energy Surge",
    description: "Power up your body with 5 energizing stretches: stand tall, reach for the stars, twist gently side to side, and feel your energy reserves refill!",
    type: "stretch",
    duration: 2,
    icon: "activity",
    moodBenefit: ["focused", "energized"],
  },
  {
    id: "4",
    title: "Micro-Fiction Challenge",
    description: "Create a 3-sentence sci-fi story using these elements: a quantum computer, a forgotten message, and a surprising discovery.",
    type: "creative",
    duration: 4,
    icon: "sparkles",
    moodBenefit: ["creative", "focused"],
  },
  {
    id: "5",
    title: "Sonic Awareness",
    description: "Enter sound detective mode! Close your eyes and identify 3 sounds around you, then imagine what they'd sound like on a space station.",
    type: "sound",
    duration: 3,
    icon: "music",
    moodBenefit: ["focused", "energized"],
  },
  {
    id: "6",
    title: "Quantum Stretch Sequence",
    description: "Activate your body's energy centers with this sequence of movements designed to realign your posture and refresh your mind-body connection.",
    type: "stretch",
    duration: 4,
    icon: "zap",
    moodBenefit: ["energized", "focused"],
  },
  {
    id: "7",
    title: "Perception Shift",
    description: "Choose an ordinary object nearby. For 60 seconds, examine it as if you're an alien scientist seeing it for the first time. What new details do you notice?",
    type: "creative",
    duration: 3,
    icon: "rocket",
    moodBenefit: ["focused", "creative"],
  },
  {
    id: "8",
    title: "Mind Palace",
    description: "Visualize your perfect productivity space. What 3 features would it have? Imagine yourself working there for 2 minutes - feel your focus amplify!",
    type: "creative",
    duration: 4,
    icon: "bulb",
    moodBenefit: ["focused", "creative"],
  },
  {
    id: "9",
    title: "Laughter Boost",
    description: "Watch a quick funny clip, or recall a hilarious memory. Science shows that even 30 seconds of laughter increases your brain's positive chemistry!",
    type: "sound",
    duration: 2,
    icon: "smile",
    moodBenefit: ["energized", "creative"],
  },
];

export const mockUser: User = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex@example.com",
  streak: 3,
  totalBreaks: 12,
  lastBreakDate: new Date(Date.now() - 86400000), // yesterday
};

export const mockBreakHistory: UserBreak[] = [
  {
    id: "break1",
    activityId: "2",
    startTime: new Date(Date.now() - 86400000),
    endTime: new Date(Date.now() - 86400000 + 300000),
    completed: true,
    moodBefore: "tired",
    moodAfter: "creative",
  },
  {
    id: "break2",
    activityId: "5",
    startTime: new Date(Date.now() - 172800000),
    endTime: new Date(Date.now() - 172800000 + 180000),
    completed: true,
    moodBefore: "stressed",
    moodAfter: "focused",
  },
  {
    id: "break3",
    activityId: "3",
    startTime: new Date(Date.now() - 259200000),
    endTime: new Date(Date.now() - 259200000 + 120000),
    completed: true,
    moodBefore: "distracted",
    moodAfter: "focused",
  },
];

export const moodOptions: { value: MoodType; label: string; icon: string }[] = [
  { value: "energized", label: "Energized", icon: "✨" },
  { value: "focused", label: "Focused", icon: "🎯" },
  { value: "tired", label: "Tired", icon: "😴" },
  { value: "distracted", label: "Distracted", icon: "🤔" },
  { value: "stressed", label: "Stressed", icon: "😣" },
  { value: "creative", label: "Creative", icon: "💡" },
];

export const getActivityById = (id: string): BreakActivity | undefined => {
  return mockActivities.find(activity => activity.id === id);
};

export const getBreaksByDate = (date: Date): UserBreak[] => {
  return mockBreakHistory.filter(breakItem => {
    const breakDate = new Date(breakItem.startTime);
    return (
      breakDate.getFullYear() === date.getFullYear() &&
      breakDate.getMonth() === date.getMonth() &&
      breakDate.getDate() === date.getDate()
    );
  });
};
