
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMindBreaks } from "@/contexts/MindBreaksContext";
import { format, isToday, isYesterday, isThisWeek } from "date-fns";
import { Brain, Pen, Music, BookOpen, Activity } from "lucide-react";
import { moodOptions } from "@/data/mockData";

export const BreakHistory = () => {
  const { breakHistory, getActivityById } = useMindBreaks();

  if (breakHistory.length === 0) {
    return (
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Break History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-6">
            You haven't taken any breaks yet. Start your first break to see your history.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getRelativeDate = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    if (isThisWeek(date)) return format(date, "EEEE");
    return format(date, "MMM d, yyyy");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "riddle":
        return <Brain className="h-4 w-4" />;
      case "doodle":
        return <Pen className="h-4 w-4" />;
      case "sound":
        return <Music className="h-4 w-4" />;
      case "creative":
        return <BookOpen className="h-4 w-4" />;
      case "stretch":
        return <Activity className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getMoodEmoji = (mood?: string) => {
    if (!mood) return "";
    const moodOption = moodOptions.find(option => option.value === mood);
    return moodOption ? moodOption.icon : "";
  };

  // Group breaks by date
  const breaksByDate = breakHistory.reduce((acc: Record<string, typeof breakHistory>, breakItem) => {
    const dateKey = getRelativeDate(new Date(breakItem.startTime));
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(breakItem);
    return acc;
  }, {});

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>Your Break History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(breaksByDate).map(([date, breaks]) => (
          <div key={date}>
            <h3 className="font-medium text-sm text-muted-foreground mb-2">{date}</h3>
            <div className="space-y-3">
              {breaks.map((breakItem) => {
                const activity = getActivityById(breakItem.activityId);
                if (!activity) return null;
                
                return (
                  <div 
                    key={breakItem.id} 
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        {getIcon(activity.type)}
                      </div>
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(breakItem.startTime), "h:mm a")} · {activity.duration} min
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span title={`Mood before: ${breakItem.moodBefore}`}>
                        {getMoodEmoji(breakItem.moodBefore)}
                      </span>
                      <span>→</span>
                      <span title={`Mood after: ${breakItem.moodAfter}`}>
                        {getMoodEmoji(breakItem.moodAfter)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
