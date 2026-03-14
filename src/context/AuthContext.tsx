"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "student" | "teacher" | "judge";

export interface ActivityEntry {
  id: string;
  type: "quiz_completed" | "module_started" | "xp_earned";
  title: string;
  score?: number;
  maxScore?: number;
  xpEarned: number;
  timestamp: number;
  studentName: string;
  className: string;
}

export interface User {
  name: string;
  role: UserRole;
  xp: number;
  level: string;
  completedQuizzes: string[];
  completedModules: string[];
  avatar: string;
}

interface AuthContextType {
  user: User;
  switchRole: (role: UserRole) => void;
  addXP: (amount: number) => void;
  completeQuiz: (quizId: string, title: string, score: number, maxScore: number) => void;
  completeModule: (moduleId: string) => void;
  activityLog: ActivityEntry[];
  isAuthenticated: boolean;
}

const defaultUser: User = {
  name: "Aarav Sharma",
  role: "student",
  xp: 350,
  level: "Budding Farmer",
  completedQuizzes: ["soil-basics", "water-cycle"],
  completedModules: ["soil-basics"],
  avatar: "🌱",
};

const levelMap: { threshold: number; title: string }[] = [
  { threshold: 0, title: "Novice Gardener" },
  { threshold: 200, title: "Budding Farmer" },
  { threshold: 500, title: "Soil Scientist" },
  { threshold: 800, title: "Ecosystem Guardian" },
  { threshold: 1200, title: "Sustainability Champion" },
  { threshold: 1800, title: "Net-Zero Hero" },
];

function getLevel(xp: number): string {
  let level = levelMap[0].title;
  for (const l of levelMap) {
    if (xp >= l.threshold) level = l.title;
  }
  return level;
}

const initialActivity: ActivityEntry[] = [
  {
    id: "init-1",
    type: "quiz_completed",
    title: "Soil Basics Quiz",
    score: 3,
    maxScore: 4,
    xpEarned: 75,
    timestamp: Date.now() - 86400000 * 2,
    studentName: "Aarav Sharma",
    className: "Class 9B",
  },
  {
    id: "init-2",
    type: "module_started",
    title: "Water Cycle Module",
    xpEarned: 0,
    timestamp: Date.now() - 86400000,
    studentName: "Priya Patel",
    className: "Class 8A",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);
  const [activityLog, setActivityLog] = useState<ActivityEntry[]>(initialActivity);

  const switchRole = (role: UserRole) => {
    setUser((prev) => ({ ...prev, role }));
  };

  const addXP = (amount: number) => {
    setUser((prev) => {
      const newXP = prev.xp + amount;
      return { ...prev, xp: newXP, level: getLevel(newXP) };
    });
  };

  const completeQuiz = (quizId: string, title: string, score: number, maxScore: number) => {
    const xpEarned = score * 25;

    setUser((prev) => {
      if (prev.completedQuizzes.includes(quizId)) return prev;
      const updated = [...prev.completedQuizzes, quizId];
      const newXP = prev.xp + xpEarned;
      return {
        ...prev,
        completedQuizzes: updated,
        xp: newXP,
        level: getLevel(newXP),
      };
    });

    setActivityLog((prev) => [
      {
        id: `quiz-${Date.now()}`,
        type: "quiz_completed",
        title: `${title} Quiz`,
        score,
        maxScore,
        xpEarned,
        timestamp: Date.now(),
        studentName: user.name,
        className: "Class 9B",
      },
      ...prev,
    ]);
  };

  const completeModule = (moduleId: string) => {
    setUser((prev) => {
      if (prev.completedModules.includes(moduleId)) return prev;
      return { ...prev, completedModules: [...prev.completedModules, moduleId] };
    });

    setActivityLog((prev) => [
      {
        id: `mod-${Date.now()}`,
        type: "module_started",
        title: moduleId,
        xpEarned: 0,
        timestamp: Date.now(),
        studentName: user.name,
        className: "Class 9B",
      },
      ...prev,
    ]);
  };

  return (
    <AuthContext.Provider
      value={{ user, switchRole, addXP, completeQuiz, completeModule, activityLog, isAuthenticated: true }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
