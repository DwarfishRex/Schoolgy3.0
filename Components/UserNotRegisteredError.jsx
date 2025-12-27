import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Maximize2, 
  Minimize2, 
  Share2,
  Gamepad2,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { gamesData } from "@/components/games/GamesData";

export default function Play() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get("id");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef(null);

  const game = gamesData.find(g => g.id === gameId);
  const isLoading = false;
  const error = !game;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const shareGame = async () => {
    if (navigator.share) {
      await navigator.share({
        title: game?.title,
        text: `Play ${game?.title} on GameVerse!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading game...</p>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Game Not Found</h1>
          <p className="text-gray-400 mb-6">The game you're looking for doesn't exist or has been removed.</p>
          <Link to={createPageUrl("Home")}>
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-20 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to={createPageUrl("Home")}>
                  <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                </Link>
                <div className="hidden sm:block h-6 w-px bg-white/10" />
                <div className="hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    <Gamepad2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-white">{game.title}</h1>
                    <p className="text-sm text-gray-400 capitalize">{game.category || "Game"}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={shareGame}
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={toggleFullscreen}
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5" />
                  ) : (
                    <Maximize2 className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Game Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            ref={gameContainerRef}
            className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            style={{ aspectRatio: "16/9" }}
          >
            {/* Embed the game */}
            <div
              className="absolute inset-0 w-full h-full"
              dangerouslySetInnerHTML={{ __html: game.embed_code }}
            />
          </motion.div>

          {/* Game Info */}
          {game.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-6 p-6 bg-white/5 rounded-2xl border border-white/10"
            >
              <h2 className="text-lg font-semibold text-white mb-2">About this game</h2>
              <p className="text-gray-400">{game.description}</p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
