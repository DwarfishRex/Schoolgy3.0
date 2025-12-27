import React from "react";
import { Play, Gamepad2, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function GameCard({ game, index }) {
  const categoryColors = {
    action: "from-red-500 to-orange-500",
    puzzle: "from-blue-500 to-cyan-500",
    arcade: "from-yellow-500 to-pink-500",
    adventure: "from-green-500 to-emerald-500",
    sports: "from-orange-500 to-amber-500",
    strategy: "from-purple-500 to-indigo-500",
    other: "from-gray-500 to-slate-500"
  };

  const handleClick = () => {
    // Get the original filename from game ID
    const fileName = game.id.replace(/-/g, '');
    const encoded = encodeURIComponent(`${fileName}.html`);
    
    fetch(`https://cdn.jsdelivr.net/gh/bubbls/ugs-singlefile/UGS-Files/${encoded}?t=${Date.now()}`)
      .then(response => response.text())
      .then(text => {
        const newWin = window.open("about:blank", "_blank");
        if (newWin) {
          newWin.document.open();
          newWin.document.write(text);
          newWin.document.close();
        }
      })
      .catch(error => {
        console.error('Failed to load game:', error);
        alert('Failed to load game. Please try again.');
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div onClick={handleClick} className="cursor-pointer">
        <div className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/50 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-500" />
          
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden">
            <div className={`w-full h-full bg-gradient-to-br ${categoryColors[game.category] || categoryColors.other} flex items-center justify-center`}>
              <Gamepad2 className="w-16 h-16 text-white/50" />
            </div>
            
            {/* Play overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/50"
              >
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </motion.div>
            </div>

            {/* Featured badge */}
            {game.featured && (
              <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center gap-1 text-xs font-bold text-black">
                <Star className="w-3 h-3 fill-black" />
                Featured
              </div>
            )}

            {/* Category badge */}
            <div className={`absolute bottom-3 left-3 px-3 py-1 bg-gradient-to-r ${categoryColors[game.category] || categoryColors.other} rounded-full text-xs font-semibold text-white capitalize`}>
              {game.category || "Game"}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300 truncate">
              {game.title}
            </h3>
            {game.description && (
              <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                {game.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
