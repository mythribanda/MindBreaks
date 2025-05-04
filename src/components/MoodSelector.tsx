
import { useState } from "react";
import { MoodType } from "../data/types";
import { moodOptions } from "../data/mockData";
import { Button } from "@/components/ui/button";
import { useMindBreaks } from "@/contexts/MindBreaksContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const MoodSelector = () => {
  const { setCurrentMood, currentMood } = useMindBreaks();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(currentMood);
  const [hoverMood, setHoverMood] = useState<MoodType | null>(null);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setCurrentMood(mood);
  };

  // Create animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 300 }
    }
  };

  // Get emotion description based on mood
  const getMoodDescription = (mood: MoodType) => {
    switch (mood) {
      case "energized": 
        return "Full of energy and ready to channel it productively";
      case "focused": 
        return "In the zone and looking to maintain sharp concentration";
      case "creative": 
        return "Feeling inspired and flowing with new ideas";
      case "tired": 
        return "Low energy that needs a gentle boost";
      case "distracted": 
        return "Having trouble staying on task";
      case "stressed": 
        return "Feeling tense and needing to unwind";
      default: 
        return "Select how you're feeling right now";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-10 text-center"
      >
        <motion.h2
          className="text-4xl font-bold mb-3 text-center bg-gradient-to-r from-mindbreak-300 to-mindbreak-500 bg-clip-text text-transparent"
        >
          How are you feeling today? ✨
        </motion.h2>
        <p className="text-mindbreak-600 text-lg max-w-xl mx-auto">
          Your mood influences which activities will best refresh your mind
        </p>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 gap-6"
      >
        {moodOptions.map((mood, index) => (
          <motion.div
            key={mood.value}
            variants={itemVariants}
            whileHover="hover"
            custom={index}
            className="perspective-500"
          >
            <Button
              onClick={() => handleMoodSelect(mood.value)}
              onMouseEnter={() => setHoverMood(mood.value)}
              onMouseLeave={() => setHoverMood(null)}
              variant="outline"
              className={cn(
                "w-full h-36 flex flex-col items-center justify-center transition-all duration-500 relative overflow-hidden rounded-xl border-2",
                selectedMood === mood.value
                  ? "bg-gradient-to-br from-mindbreak-100/40 to-mindbreak-300/30 border-mindbreak-300 shadow-lg"
                  : "hover:bg-mindbreak-100/20 hover:border-mindbreak-300/50 hover:shadow-md"
              )}
            >
              <div 
                className={cn(
                  "text-6xl mb-3 transition-all duration-500",
                  selectedMood === mood.value && "animate-bounce-gentle"
                )}
              >
                {mood.icon}
              </div>
              <span className="font-medium text-xl">{mood.label}</span>
              
              <AnimatePresence>
                {selectedMood === mood.value && (
                  <>
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute bottom-2 right-3 text-xs text-mindbreak-400 font-medium px-2 py-1 bg-mindbreak-100 rounded-full"
                    >
                      ✓ Selected
                    </motion.span>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      <div className="absolute -inset-[40%] opacity-10 bg-mindbreak-300 rounded-full blur-3xl animate-pulse-soft"></div>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -bottom-12 left-0 right-0 text-sm text-mindbreak-600 font-medium px-2"
                    >
                      {getMoodDescription(mood.value)}
                    </motion.p>
                  </>
                )}
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-mindbreak-200/10 pointer-events-none"></div>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
