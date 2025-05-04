
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useMindBreaks } from "@/contexts/MindBreaksContext";
import { Progress } from "@/components/ui/progress";
import { moodOptions } from "@/data/mockData";
import { MoodType } from "@/data/types";
import { Clock, Check, Play, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BreakTimer = () => {
  const { currentBreak, getActivityById, completeBreak, cancelBreak } = useMindBreaks();
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(100);
  const [postBreakMood, setPostBreakMood] = useState<MoodType | null>(null);
  const [showMoodSelector, setShowMoodSelector] = useState(false);

  const activity = currentBreak ? getActivityById(currentBreak.activityId) : null;
  const totalTime = activity ? activity.duration * 60 : 0;

  useEffect(() => {
    if (!currentBreak || !activity) return;

    const endTime = new Date(currentBreak.endTime).getTime();
    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, endTime - now);
      setTimeLeft(Math.floor(diff / 1000));
      
      const elapsedSeconds = totalTime - Math.floor(diff / 1000);
      const progressValue = Math.max(0, 100 - (elapsedSeconds / totalTime) * 100);
      setProgress(progressValue);
      
      // When timer completes
      if (diff <= 0) {
        clearInterval(timerInterval);
        setShowMoodSelector(true);
      }
    };

    updateTimer(); // Call immediately
    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, [currentBreak, activity, totalTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleFinishBreak = () => {
    if (postBreakMood) {
      completeBreak(postBreakMood);
    }
  };

  if (!currentBreak || !activity) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto"
    >
      <div className="relative p-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-mindbreak-200/30">
        <div className="absolute inset-0 bg-gradient-to-br from-mindbreak-100/30 to-transparent rounded-3xl -z-10"></div>
        
        <motion.div 
          className="absolute top-0 right-0 w-64 h-64 bg-mindbreak-200/20 rounded-full -mr-32 -mt-32 blur-3xl -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute bottom-0 left-0 w-64 h-64 bg-mindbreak-300/10 rounded-full -ml-32 -mb-32 blur-3xl -z-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{
            duration: 10,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {!showMoodSelector ? (
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="text-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-mindbreak-200 to-mindbreak-400 flex items-center justify-center"
                animate={{ 
                  boxShadow: ["0 0 0 rgba(155, 135, 245, 0.3)", "0 0 30px rgba(155, 135, 245, 0.7)", "0 0 0 rgba(155, 135, 245, 0.3)"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Play className="h-10 w-10 text-white ml-1" />
              </motion.div>
              
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-mindbreak-300 to-mindbreak-500 bg-clip-text text-transparent">{activity.title}</h2>
              <p className="text-mindbreak-600">{activity.description}</p>
            </motion.div>
            
            <motion.div 
              className="space-y-3"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-mindbreak-600">Time Remaining</span>
                <motion.div 
                  className="flex items-center gap-2 bg-mindbreak-100/80 px-3 py-1 rounded-full"
                  animate={{
                    scale: timeLeft < 30 ? [1, 1.05, 1] : 1
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: timeLeft < 30 ? Infinity : 0,
                    repeatDelay: 0.5
                  }}
                >
                  <Clock className="h-4 w-4 text-mindbreak-500" />
                  <span className="font-mono font-bold text-mindbreak-500">{formatTime(timeLeft)}</span>
                </motion.div>
              </div>
              
              <div className="relative pt-1">
                <Progress 
                  value={progress} 
                  className="h-3 rounded-full overflow-hidden bg-mindbreak-100"
                />
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shine 2s infinite"
                  }}
                />
              </div>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <Button 
                variant="outline" 
                className="w-full py-6 border-2 border-mindbreak-200 hover:bg-mindbreak-100/50 hover:border-mindbreak-300 transition-colors duration-300 text-mindbreak-600" 
                onClick={() => setShowMoodSelector(true)}
              >
                <span className="mr-2">✓</span>
                I've Completed This Activity
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.div 
              className="text-center"
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-mindbreak-300 to-mindbreak-500 bg-clip-text text-transparent">How do you feel now? 😊</h2>
              <p className="text-mindbreak-600">Select your current mood after the break</p>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    when: "beforeChildren",
                    staggerChildren: 0.05
                  }
                }
              }}
              className="grid grid-cols-3 gap-3"
            >
              {moodOptions.map((mood) => (
                <motion.div
                  key={mood.value}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Button
                    onClick={() => setPostBreakMood(mood.value)}
                    variant="outline"
                    className={cn(
                      "h-24 w-full flex flex-col items-center justify-center transition-all duration-300",
                      postBreakMood === mood.value 
                        ? "bg-gradient-to-br from-mindbreak-100/60 to-mindbreak-200/30 border-mindbreak-300 shadow-md" 
                        : "hover:bg-mindbreak-100/20 hover:border-mindbreak-300/50"
                    )}
                  >
                    <span className={cn(
                      "text-3xl mb-1",
                      postBreakMood === mood.value && "animate-bounce-gentle"
                    )}>
                      {mood.icon}
                    </span>
                    <span className="text-sm">{mood.label}</span>
                    
                    {postBreakMood === mood.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2"
                      >
                        <Check className="h-4 w-4 text-mindbreak-400" />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex gap-4"
            >
              <Button 
                variant="outline" 
                className="flex-1 py-6 border-2 border-mindbreak-200/50 hover:bg-mindbreak-100/30 hover:border-mindbreak-200 transition-colors duration-300" 
                onClick={cancelBreak}
              >
                <XCircle className="h-5 w-5 mr-2 text-mindbreak-500" />
                <span>Cancel</span>
              </Button>
              
              <Button 
                className="flex-1 py-6 bg-gradient-to-r from-mindbreak-300 to-mindbreak-400 hover:from-mindbreak-400 hover:to-mindbreak-500 relative overflow-hidden" 
                onClick={handleFinishBreak}
                disabled={!postBreakMood}
              >
                <Check className="h-5 w-5 mr-2" />
                <span className="relative z-10">Complete Break</span>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                  initial={false}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  style={{ display: !postBreakMood ? "none" : "block" }}
                />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
