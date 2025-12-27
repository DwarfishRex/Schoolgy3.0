import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gamepad2, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function AddGameForm({ isOpen, onClose, onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    embed_code: "",
    thumbnail_url: "",
    category: "other",
    featured: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      embed_code: "",
      thumbnail_url: "",
      category: "other",
      featured: false
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] overflow-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-white/10 shadow-2xl z-50"
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900/90 backdrop-blur-xl p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Add New Game</h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">Game Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter game title"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the game"
                  rows={3}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="embed_code" className="text-gray-300">
                  HTML Embed Code *
                  <span className="text-gray-500 font-normal ml-2 text-xs">
                    (iframe or HTML code)
                  </span>
                </Label>
                <Textarea
                  id="embed_code"
                  value={formData.embed_code}
                  onChange={(e) => setFormData({ ...formData, embed_code: e.target.value })}
                  placeholder='<iframe src="https://..." width="100%" height="100%"></iframe>'
                  required
                  rows={4}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 font-mono text-sm resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail_url" className="text-gray-300">Thumbnail URL</Label>
                <Input
                  id="thumbnail_url"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500/20">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/10">
                      <SelectItem value="action">Action</SelectItem>
                      <SelectItem value="puzzle">Puzzle</SelectItem>
                      <SelectItem value="arcade">Arcade</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="strategy">Strategy</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <Label htmlFor="featured" className="text-gray-300 cursor-pointer">Featured Game</Label>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.title || !formData.embed_code}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0"
                >
                  {isSubmitting ? "Adding..." : "Add Game"}
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
