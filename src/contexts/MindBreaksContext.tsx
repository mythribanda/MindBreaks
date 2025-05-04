
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { BreakActivity, BreakActivityType, MoodType, User, UserBreak } from "../data/types";
import { mockActivities, mockBreakHistory, mockUser } from "../data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface MindBreaksContextType {
  user: User;
  activities: BreakActivity[];
  breakHistory: UserBreak[];
  currentBreak: UserBreak | null;
  currentMood: MoodType | null;
  isOnBreak: boolean;
  setCurrentMood: (mood: MoodType | null) => void;
  startBreak: (activityId: string) => void;
  completeBreak: (moodAfter: MoodType) => void;
  cancelBreak: () => void;
  getActivityById: (id: string) => BreakActivity | undefined;
  suggestedBreaks: BreakActivity[];
}

const MindBreaksContext = createContext<MindBreaksContextType | undefined>(undefined);

export const MindBreaksProvider = ({ children }: { children: ReactNode }) => {
  // Define interactive break activities
  const interactiveActivities: BreakActivity[] = [
    // YouTube Video Activities
    {
      id: "video1",
      title: "5-Minute Nature Meditation",
      description: "Immerse yourself in a calming 5-minute virtual walk through a beautiful forest with guided meditation",
      duration: 5,
      type: "video" as BreakActivityType,
      icon: "🌳",
      moodBenefit: ["stressed", "tired", "distracted"] as MoodType[],
      videoUrl: "https://www.youtube.com/embed/NG8MJN6QmZw"
    },
    {
      id: "video2",
      title: "Quick Desk Stretches",
      description: "Follow along with these simple desk stretches to relieve tension and boost your energy",
      duration: 3,
      type: "video" as BreakActivityType,
      icon: "🧘",
      moodBenefit: ["tired", "stressed"] as MoodType[],
      videoUrl: "https://www.youtube.com/embed/FIxYfGWmLhI"
    },
    {
      id: "video3",
      title: "Focus Music Flow",
      description: "Instrumental background music scientifically designed to enhance concentration and focus",
      duration: 5,
      type: "video" as BreakActivityType,
      icon: "🎵",
      moodBenefit: ["distracted", "focused"] as MoodType[],
      videoUrl: "https://www.youtube.com/embed/HSOtku1j600"
    },
    {
      id: "video4",
      title: "Creative Visualization Exercise",
      description: "A guided visualization exercise to stimulate creative thinking and inspiration",
      duration: 4,
      type: "video" as BreakActivityType,
      icon: "✨",
      moodBenefit: ["creative", "distracted"] as MoodType[],
      videoUrl: "https://www.youtube.com/embed/mzfH9OXK24Q"
    },
    {
      id: "video5",
      title: "1-Minute Energy Boost",
      description: "Quick, high-energy movements to get your blood flowing and energy levels up",
      duration: 1,
      type: "video" as BreakActivityType,
      icon: "⚡",
      moodBenefit: ["energized", "tired"] as MoodType[],
      videoUrl: "https://www.youtube.com/embed/V1Nl_0X7O8U"
    },
    
    // Interactive Game Activities
    {
      id: "game1",
      title: "Memory Match Challenge",
      description: "Test and improve your memory with this card-matching game - match all pairs as quickly as possible",
      duration: 3,
      type: "game" as BreakActivityType,
      icon: "🎮",
      moodBenefit: ["distracted", "tired", "focused"] as MoodType[],
      gameType: "memory"
    },
    {
      id: "game2",
      title: "Word Association Sprint",
      description: "Quick-fire word association game that boosts creative thinking and mental agility",
      duration: 2,
      type: "game" as BreakActivityType,
      icon: "🔤",
      moodBenefit: ["creative", "energized"] as MoodType[],
      gameType: "wordAssociation"
    },
    {
      id: "game3",
      title: "Focus Flow Challenge",
      description: "Track a moving target to enhance concentration and visual focus - great for resetting your attention",
      duration: 2,
      type: "game" as BreakActivityType,
      icon: "🎯",
      moodBenefit: ["focused", "distracted"] as MoodType[],
      gameType: "focusTarget"
    },
    {
      id: "game4",
      title: "Pattern Recognition Puzzle",
      description: "Identify the pattern and choose the next element in the sequence to boost logical thinking",
      duration: 3,
      type: "game" as BreakActivityType,
      icon: "🧩",
      moodBenefit: ["creative", "focused"] as MoodType[],
      gameType: "pattern"
    },
    {
      id: "game5",
      title: "Breathing Rhythm Game",
      description: "Follow the visual cues to establish a calming breathing pattern that reduces stress",
      duration: 3,
      type: "game" as BreakActivityType,
      icon: "😌",
      moodBenefit: ["stressed", "distracted"] as MoodType[],
      gameType: "breathing"
    },
    
    // Mindfulness Interactive Activities
    {
      id: "interactive1",
      title: "Guided Mindful Moment",
      description: "Interactive guided mindfulness session with responsive breathing visualization",
      duration: 3,
      type: "interactive" as BreakActivityType,
      icon: "🧠",
      moodBenefit: ["stressed", "distracted", "focused"] as MoodType[],
      interactiveType: "mindfulness"
    },
    {
      id: "interactive2",
      title: "Quick Gratitude Practice",
      description: "Interactive prompt-based gratitude exercise to shift perspective and boost mood",
      duration: 2,
      type: "interactive" as BreakActivityType,
      icon: "🙏",
      moodBenefit: ["stressed", "tired", "energized"] as MoodType[],
      interactiveType: "gratitude"
    },
    {
      id: "interactive3",
      title: "Visual Brain Refresh",
      description: "Follow dynamic visual patterns that reset visual processing pathways in your brain",
      duration: 2,
      type: "interactive" as BreakActivityType,
      icon: "👁️",
      moodBenefit: ["focused", "tired", "distracted"] as MoodType[],
      interactiveType: "visual"
    },
    {
      id: "interactive4",
      title: "Idea Generation Sprint",
      description: "Timed, prompt-based idea generation exercise to stimulate creative thinking",
      duration: 4,
      type: "interactive" as BreakActivityType,
      icon: "💡",
      moodBenefit: ["creative", "energized"] as MoodType[],
      interactiveType: "ideation"
    }
  ];

  const [user, setUser] = useState<User>(mockUser);
  const [activities, setActivities] = useState<BreakActivity[]>([...mockActivities, ...interactiveActivities]);
  const [breakHistory, setBreakHistory] = useState<UserBreak[]>(mockBreakHistory);
  const [currentBreak, setCurrentBreak] = useState<UserBreak | null>(null);
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [isOnBreak, setIsOnBreak] = useState<boolean>(false);
  const [suggestedBreaks, setSuggestedBreaks] = useState<BreakActivity[]>([]);
  const { toast } = useToast();

  // Generate suggested breaks based on current mood
  useEffect(() => {
    if (currentMood) {
      // Prioritize interactive activities based on mood
      const relevantActivities = activities.filter(activity => 
        activity.moodBenefit.includes(currentMood)
      );
      
      // Group activities by type for better distribution
      const videoActivities = relevantActivities.filter(a => a.type === "video");
      const gameActivities = relevantActivities.filter(a => a.type === "game");
      const interactiveActivities = relevantActivities.filter(a => a.type === "interactive");
      const otherActivities = relevantActivities.filter(a => 
        a.type !== "video" && a.type !== "game" && a.type !== "interactive"
      );
      
      // Create a balanced selection of suggested breaks
      let selectedActivities: BreakActivity[] = [];
      
      // Try to include at least one of each type if available
      if (videoActivities.length > 0) {
        selectedActivities.push(videoActivities[Math.floor(Math.random() * videoActivities.length)]);
      }
      
      if (gameActivities.length > 0) {
        selectedActivities.push(gameActivities[Math.floor(Math.random() * gameActivities.length)]);
      }
      
      if (interactiveActivities.length > 0) {
        selectedActivities.push(interactiveActivities[Math.floor(Math.random() * interactiveActivities.length)]);
      }
      
      // If we still need more activities to reach 3, add other types
      while (selectedActivities.length < 3 && otherActivities.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherActivities.length);
        selectedActivities.push(otherActivities[randomIndex]);
        otherActivities.splice(randomIndex, 1);
      }
      
      // If we still don't have 3 activities, add random ones from the overall pool
      while (selectedActivities.length < 3 && relevantActivities.length > selectedActivities.length) {
        const remainingActivities = relevantActivities.filter(
          act => !selectedActivities.find(selected => selected.id === act.id)
        );
        
        if (remainingActivities.length > 0) {
          const randomIndex = Math.floor(Math.random() * remainingActivities.length);
          selectedActivities.push(remainingActivities[randomIndex]);
        } else {
          break;
        }
      }
      
      // If we still don't have enough, add random activities regardless of mood
      if (selectedActivities.length < 3) {
        const randomActivities = activities
          .filter(act => !selectedActivities.find(selected => selected.id === act.id))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3 - selectedActivities.length);
        
        selectedActivities = [...selectedActivities, ...randomActivities];
      }
      
      setSuggestedBreaks(selectedActivities);
    } else {
      setSuggestedBreaks([]);
    }
  }, [currentMood, activities]);

  const startBreak = (activityId: string) => {
    if (!currentMood) {
      toast({
        title: "Please select your current mood first",
        description: "We need to know how you're feeling to tailor your break."
      });
      return;
    }

    const activity = getActivityById(activityId);
    if (!activity) {
      toast({
        title: "Activity not found",
        description: "The selected activity could not be found.",
        variant: "destructive"
      });
      return;
    }

    const newBreak: UserBreak = {
      id: `break${Date.now()}`,
      activityId,
      startTime: new Date(),
      endTime: new Date(Date.now() + activity.duration * 60 * 1000),
      completed: false,
      moodBefore: currentMood
    };

    setCurrentBreak(newBreak);
    setIsOnBreak(true);
    
    toast({
      title: `${activity.icon} Break started! ✨`,
      description: `Enjoy your ${activity.duration}-minute ${activity.title} break.`
    });
  };

  const completeBreak = (moodAfter: MoodType) => {
    if (!currentBreak) return;
    
    const completedBreak: UserBreak = {
      ...currentBreak,
      endTime: new Date(),
      completed: true,
      moodAfter
    };
    
    setBreakHistory([completedBreak, ...breakHistory]);
    setCurrentBreak(null);
    setIsOnBreak(false);
    setCurrentMood(moodAfter);
    
    // Update user stats
    setUser({
      ...user,
      totalBreaks: user.totalBreaks + 1,
      lastBreakDate: new Date(),
      streak: isToday(user.lastBreakDate) ? user.streak : user.streak + 1
    });
    
    const activity = getActivityById(completedBreak.activityId);
    
    toast({
      title: "Break completed! 🎉",
      description: `Great job taking time for yourself with ${activity?.title || "your break"}!`
    });
  };

  const cancelBreak = () => {
    setCurrentBreak(null);
    setIsOnBreak(false);
    
    toast({
      title: "Break cancelled 🛑",
      description: "You can start another break when you're ready."
    });
  };

  const getActivityById = (id: string): BreakActivity | undefined => {
    return activities.find(activity => activity.id === id);
  };

  // Helper function to check if a date is today
  const isToday = (date?: Date): boolean => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <MindBreaksContext.Provider
      value={{
        user,
        activities,
        breakHistory,
        currentBreak,
        currentMood,
        isOnBreak,
        setCurrentMood,
        startBreak,
        completeBreak,
        cancelBreak,
        getActivityById,
        suggestedBreaks
      }}
    >
      {children}
    </MindBreaksContext.Provider>
  );
};

export const useMindBreaks = () => {
  const context = useContext(MindBreaksContext);
  if (context === undefined) {
    throw new Error("useMindBreaks must be used within a MindBreaksProvider");
  }
  return context;
};
