"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf, ChevronDown } from "lucide-react";
import { useAuth, UserRole } from "@/context/AuthContext";

const navLinks = [
  { label: "Missions", href: "#missions" },
  { label: "AI Lab", href: "#ai-lab" },
  { label: "Skill Tree", href: "#skill-tree" },
  { label: "Dashboard", href: "#impact-dashboard" },
  { label: "Circular Economy", href: "#circular-economy" },
];

const roles: { value: UserRole; label: string; icon: string }[] = [
  { value: "student", label: "Student", icon: "🎓" },
  { value: "teacher", label: "Teacher", icon: "📚" },
  { value: "judge", label: "Judge", icon: "⚖️" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const { user, switchRole } = useAuth();

  const currentRole = roles.find((r) => r.value === user.role) || roles[0];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-earth-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg gradient-earth flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gradient-earth">
              AgriHeroes
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-earth-500 rounded-lg hover:bg-earth-50 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Role Switcher + XP */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-earth-50 rounded-full">
              <span className="text-xs font-semibold text-earth-600">
                {user.xp} XP
              </span>
              <div className="w-px h-4 bg-earth-200" />
              <span className="text-xs text-earth-500">{user.level}</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setRoleOpen(!roleOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-earth-200 rounded-lg hover:border-earth-400 transition-colors shadow-sm"
              >
                <span>{currentRole.icon}</span>
                <span className="text-sm font-medium">{currentRole.label}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${roleOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {roleOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-earth-100 overflow-hidden"
                  >
                    {roles.map((role) => (
                      <button
                        key={role.value}
                        onClick={() => {
                          switchRole(role.value);
                          setRoleOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-earth-50 transition-colors ${
                          user.role === role.value
                            ? "bg-earth-50 text-earth-600 font-semibold"
                            : "text-slate-600"
                        }`}
                      >
                        <span>{role.icon}</span>
                        <span>{role.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-earth-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-earth-200"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-earth-500 rounded-lg hover:bg-earth-50 transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-earth-100 mt-3">
                <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Switch Role
                </p>
                {roles.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => {
                      switchRole(role.value);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                      user.role === role.value
                        ? "bg-earth-50 text-earth-600 font-semibold"
                        : "text-slate-600 hover:bg-earth-50"
                    }`}
                  >
                    <span>{role.icon}</span>
                    <span>{role.label}</span>
                  </button>
                ))}
              </div>
              <div className="pt-3 border-t border-earth-100">
                <div className="px-3 flex items-center gap-2">
                  <span className="text-sm font-bold text-earth-600">{user.xp} XP</span>
                  <span className="text-xs text-earth-400">·</span>
                  <span className="text-sm text-earth-500">{user.level}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
