import React from "react";
import { motion } from "framer-motion";
import { Gamepad2, Zap, Puzzle, Joystick, Compass, Trophy, Brain, Grid3X3 } from "lucide-react";

const categories = [
  { id: "all", label: "All Games", icon: Grid3X3 },
  { id: "action", label: "Action", icon: Zap },
  { id: "puzzle", label: "Puzzle", icon: Puzzle },
  { id: "arcade", label: "Arcade", icon: Joystick },
  { id: "adventure", label: "Adventure", icon: Compass },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "strategy", label: "Strategy", icon: Brain },
];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selected === category.id;
        
        return (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(category.id)}
            className={`relative px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
              isSelected
                ? "text-white"
                : "text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="categoryBg"
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {category.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
