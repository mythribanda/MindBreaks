
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { MoodSelector } from "@/components/MoodSelector";
import { BreakSuggestions } from "@/components/BreakSuggestions";
import { BreakTimer } from "@/components/BreakTimer";
import { DashboardStats } from "@/components/DashboardStats";
import { BreakHistory } from "@/components/BreakHistory";
import { MindBreaksProvider, useMindBreaks } from "@/contexts/MindBreaksContext";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const MainContent = () => {
  const { user, isOnBreak, currentMood } = useMindBreaks();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <Header user={user} />
      
      {!isOnBreak ? (
        <>
          <Hero />
          
          <motion.section 
            id="mood-selector" 
            className="py-16 bg-gradient-to-b from-transparent to-mindbreak-100/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <MoodSelector />
            </div>
          </motion.section>
          
          {currentMood && (
            <motion.section 
              className="py-16 bg-gradient-to-b from-mindbreak-100/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <BreakSuggestions />
              </div>
            </motion.section>
          )}
          
          {user.totalBreaks > 0 && (
            <>
              <Separator className="my-8 max-w-5xl mx-auto opacity-50" />
              
              <motion.section 
                className="py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <DashboardStats />
                </div>
              </motion.section>
              
              <motion.section 
                className="py-12 bg-gradient-to-b from-transparent to-mindbreak-100/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <BreakHistory />
                </div>
              </motion.section>
            </>
          )}
        </>
      ) : (
        <motion.section 
          className="py-16 flex-grow flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <BreakTimer />
          </div>
        </motion.section>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-auto"
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

const Index = () => {
  return (
    <MindBreaksProvider>
      <MainContent />
    </MindBreaksProvider>
  );
};

export default Index;
