"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Download, Share2, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AchievementModalProps {
  onClose: () => void;
}

// Confetti particle component
function ConfettiParticle({ delay, color, left }: { delay: number; color: string; left: string }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y: [0, 600],
        opacity: [1, 1, 0],
        rotate: [0, 360, 720],
        x: [0, Math.random() * 100 - 50],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: delay,
        ease: "easeIn",
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
      }}
      className="absolute top-0 w-2.5 h-2.5 rounded-sm"
      style={{ left, backgroundColor: color }}
    />
  );
}

const confettiColors = [
  "#22c55e", "#16a34a", "#f59e0b", "#eab308",
  "#3b82f6", "#8b5cf6", "#ef4444", "#ec4899",
  "#06b6d4", "#14b8a6",
];

export default function AchievementModal({ onClose }: AchievementModalProps) {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <ConfettiParticle
              key={i}
              delay={i * 0.1}
              color={confettiColors[i % confettiColors.length]}
              left={`${Math.random() * 100}%`}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 15, stiffness: 100 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
        >
          {/* Glow Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-8 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]" />

            {/* Animated star burst */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center opacity-20"
            >
              <div className="w-64 h-64 border-2 border-dashed border-white rounded-full" />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3, stiffness: 200 }}
              className="relative"
            >
              <div className="text-7xl mb-3">🦸</div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-3xl font-black text-white mb-1 drop-shadow-lg">
                  NET-ZERO HERO!
                </h2>
                <p className="text-amber-100 text-sm font-medium">
                  Maximum Level Achieved
                </p>
              </motion.div>
            </motion.div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Certificate */}
          <div className="p-6 sm:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="border-2 border-dashed border-amber-300 rounded-2xl p-6 bg-gradient-to-b from-amber-50 to-white text-center mb-6"
            >
              <div className="flex justify-center mb-3">
                <Award className="w-10 h-10 text-amber-500" />
              </div>
              <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-2">
                Certificate of Achievement
              </p>
              <p className="text-sm text-slate-500 mb-1">This certifies that</p>
              <p className="text-xl font-bold text-slate-800 mb-1">
                {user.name}
              </p>
              <p className="text-sm text-slate-500 mb-3">
                has successfully completed all levels of the AgriHeroes
                Regenerative Campus Program and earned the title of
              </p>
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-earth-600 to-emerald-500 mb-3">
                🌍 Net-Zero Hero 🌍
              </p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white rounded-lg p-2 shadow-sm border border-amber-100">
                  <p className="text-lg font-bold text-earth-600">{user.xp}</p>
                  <p className="text-[10px] text-slate-400 uppercase">Total XP</p>
                </div>
                <div className="bg-white rounded-lg p-2 shadow-sm border border-amber-100">
                  <p className="text-lg font-bold text-earth-600">{user.completedQuizzes.length}</p>
                  <p className="text-[10px] text-slate-400 uppercase">Quizzes</p>
                </div>
                <div className="bg-white rounded-lg p-2 shadow-sm border border-amber-100">
                  <p className="text-lg font-bold text-earth-600">6/6</p>
                  <p className="text-[10px] text-slate-400 uppercase">Levels</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-amber-200">
                <span>Solar Decathlon India 2025</span>
                <span>{today}</span>
              </div>
            </motion.div>

            {/* Achievement Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-6"
            >
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 text-center">
                Badges Unlocked
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: "🌱", label: "First Steps", color: "bg-green-50 border-green-200" },
                  { icon: "🧪", label: "Lab Expert", color: "bg-violet-50 border-violet-200" },
                  { icon: "💧", label: "Water Saver", color: "bg-blue-50 border-blue-200" },
                  { icon: "🦸", label: "Net-Zero", color: "bg-amber-50 border-amber-200" },
                ].map((badge, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
                    className={`${badge.color} border rounded-xl p-2 text-center`}
                  >
                    <span className="text-2xl">{badge.icon}</span>
                    <p className="text-[10px] font-semibold text-slate-600 mt-1">{badge.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-3"
            >
              <button
                onClick={() => {
                  // Trigger browser print for certificate
                  window.print();
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-earth-50 text-earth-600 rounded-xl font-semibold text-sm hover:bg-earth-100 transition-colors border border-earth-200"
              >
                <Download className="w-4 h-4" />
                Save Certificate
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "I'm a Net-Zero Hero! 🦸",
                      text: `I just reached Net-Zero Hero status on AgriHeroes with ${user.xp} XP! Join the regenerative campus movement. #AgriHeroes #SDI2025`,
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(
                      `🦸 I just reached Net-Zero Hero status on AgriHeroes with ${user.xp} XP! Join the regenerative campus movement. #AgriHeroes #SDI2025`
                    );
                    alert("Achievement copied to clipboard!");
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 gradient-earth text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <Share2 className="w-4 h-4" />
                Share Achievement
              </button>
            </motion.div>

            {/* Fun message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              You&apos;re now part of the Net-Zero generation!
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
