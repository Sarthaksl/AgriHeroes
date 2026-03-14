"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Trophy, Star, Lock, CheckCircle2, Crown } from "lucide-react";
import AchievementModal from "@/components/AchievementModal";

const skillNodes = [
  { id: "novice", title: "Novice Gardener", xpRequired: 0, icon: "🌱", description: "Begin your journey" },
  { id: "budding", title: "Budding Farmer", xpRequired: 200, icon: "🌿", description: "Learn the basics" },
  { id: "scientist", title: "Soil Scientist", xpRequired: 500, icon: "🔬", description: "Master soil chemistry" },
  { id: "guardian", title: "Ecosystem Guardian", xpRequired: 800, icon: "🛡️", description: "Protect biodiversity" },
  { id: "champion", title: "Sustainability Champion", xpRequired: 1200, icon: "🏆", description: "Lead the change" },
  { id: "hero", title: "Net-Zero Hero", xpRequired: 1800, icon: "🦸", description: "Achieve net-zero" },
];

const MAX_XP = skillNodes[skillNodes.length - 1].xpRequired;

export default function SkillTree() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { user } = useAuth();
  const [showAchievement, setShowAchievement] = useState(false);
  const [hasSeenAchievement, setHasSeenAchievement] = useState(false);
  const prevXPRef = useRef(user.xp);

  const isMaxLevel = user.xp >= MAX_XP;

  const currentIndex = skillNodes.findIndex((n) => n.xpRequired > user.xp) - 1;
  const activeIndex = currentIndex < 0 ? skillNodes.length - 1 : currentIndex;
  const progressPercent = Math.min(
    ((user.xp) / MAX_XP) * 100,
    100
  );

  // Auto-trigger achievement when user crosses 1800 XP
  useEffect(() => {
    if (user.xp >= MAX_XP && prevXPRef.current < MAX_XP && !hasSeenAchievement) {
      // Delay slightly so the XP bar animation completes first
      const timer = setTimeout(() => {
        setShowAchievement(true);
        setHasSeenAchievement(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
    prevXPRef.current = user.xp;
  }, [user.xp, hasSeenAchievement]);

  return (
    <section id="skill-tree" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-earth-100 text-earth-600 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            Growth Path
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Your <span className="text-gradient-earth">Skill Tree</span>
          </h2>
          <p className="text-lg text-slate-500">
            Earn XP by completing missions and quizzes to unlock new ranks.
          </p>
        </motion.div>

        {/* XP Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 mx-auto max-w-2xl"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-slate-700">{user.xp} XP</span>
            </div>
            {isMaxLevel ? (
              <span className="text-sm font-semibold text-amber-500 flex items-center gap-1">
                <Crown className="w-4 h-4" /> MAX LEVEL
              </span>
            ) : (
              <span className="text-sm text-slate-400">
                Next: {skillNodes[Math.min(activeIndex + 1, skillNodes.length - 1)]?.title}
              </span>
            )}
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${progressPercent}%` } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`h-full rounded-full relative ${
                isMaxLevel
                  ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"
                  : "gradient-earth"
              }`}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-earth-500 shadow-md" />
            </motion.div>
          </div>
        </motion.div>

        {/* Max Level Achievement Banner */}
        {isMaxLevel && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-10 mx-auto max-w-2xl"
          >
            <button
              onClick={() => setShowAchievement(true)}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-2 border-amber-200 shadow-md hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.span
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-3xl"
                  >
                    🦸
                  </motion.span>
                  <div className="text-left">
                    <p className="font-bold text-amber-800">Net-Zero Hero Achievement Unlocked!</p>
                    <p className="text-sm text-amber-600">Click to view your certificate & badges</p>
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold text-sm shadow-md group-hover:from-amber-600 group-hover:to-orange-600"
                >
                  View 🎉
                </motion.div>
              </div>
            </button>
          </motion.div>
        )}

        {/* Skill Nodes */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 hidden lg:block rounded-full" />
          <motion.div
            className={`absolute top-1/2 left-0 h-1 -translate-y-1/2 hidden lg:block rounded-full ${
              isMaxLevel
                ? "bg-gradient-to-r from-green-500 via-amber-500 to-orange-500"
                : "gradient-earth"
            }`}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${progressPercent}%` } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-0">
            {skillNodes.map((node, index) => {
              const isUnlocked = user.xp >= node.xpRequired;
              const isCurrent = index === activeIndex;
              const isFinalNode = index === skillNodes.length - 1;
              const isHero = isFinalNode && isUnlocked;

              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center relative z-10"
                >
                  {/* Node Circle */}
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-3 transition-all duration-300 shadow-md ${
                      isHero
                        ? "bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 text-white ring-4 ring-amber-200 scale-110"
                        : isCurrent
                        ? "gradient-earth text-white ring-4 ring-earth-200 scale-110"
                        : isUnlocked
                        ? "bg-earth-100 border-2 border-earth-300"
                        : "bg-slate-100 border-2 border-slate-200 opacity-50"
                    }`}
                  >
                    {isUnlocked ? (
                      node.icon
                    ) : (
                      <Lock className="w-6 h-6 text-slate-400" />
                    )}
                  </div>

                  {/* Status Icon */}
                  {isHero && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Crown className="w-5 h-5 text-amber-500 absolute -top-1 -right-1 bg-white rounded-full" />
                    </motion.div>
                  )}
                  {isUnlocked && !isCurrent && !isHero && (
                    <CheckCircle2 className="w-5 h-5 text-earth-500 absolute -top-1 -right-1 bg-white rounded-full" />
                  )}
                  {isCurrent && !isHero && (
                    <Trophy className="w-5 h-5 text-yellow-500 absolute -top-1 -right-1 bg-white rounded-full" />
                  )}

                  {/* Label */}
                  <h4
                    className={`text-sm font-bold text-center mb-0.5 ${
                      isHero
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500"
                        : isUnlocked ? "text-slate-700" : "text-slate-400"
                    }`}
                  >
                    {node.title}
                  </h4>
                  <p className="text-xs text-slate-400 text-center">
                    {node.description}
                  </p>
                  <span
                    className={`text-xs mt-1 font-semibold ${
                      isHero
                        ? "text-amber-500"
                        : isUnlocked ? "text-earth-500" : "text-slate-300"
                    }`}
                  >
                    {node.xpRequired} XP
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Achievement Modal */}
      {showAchievement && (
        <AchievementModal onClose={() => setShowAchievement(false)} />
      )}
    </section>
  );
}
