import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Gamepad2, Home, Play } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Navigation Menu */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to={createPageUrl("Home")} className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors">
              <Gamepad2 className="w-6 h-6" />
              <span className="font-bold text-lg" style={{ fontFamily: "'UnifrakturMaguntia', cursive" }}>Schoolgy 3.0</span>
            </Link>
            
            <div className="flex items-center gap-6">
              <Link 
                to={createPageUrl("Home")} 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPageName === "Home" 
                    ? "bg-purple-500/20 text-purple-400" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Amatic+SC:wght@700&family=UnifrakturMaguntia&display=swap');
        
        :root {
          --background: 240 10% 4%;
          --foreground: 0 0% 98%;
          --card: 240 10% 4%;
          --card-foreground: 0 0% 98%;
          --popover: 240 10% 4%;
          --popover-foreground: 0 0% 98%;
          --primary: 270 91% 65%;
          --primary-foreground: 0 0% 100%;
          --secondary: 240 4% 16%;
          --secondary-foreground: 0 0% 98%;
          --muted: 240 4% 16%;
          --muted-foreground: 240 5% 65%;
          --accent: 240 4% 16%;
          --accent-foreground: 0 0% 98%;
          --destructive: 0 63% 31%;
          --destructive-foreground: 0 0% 98%;
          --border: 240 4% 16%;
          --input: 240 4% 16%;
          --ring: 270 91% 65%;
        }
        
        body {
          background-color: #0a0a0f;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
      {children}
    </div>
  );
}
