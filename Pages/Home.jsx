import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Sparkles, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import GameGrid from "@/components/games/GameGrid";
import { gamesData } from "@/components/games/GamesData";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const games = gamesData;
  const isLoading = false;

  const featuredGames = games.filter((game) => game.featured);
  
  const filteredGames = games.filter((game) => {
    const matchesSearch = !searchQuery || 
      game.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Background image */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694f001701b05e6e8a040bed/fd72cb178_wp10850705-topographic-phone-wallpapers.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/40 to-[#0a0a0f]/80" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Your Ultimate Game Hub</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 mb-6" style={{ fontFamily: "'UnifrakturMaguntia', cursive" }}>
                Schoolgy <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">3.0</span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-400 max-w-2xl mx-auto" style={{ fontFamily: "'Amatic SC', cursive" }}>
                Work First, Games Second.
              </p>
            </motion.div>

            {/* Featured Games */}
            {featuredGames.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-2xl font-bold text-white">Featured Games</h2>
                </div>
                <GameGrid games={featuredGames} isLoading={isLoading} />
              </motion.div>
            )}

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12 flex justify-center"
            >
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search games..."
                  className="pl-12 pr-4 py-6 text-lg bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl w-full"
                />
              </div>
            </motion.div>

            {/* Games Grid */}
            <GameGrid games={filteredGames} isLoading={isLoading} />
          </div>
        </section>
      </div>
    </div>
  );
}
