
export const Footer = () => {
  return (
    <footer className="bg-white border-t py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-mindbreak-300 to-mindbreak-400 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <span className="text-lg font-bold gradient-text">MindBreaks</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Take a break, refresh your mind
            </p>
          </div>
          
          <div className="flex gap-8">
            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="space-y-1 text-sm">
                <li>Creative Breaks</li>
                <li>Mood Tracking</li>
                <li>Personalization</li>
                <li>Team Dashboard</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Resources</h3>
              <ul className="space-y-1 text-sm">
                <li>Help Center</li>
                <li>Research</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 MindBreaks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
