"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { generateModule, generateQuiz } from "@/app/actions/gemini";
import type { ModuleData } from "@/app/actions/gemini";
import type { QuizQuestion } from "@/components/QuizModal";
import QuizModal from "@/components/QuizModal";
import { Sparkles, BookOpen, Loader2, BrainCircuit, FlaskConical, Leaf, Droplets, Play, ExternalLink } from "lucide-react";

const missions = [
  {
    id: "nitrogen",
    topic: "Nitrogen Cycle",
    title: "🧪 Nitrogen Cycle",
    description: "Explore how nitrogen moves through soil, plants, and atmosphere.",
    icon: FlaskConical,
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "composting",
    topic: "Composting and Vermicomposting",
    title: "🪱 Composting Mastery",
    description: "Turn waste into black gold through organic decomposition.",
    icon: Leaf,
    color: "from-earth-500 to-emerald-600",
  },
  {
    id: "water",
    topic: "Water Conservation and Irrigation",
    title: "💧 Water Wisdom",
    description: "Smart irrigation techniques and water recycling systems.",
    icon: Droplets,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "solar",
    topic: "Solar Energy in Agriculture",
    title: "☀️ Solar Integration",
    description: "Harness solar power for sustainable campus farming.",
    icon: BrainCircuit,
    color: "from-amber-500 to-orange-600",
  },
];

// Extract YouTube video ID from various URL formats
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function AILab() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { user, completeModule } = useAuth();

  const [activeMission, setActiveMission] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [moduleData, setModuleData] = useState<ModuleData | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[] | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleMissionClick = async (mission: (typeof missions)[0]) => {
    setActiveMission(mission.id);
    setLoading(true);
    setModuleData(null);
    setQuizQuestions(null);
    setShowQuiz(false);

    try {
      const mod = await generateModule(mission.topic, user.role);
      setModuleData(mod);
      completeModule(mission.topic);

      const quiz = await generateQuiz(mod.content, user.role, mod.title);
      setQuizQuestions(quiz);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-lab" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-600 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            <Sparkles className="w-3 h-3 inline mr-1" />
            AI-Powered
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            The <span className="text-gradient-earth">AI Lab</span> Portal
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Click a mission and watch Gemini AI prepare a personalized lesson,
            video module, and quiz — tailored to your role and skill level.
          </p>
        </motion.div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {missions.map((mission, i) => {
            const Icon = mission.icon;
            const isActive = activeMission === mission.id;

            return (
              <motion.button
                key={mission.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => handleMissionClick(mission)}
                disabled={loading}
                className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 hover-lift ${
                  isActive
                    ? "border-earth-400 bg-earth-50 shadow-lg"
                    : "border-slate-100 bg-white hover:border-earth-200"
                } ${loading && !isActive ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mission.color} flex items-center justify-center mb-3 shadow-md`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">{mission.title}</h3>
                <p className="text-sm text-slate-500">{mission.description}</p>
                {isActive && loading && (
                  <div className="mt-3 flex items-center gap-2 text-earth-600 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AI is preparing your lesson…</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Generated Module */}
        {moduleData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-earth-50 to-white rounded-2xl border border-earth-200 p-6 sm:p-8 shadow-lg">
              <div className="flex items-center gap-2 text-earth-600 text-sm font-semibold mb-2">
                <BookOpen className="w-4 h-4" />
                AI-Generated Lesson
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {moduleData.title}
              </h3>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line mb-6 text-sm sm:text-base">
                {moduleData.content}
              </div>

              {/* Video Module — proper YouTube embed */}
              {moduleData.video_url && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-earth-600 text-sm font-semibold mb-3">
                    <Play className="w-4 h-4" />
                    Video Module
                  </div>

                  {(() => {
                    const videoId = extractYouTubeId(moduleData.video_url);

                    if (videoId) {
                      return (
                        <div className="rounded-xl overflow-hidden shadow-lg bg-black">
                          <div className="aspect-video">
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                              title={`Video: ${moduleData.title}`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      );
                    }

                    // Fallback: styled link to YouTube search
                    return (
                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(moduleData.video_search_query)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-red-600 to-red-700 p-8 text-white text-center hover:from-red-700 hover:to-red-800 transition-all group"
                      >
                        <Play className="w-16 h-16 mx-auto mb-3 opacity-90 group-hover:scale-110 transition-transform" />
                        <p className="font-bold text-lg mb-1">Watch on YouTube</p>
                        <p className="text-red-200 text-sm">{moduleData.video_search_query}</p>
                      </a>
                    );
                  })()}

                  {/* Search for more link */}
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(moduleData.video_search_query)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-earth-600 text-sm font-medium hover:text-earth-700 transition-colors mt-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Search more videos on YouTube
                  </a>
                </div>
              )}

              {/* Quiz Button */}
              {quizQuestions && (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="w-full sm:w-auto px-6 py-3 gradient-earth text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 justify-center"
                >
                  <Sparkles className="w-4 h-4" />
                  Take the Quiz ({quizQuestions.length} Questions)
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Quiz Modal */}
        {showQuiz && quizQuestions && moduleData && (
          <QuizModal
            questions={quizQuestions}
            moduleTitle={moduleData.title}
            missionId={activeMission || ""}
            onClose={() => setShowQuiz(false)}
          />
        )}
      </div>
    </section>
  );
}
