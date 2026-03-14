"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, XCircle, Award } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

interface QuizModalProps {
  questions: QuizQuestion[];
  moduleTitle: string;
  missionId: string;
  onClose: () => void;
}

export default function QuizModal({ questions, moduleTitle, missionId, onClose }: QuizModalProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const { completeQuiz } = useAuth();

  const q = questions[currentQ];

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    if (index === q.answerIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      const finalScore = score + (selected === q.answerIndex ? 1 : 0);
      setFinished(true);
      // Use the new completeQuiz with title and score
      completeQuiz(missionId, moduleTitle, finalScore, questions.length);
    }
  };

  const finalDisplayScore = finished
    ? score + (selected === q.answerIndex ? 1 : 0)
    : score;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
        >
          {/* Header */}
          <div className="gradient-earth p-5 text-white flex items-center justify-between">
            <div>
              <p className="text-sm text-green-200">Quiz: {moduleTitle}</p>
              {!finished && (
                <p className="text-lg font-bold">
                  Question {currentQ + 1} of {questions.length}
                </p>
              )}
              {finished && <p className="text-lg font-bold">Quiz Complete!</p>}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6">
            {!finished ? (
              <>
                {/* Question */}
                <p className="text-lg font-semibold text-slate-800 mb-5">
                  {q.question}
                </p>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {q.options.map((opt, i) => {
                    let bg = "bg-slate-50 border-slate-200 hover:border-earth-300";
                    if (showResult) {
                      if (i === q.answerIndex) bg = "bg-green-50 border-green-400";
                      else if (i === selected) bg = "bg-red-50 border-red-400";
                    } else if (i === selected) {
                      bg = "bg-earth-50 border-earth-400";
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(i)}
                        disabled={showResult}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${bg} flex items-center gap-3`}
                      >
                        <span className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-semibold text-slate-600 flex-shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm text-slate-700">{opt}</span>
                        {showResult && i === q.answerIndex && (
                          <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />
                        )}
                        {showResult && i === selected && i !== q.answerIndex && (
                          <XCircle className="w-5 h-5 text-red-500 ml-auto flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                {showResult && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleNext}
                    className="w-full py-3 gradient-earth text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    {currentQ < questions.length - 1 ? "Next Question →" : "See Results"}
                  </motion.button>
                )}
              </>
            ) : (
              /* Results */
              <div className="text-center py-4">
                <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  {finalDisplayScore}/{questions.length} Correct!
                </h3>
                <p className="text-slate-500 mb-2">
                  {finalDisplayScore === questions.length
                    ? "Perfect score! You're a true AgriHero! 🎉"
                    : finalDisplayScore >= questions.length / 2
                    ? "Great job! Keep learning and growing! 🌱"
                    : "Keep practicing! Every expert was once a beginner. 💪"}
                </p>
                <p className="text-sm font-semibold text-earth-500 mb-6">
                  +{finalDisplayScore * 25} XP earned
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 gradient-earth text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Continue Learning
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
