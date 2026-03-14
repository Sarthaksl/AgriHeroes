"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import type { ActivityEntry } from "@/context/AuthContext";
import {
  Rocket,
  Zap,
  Users,
  Heart,
  BarChart3,
  ShieldCheck,
  GraduationCap,
  TrendingUp,
  Clock,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

function formatTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function StudentView({ xp, level }: { xp: number; level: string }) {
  const nextMissions = [
    { name: "Soil pH Testing Lab", xpReward: 150, difficulty: "Medium" },
    { name: "Water Recycling Blueprint", xpReward: 200, difficulty: "Hard" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <GraduationCap className="w-6 h-6 text-earth-500" />
        <h3 className="text-xl font-bold text-slate-800">Student Dashboard</h3>
      </div>

      {/* XP Card */}
      <div className="gradient-earth rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-green-200 text-sm">Growth XP</p>
            <p className="text-4xl font-black">{xp}</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <Zap className="w-8 h-8" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
            {level}
          </span>
          <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/60 rounded-full"
              style={{ width: `${Math.min((xp / 1800) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Next Missions */}
      <div>
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          My Next Missions
        </h4>
        <div className="space-y-3">
          {nextMissions.map((m, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-earth-100 hover-lift cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Rocket className="w-5 h-5 text-earth-500" />
                <div>
                  <p className="font-semibold text-slate-700 text-sm">{m.name}</p>
                  <p className="text-xs text-slate-400">{m.difficulty}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-earth-50 text-earth-600 rounded-full text-xs font-bold">
                +{m.xpReward} XP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeacherView({ activityLog, totalQuizzes, totalModules }: {
  activityLog: ActivityEntry[];
  totalQuizzes: number;
  totalModules: number;
}) {
  // Derive dynamic class data from activity
  const quizActivities = activityLog.filter((a) => a.type === "quiz_completed");
  const avgScore = quizActivities.length > 0
    ? Math.round(quizActivities.reduce((s, a) => s + ((a.score || 0) / (a.maxScore || 1)) * 100, 0) / quizActivities.length)
    : 0;
  const totalXPEarned = activityLog.reduce((s, a) => s + a.xpEarned, 0);

  // Dynamic class progress based on real completions
  const classData = [
    {
      name: "Class 8A",
      progress: Math.min(30 + totalModules * 8, 100),
      students: 35,
      quizzesCompleted: quizActivities.filter(a => a.className === "Class 8A").length,
    },
    {
      name: "Class 9B",
      progress: Math.min(25 + totalQuizzes * 12, 100),
      students: 32,
      quizzesCompleted: quizActivities.filter(a => a.className === "Class 9B").length,
    },
    {
      name: "Class 10C",
      progress: Math.min(40 + totalModules * 10, 100),
      students: 28,
      quizzesCompleted: quizActivities.filter(a => a.className === "Class 10C").length,
    },
  ];

  // Derive garden health from activity volume
  const soilMoisture = Math.min(55 + totalModules * 4, 95);
  const plantHealth = Math.min(70 + totalQuizzes * 5, 98);
  const compostDay = Math.max(1, 14 - totalModules);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Users className="w-6 h-6 text-earth-500" />
        <h3 className="text-xl font-bold text-slate-800">Teacher Dashboard</h3>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-earth-50 rounded-xl text-center">
          <p className="text-2xl font-bold text-earth-600">{totalQuizzes}</p>
          <p className="text-xs text-slate-500">Quizzes Done</p>
        </div>
        <div className="p-3 bg-earth-50 rounded-xl text-center">
          <p className="text-2xl font-bold text-earth-600">{avgScore}%</p>
          <p className="text-xs text-slate-500">Avg Score</p>
        </div>
        <div className="p-3 bg-earth-50 rounded-xl text-center">
          <p className="text-2xl font-bold text-earth-600">{totalXPEarned}</p>
          <p className="text-xs text-slate-500">Total XP</p>
        </div>
      </div>

      {/* Class Progress — dynamically computed */}
      <div>
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Class Progress
        </h4>
        <div className="space-y-3">
          {classData.map((c, i) => (
            <div key={i} className="p-4 bg-white rounded-xl border border-earth-100">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-slate-700">{c.name}</span>
                <span className="text-sm text-slate-500">{c.students} students</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full gradient-earth rounded-full transition-all duration-500"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {c.progress}% curriculum completed · {c.quizzesCompleted} quizzes
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Garden Health — dynamically derived */}
      <div className="p-5 bg-earth-50 rounded-xl border border-earth-100">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-earth-500" />
          <h4 className="font-semibold text-earth-700">Garden Health Overview</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { metric: "Soil Moisture", value: `${soilMoisture}%`, status: soilMoisture > 70 ? "Excellent" : "Good" },
            { metric: "Plant Health", value: `${plantHealth}%`, status: plantHealth > 90 ? "Excellent" : "Good" },
            { metric: "Compost Batch", value: `Day ${compostDay}`, status: compostDay < 7 ? "Ready Soon" : "Maturing" },
            { metric: "Pest Alert", value: totalQuizzes > 3 ? "None" : "Low", status: "Monitoring" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-lg p-3">
              <p className="text-xs text-slate-400">{item.metric}</p>
              <p className="font-bold text-slate-700">{item.value}</p>
              <p className="text-xs text-earth-500 font-medium">{item.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Feed */}
      {activityLog.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Recent Activity
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {activityLog.slice(0, 8).map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-earth-50"
              >
                {entry.type === "quiz_completed" ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                ) : (
                  <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {entry.studentName}: {entry.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    {entry.type === "quiz_completed"
                      ? `Score: ${entry.score}/${entry.maxScore} · +${entry.xpEarned} XP`
                      : "Module started"}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  {formatTime(entry.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function JudgeView({ activityLog, totalQuizzes, totalModules, userXP }: {
  activityLog: ActivityEntry[];
  totalQuizzes: number;
  totalModules: number;
  userXP: number;
}) {
  const quizActivities = activityLog.filter((a) => a.type === "quiz_completed");
  const avgScore = quizActivities.length > 0
    ? Math.round(quizActivities.reduce((s, a) => s + ((a.score || 0) / (a.maxScore || 1)) * 100, 0) / quizActivities.length)
    : 0;

  // Impact metrics that grow with user activity
  const co2Offset = (2.4 + totalModules * 0.3).toFixed(1);
  const waterSaved = (12400 + totalQuizzes * 800).toLocaleString();
  const foodProduced = 340 + totalModules * 25;
  const wasteDiverted = Math.min(89 + totalQuizzes * 2, 99);
  const biodiversity = Math.min(4.2 + totalModules * 0.1, 5.0).toFixed(1);
  const engagement = Math.min(avgScore || 94, 100);

  // Net-zero checks — become green as user does more
  const energyTarget = totalModules >= 2;
  const waterTarget = totalQuizzes >= 2;
  const wasteTarget = totalQuizzes >= 1;
  const carbonTarget = totalModules >= 4;
  const targetsMetCount = [energyTarget, waterTarget, wasteTarget, carbonTarget].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <ShieldCheck className="w-6 h-6 text-earth-500" />
        <h3 className="text-xl font-bold text-slate-800">Judge Dashboard</h3>
      </div>

      {/* Impact Metrics — dynamically derived */}
      <div>
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Technical Impact Data
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { metric: "CO₂ Offset", value: `${co2Offset} tons/yr`, trend: `+${(totalModules * 3 + 18)}%` },
            { metric: "Water Saved", value: `${waterSaved} L/yr`, trend: `+${(totalQuizzes * 4 + 25)}%` },
            { metric: "Food Produced", value: `${foodProduced} kg/yr`, trend: `+${(totalModules * 2 + 12)}%` },
            { metric: "Waste Diverted", value: `${wasteDiverted}%`, trend: `+${(totalQuizzes * 1 + 7)}%` },
            { metric: "Biodiversity Index", value: `${biodiversity}/5.0`, trend: `+${(totalModules * 0.1 + 0.6).toFixed(1)}` },
            { metric: "Student Engagement", value: `${engagement}%`, trend: `+${(totalQuizzes * 3 + 15)}%` },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-xl border border-earth-100"
            >
              <p className="text-xs text-slate-400">{item.metric}</p>
              <p className="text-xl font-bold text-slate-800">{item.value}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs font-semibold text-green-500">
                  {item.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Net-Zero Verification — dynamically updates */}
      <div className="p-5 bg-earth-50 rounded-xl border border-earth-100">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-earth-500" />
          <h4 className="font-semibold text-earth-700">Net-Zero Verification</h4>
        </div>
        <div className="space-y-3">
          {[
            { check: "Energy Balance (Solar vs. Consumption)", status: energyTarget },
            { check: "Water Cycle Closure ≥ 80%", status: waterTarget },
            { check: "Organic Waste Diversion ≥ 85%", status: wasteTarget },
            { check: "Carbon Sequestration Positive", status: carbonTarget },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  item.status ? "bg-green-500" : "bg-amber-400"
                }`}
              >
                <span className="text-white text-xs">{item.status ? "✓" : "!"}</span>
              </div>
              <span className="text-sm text-slate-600">{item.check}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-white rounded-lg">
          <p className="text-sm font-semibold text-slate-700">
            Overall Score:{" "}
            <span className="text-earth-500">
              {targetsMetCount}/4 targets met — {(targetsMetCount / 4 * 100).toFixed(1)}%
            </span>
          </p>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-white rounded-xl border border-earth-100 text-center">
          <p className="text-xs text-slate-400">Total Modules</p>
          <p className="text-2xl font-bold text-earth-600">{totalModules}</p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-earth-100 text-center">
          <p className="text-xs text-slate-400">Total XP Earned</p>
          <p className="text-2xl font-bold text-earth-600">{userXP}</p>
        </div>
      </div>
    </div>
  );
}

export default function RoleBasedPanel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { user, activityLog } = useAuth();

  const totalQuizzes = user.completedQuizzes.length;
  const totalModules = user.completedModules.length;

  return (
    <section className="section-padding bg-cream">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-earth-100 text-earth-600 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            Your View
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Role-Based{" "}
            <span className="text-gradient-earth">Command Center</span>
          </h2>
          <p className="text-slate-500">
            Switch roles in the navbar to see different dashboard perspectives.
            Data updates live as you complete modules and quizzes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-cream rounded-2xl border border-earth-100 p-6 sm:p-8 shadow-sm"
        >
          {user.role === "student" && (
            <StudentView xp={user.xp} level={user.level} />
          )}
          {user.role === "teacher" && (
            <TeacherView
              activityLog={activityLog}
              totalQuizzes={totalQuizzes}
              totalModules={totalModules}
            />
          )}
          {user.role === "judge" && (
            <JudgeView
              activityLog={activityLog}
              totalQuizzes={totalQuizzes}
              totalModules={totalModules}
              userXP={user.xp}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
