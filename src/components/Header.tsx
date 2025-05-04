
import { User } from "@/data/types";

interface HeaderProps {
  user?: User;
}

export const Header = ({ user }: HeaderProps) => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm py-4 px-6 shadow-sm border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-mindbreak-300 to-mindbreak-400 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <h1 className="text-xl font-bold gradient-text">MindBreaks</h1>
        </div>
        
        {user && (
          <div className="flex items-center gap-2">
            <span className="text-sm hidden md:inline">Hello, {user.name}</span>
            <div className="w-8 h-8 rounded-full bg-mindbreak-600 text-white flex items-center justify-center font-medium text-sm">
              {user.name.charAt(0)}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
