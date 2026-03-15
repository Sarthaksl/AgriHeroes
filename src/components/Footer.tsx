"use client";

import { Leaf, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-earth flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">AgriHeroes</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              The Operating System for Regenerative Campuses — transforming
              schools into living laboratories through AI, IoT, and hands-on
              sustainability education.
            </p>
            <p className="text-xs text-slate-500">
              Built for Solar Decathlon India 2025-26
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Missions", href: "#missions" },
                { label: "AI Lab", href: "#ai-lab" },
                { label: "Skill Tree", href: "#skill-tree" },
                { label: "Dashboard", href: "#impact-dashboard" },
                { label: "Circular Economy", href: "#circular-economy" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-earth-500 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2025 AgriHeroes. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Powered by Gemini AI · Built with Next.js · Designed for SDI
          </p>
        </div>
      </div>
    </footer>
  );
}
