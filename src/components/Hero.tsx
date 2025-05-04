
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

export const Hero = () => {
  const scrollToMood = () => {
    const element = document.getElementById('mood-selector');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-mindbreak-100/50 to-mindbreak-200/20 -z-10"></div>
      
      {/* Animated decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 left-10 w-64 h-64 bg-mindbreak-200/20 rounded-full blur-3xl -z-10"
      ></motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-mindbreak-300/10 rounded-full blur-3xl -z-10"
      ></motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 2.5, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-40 right-20 w-24 h-24 bg-mindbreak-400/10 rounded-full blur-2xl -z-10"
      ></motion.div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
        >
          Take a <span className="bg-gradient-to-r from-mindbreak-300 to-mindbreak-500 bg-clip-text text-transparent">Creative Break</span> <br/>
          Boost Your <span className="bg-gradient-to-r from-mindbreak-400 to-mindbreak-500 bg-clip-text text-transparent">Productivity</span> 
          <motion.span
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 10, scale: 1.2 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block ml-2"
          >
            ✨
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-mindbreak-600 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          MindBreaks helps you recharge with personalized activities 
          that refresh your brain and enhance your creativity. <span className="ml-1 inline-block animate-pulse">🧠</span><span className="ml-1 inline-block animate-bounce-gentle">💫</span>
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg bg-gradient-to-r from-mindbreak-300 to-mindbreak-500 hover:opacity-90 group relative overflow-hidden"
            onClick={scrollToMood}
          >
            <motion.span 
              animate={{ 
                rotate: [0, 20, 0, -20, 0],
                scale: [1, 1.2, 1, 1.2, 1] 
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="mr-2 text-xl"
            >
              ⚡
            </motion.span>
            <span className="relative z-10">Start Your Break</span>
            <motion.div 
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              initial={false}
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-6 text-lg border-2 hover:bg-mindbreak-100/20 hover:border-mindbreak-300 transition-all duration-300 group"
          >
            <span className="mr-2 text-xl group-hover:rotate-12 transition-transform">🔍</span>
            <span>Learn More</span>
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <Button
            variant="ghost"
            className="rounded-full p-3 hover:bg-mindbreak-100/20"
            onClick={scrollToMood}
          >
            <ArrowDown className="h-6 w-6 text-mindbreak-400 animate-bounce" />
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-center"
        >
          {[
            { icon: "⏱️", title: "5 min", subtitle: "Quick Breaks" },
            { icon: "📈", title: "28%", subtitle: "Productivity Boost" },
            { icon: "🎮", title: "5+", subtitle: "Activity Types" },
            { icon: "🤖", title: "AI", subtitle: "Personalized" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + (i * 0.1) }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
                transition: { type: "spring", stiffness: 400 }  
              }}
              className="p-5 bg-white/70 backdrop-blur-md rounded-2xl shadow-md border border-mindbreak-200/30 hover:border-mindbreak-300/50 transition-all duration-300"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                className="text-4xl font-bold mb-1"
              >
                {stat.icon}
              </motion.div>
              <p className="text-2xl font-bold bg-gradient-to-r from-mindbreak-300 to-mindbreak-500 bg-clip-text text-transparent">
                {stat.title}
              </p>
              <p className="text-sm text-mindbreak-600">{stat.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
