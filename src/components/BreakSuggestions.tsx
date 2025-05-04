
import { useMindBreaks } from "@/contexts/MindBreaksContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Brain, Gamepad, Music, Pen, Play, Sparkles, Video, Youtube } from "lucide-react";
import { motion } from "framer-motion";

export const BreakSuggestions = () => {
  const { suggestedBreaks, startBreak, currentMood } = useMindBreaks();

  if (!currentMood || suggestedBreaks.length === 0) {
    return null;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "riddle":
        return <Brain className="h-6 w-6" />;
      case "doodle":
        return <Pen className="h-6 w-6" />;
      case "sound":
        return <Music className="h-6 w-6" />;
      case "creative":
        return <Sparkles className="h-6 w-6" />;
      case "stretch":
        return <Activity className="h-6 w-6" />;
      case "video":
        return <Youtube className="h-6 w-6" />;
      case "game":
        return <Gamepad className="h-6 w-6" />;
      case "interactive":
        return <Play className="h-6 w-6" />;
      case "virtual":
        return <Video className="h-6 w-6" />;
      default:
        return <Sparkles className="h-6 w-6" />;
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "energized":
        return "⚡";
      case "focused":
        return "🎯";
      case "creative":
        return "✨";
      case "tired":
        return "😴";
      case "distracted":
        return "🧠";
      case "stressed":
        return "🧘";
      default:
        return "✨";
    }
  };

  const getActivityContent = (activity: any) => {
    switch (activity.type) {
      case "video":
        return (
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-mindbreak-200/30 to-mindbreak-300/10 aspect-video mb-4 group">
            {activity.videoUrl ? (
              <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    className="p-4 bg-mindbreak-400/20 rounded-full backdrop-blur-sm"
                  >
                    <Youtube className="h-10 w-10 text-red-500" />
                  </motion.div>
                  <span className="absolute text-sm mt-20 font-medium px-3 py-1 bg-mindbreak-500/10 backdrop-blur-sm rounded-full text-mindbreak-500 border border-mindbreak-200/30">
                    🎬 YouTube Video
                  </span>
                </div>
                <iframe 
                  className="absolute inset-0 w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  src={activity.videoUrl}
                  title={activity.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500">
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  className="p-4 bg-mindbreak-400/20 rounded-full backdrop-blur-sm"
                >
                  <Youtube className="h-10 w-10 text-red-500" />
                </motion.div>
                <span className="absolute text-sm mt-20 font-medium px-3 py-1 bg-mindbreak-500/10 backdrop-blur-sm rounded-full text-mindbreak-500 border border-mindbreak-200/30">
                  🎬 Video Break
                </span>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-mindbreak-500/20 to-transparent"
                />
              </div>
            )}
          </div>
        );
      case "game":
        return (
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-mindbreak-200/30 to-mindbreak-300/10 aspect-video mb-4 group">
            <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500">
              <motion.div 
                whileHover={{ scale: 1.2, rotate: -15 }}
                className="p-4 bg-mindbreak-400/20 rounded-full backdrop-blur-sm"
              >
                <Gamepad className="h-10 w-10 text-mindbreak-400" />
              </motion.div>
              <span className="absolute text-sm mt-20 font-medium px-3 py-1 bg-mindbreak-500/10 backdrop-blur-sm rounded-full text-mindbreak-500 border border-mindbreak-200/30">
                {activity.gameType === 'memory' && '🎮 Memory Game'}
                {activity.gameType === 'wordAssociation' && '🔤 Word Game'}
                {activity.gameType === 'focusTarget' && '🎯 Focus Game'}
                {activity.gameType === 'pattern' && '🧩 Pattern Game'}
                {activity.gameType === 'breathing' && '😌 Breathing Game'}
                {!activity.gameType && '🎮 Interactive Game'}
              </span>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-mindbreak-500/20 to-transparent"
              />
            </div>
          </div>
        );
      case "interactive":
        return (
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-mindbreak-200/30 to-mindbreak-300/10 aspect-video mb-4 group">
            <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500">
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 15 }}
                className="p-4 bg-mindbreak-400/20 rounded-full backdrop-blur-sm"
              >
                <Play className="h-10 w-10 text-mindbreak-400" />
              </motion.div>
              <span className="absolute text-sm mt-20 font-medium px-3 py-1 bg-mindbreak-500/10 backdrop-blur-sm rounded-full text-mindbreak-500 border border-mindbreak-200/30">
                {activity.interactiveType === 'mindfulness' && '🧠 Mindfulness Exercise'}
                {activity.interactiveType === 'gratitude' && '🙏 Gratitude Practice'}
                {activity.interactiveType === 'visual' && '👁️ Visual Exercise'}
                {activity.interactiveType === 'ideation' && '💡 Ideation Sprint'}
                {!activity.interactiveType && '🚀 Interactive Experience'}
              </span>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-mindbreak-500/20 to-transparent"
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-mindbreak-200/30 to-mindbreak-300/10 aspect-video mb-4 group">
            <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500">
              <motion.div 
                whileHover={{ scale: 1.2 }}
                className="p-4 bg-mindbreak-400/20 rounded-full backdrop-blur-sm"
              >
                <Video className="h-10 w-10 text-mindbreak-400" />
              </motion.div>
              <span className="absolute text-sm mt-20 font-medium px-3 py-1 bg-mindbreak-500/10 backdrop-blur-sm rounded-full text-mindbreak-500 border border-mindbreak-200/30">
                🌈 Visual Experience
              </span>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-mindbreak-500/20 to-transparent"
              />
            </div>
          </div>
        );
    }
  };

  // Animation variants
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
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <motion.h2 
          className="text-3xl font-bold mb-3 bg-gradient-to-r from-mindbreak-300 to-mindbreak-500 bg-clip-text text-transparent"
        >
          <motion.span 
            animate={{ rotate: [0, 10, 0, -10, 0] }} 
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="inline-block"
          >
            ✨
          </motion.span>
          {' '}Personalized Activities for You{' '}
          <motion.span 
            animate={{ rotate: [0, -10, 0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="inline-block"
          >
            ✨
          </motion.span>
        </motion.h2>
        <p className="text-mindbreak-600 max-w-xl mx-auto">
          Based on your current mood: <span className="font-medium">{getMoodEmoji(currentMood)} {currentMood}</span>
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {suggestedBreaks.map((activity, index) => (
          <motion.div
            key={activity.id}
            variants={itemVariants}
            custom={index}
            whileHover={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 400 }
            }}
            className="h-full"
          >
            <Card className="overflow-hidden border-mindbreak-200/50 hover:border-mindbreak-300 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md h-full flex flex-col">
              <CardHeader className="relative p-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-mindbreak-300 to-mindbreak-400 opacity-90 z-0"></div>
                <div className="relative z-10 p-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-white">{activity.title}</CardTitle>
                    <motion.div 
                      whileHover={{ rotate: 15, scale: 1.1 }} 
                      className="p-2 bg-white/20 rounded-full"
                    >
                      {getIcon(activity.type)}
                    </motion.div>
                  </div>
                  <CardDescription className="text-white/90 mt-2">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="inline-block bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium">
                        ⏱️ {activity.duration} min
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {activity.moodBenefit.map((mood, i) => (
                        <motion.span 
                          key={mood} 
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium"
                        >
                          {getMoodEmoji(mood)} {mood}
                        </motion.span>
                      ))}
                    </div>
                  </CardDescription>
                </div>
                <motion.div 
                  className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.2, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                {getActivityContent(activity)}
                <p className="text-sm text-mindbreak-600 line-clamp-2">{activity.description}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button 
                  className="w-full py-5 bg-gradient-to-r from-mindbreak-300 to-mindbreak-400 hover:from-mindbreak-400 hover:to-mindbreak-500 transition-all duration-300 group relative overflow-hidden" 
                  onClick={() => startBreak(activity.id)}
                >
                  <span className="mr-2 text-xl group-hover:scale-125 transition-transform duration-300">
                    {activity.icon || "⚡"}
                  </span>
                  <span className="relative z-10">Start This Break</span>
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    initial={false}
                    animate={{ scale: [0.9, 1.1, 0.9] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
