"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Use every 6th frame for ~40 frames from the 232 available
const FRAME_COUNT = 232;
const FRAME_STEP = 6;
const frames: string[] = [];
for (let i = 1; i <= FRAME_COUNT; i += FRAME_STEP) {
  frames.push(`/frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`);
}

export default function HeroSection() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload frame images
  useEffect(() => {
    let loaded = 0;
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === frames.length) setImagesLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === frames.length) setImagesLoaded(true);
      };
    });
  }, []);

  // Cycle through frames
  const nextFrame = useCallback(() => {
    setCurrentFrame((prev) => (prev + 1) % frames.length);
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    const interval = setInterval(nextFrame, 200);
    return () => clearInterval(interval);
  }, [imagesLoaded, nextFrame]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Frame Sequence Background */}
      <div className="absolute inset-0">
        {frames.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`hero-frame ${index === currentFrame ? "active" : ""}`}
            loading={index < 3 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-earth-900/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-white/90">
              Solar Decathlon India 2025-26
            </span>
          </motion.div>
          {/* Team Name */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-emerald-400 font-bold tracking-[0.3em] text-xs sm:text-sm mb-3 uppercase"
          >
            Team SANKALP presents
          </motion.p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
            AgriHeroes:{" "}
            <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-lime-300 bg-clip-text text-transparent">
              The Operating System
            </span>{" "}
            for Regenerative Campuses
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          >
            Transforming school campuses into living laboratories where students
            grow food, harvest data, and build a net-zero future — powered by
            AI & IoT.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#missions"
              className="px-8 py-4 gradient-earth text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-base glow-green"
            >
              Start Your Mission
            </a>
            <a
              href="#impact-dashboard"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 text-base"
            >
              View Impact Dashboard ↓
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-6 h-6 text-white/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
