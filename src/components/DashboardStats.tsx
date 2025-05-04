
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMindBreaks } from "@/contexts/MindBreaksContext";
import { CalendarDays, Clock, Award, Activity, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export const DashboardStats = () => {
  const { user, breakHistory } = useMindBreaks();

  // Get today's breaks
  const today = new Date();
  const todayBreaks = breakHistory.filter(breakItem => {
    const breakDate = new Date(breakItem.startTime);
    return (
      breakDate.getFullYear() === today.getFullYear() &&
      breakDate.getMonth() === today.getMonth() &&
      breakDate.getDate() === today.getDate()
    );
  });

  // Calculate total break time
  const totalBreakTimeMinutes = breakHistory.reduce((total, breakItem) => {
    const duration = (new Date(breakItem.endTime).getTime() - new Date(breakItem.startTime).getTime()) / 60000;
    return total + duration;
  }, 0);

  // Format the total time in hours and minutes
  const formatTotalTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const stats = [
    {
      title: "Current Streak",
      value: `${user.streak} days`,
      icon: <Award className="h-5 w-5 text-amber-500" />,
      description: `Last break: ${user.lastBreakDate ? format(new Date(user.lastBreakDate), 'MMM d') : 'Never'}`,
      color: "from-amber-500 to-orange-600",
      emoji: "🔥",
      animate: user.streak > 2
    },
    {
      title: "Total Breaks",
      value: user.totalBreaks.toString(),
      icon: <Activity className="h-5 w-5 text-emerald-500" />,
      description: "Across your entire journey",
      color: "from-emerald-500 to-teal-600",
      emoji: "🌱",
      animate: false
    },
    {
      title: "Today's Breaks",
      value: todayBreaks.length.toString(),
      icon: <CalendarDays className="h-5 w-5 text-blue-500" />,
      description: todayBreaks.length > 0 ? `Last at ${format(new Date(todayBreaks[0].startTime), 'h:mm a')}` : 'No breaks today',
      color: "from-blue-500 to-indigo-600",
      emoji: "📅",
      animate: todayBreaks.length > 2
    },
    {
      title: "Total Break Time",
      value: formatTotalTime(totalBreakTimeMinutes),
      icon: <Clock className="h-5 w-5 text-purple-500" />,
      description: "Invested in your wellbeing",
      color: "from-purple-500 to-fuchsia-600",
      emoji: "⏱️",
      animate: totalBreakTimeMinutes > 60
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-mindbreak-300 to-mindbreak-500 bg-clip-text text-transparent">
          Your MindBreaks Journey
        </h2>
        <p className="text-mindbreak-600 mt-2">Track your progress and see the impact of your breaks</p>
      </motion.div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {stats.map((stat, index) => (
          <motion.div key={stat.title} variants={item} custom={index}>
            <Card className="overflow-hidden border-mindbreak-200/50 hover:border-mindbreak-300 transition-all duration-500 bg-white/80 backdrop-blur-sm h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-mindbreak-600 flex items-center gap-2">
                    {stat.icon}
                    {stat.title}
                  </CardTitle>
                  <motion.div
                    animate={stat.animate ? { 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0, -10, 0]
                    } : {}}
                    transition={{ 
                      duration: 1.5,
                      repeat: stat.animate ? Infinity : 0,
                      repeatDelay: 3
                    }}
                    className="text-xl"
                  >
                    {stat.emoji}
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(to right, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})` }}>
                    {stat.value}
                  </div>
                  <CardDescription className="text-xs mt-1">
                    {stat.description}
                  </CardDescription>
                  
                  <motion.div
                    className="absolute bottom-0 h-1 rounded-full bg-gradient-to-r"
                    style={{ backgroundImage: `linear-gradient(to right, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})`, width: "40%" }}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "40%", opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex justify-center"
      >
        <Card className="border-mindbreak-200/50 hover:border-mindbreak-300 transition-all duration-300 bg-white/60 backdrop-blur-sm max-w-md w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-mindbreak-600 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-mindbreak-400" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-16 flex items-end justify-between gap-1">
              {[...Array(7)].map((_, i) => {
                const height = Math.floor(Math.random() * 70) + 30;
                
                return (
                  <motion.div 
                    key={`bar-${i}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="flex-1 bg-gradient-to-t from-mindbreak-300 to-mindbreak-400 rounded-t-sm"
                  />
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-mindbreak-600 mt-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
