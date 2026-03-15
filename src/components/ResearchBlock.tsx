"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Brain, Cpu } from "lucide-react";

export default function ResearchBlock() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-white">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-earth-100 text-earth-600 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            Technical Research
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
            The Science Behind{" "}
            <span className="text-gradient-earth">AgriHeroes</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {/* Multi-Variable Feedback Loop */}
          <motion.blockquote
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative p-6 sm:p-8 bg-earth-50/50 rounded-2xl border-l-4 border-earth-500"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-earth-500 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Multi-Variable Feedback Loop
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              AgriHeroes implements a <strong>closed-loop feedback system</strong>{" "}
              that continuously monitors soil moisture, ambient CO₂, temperature,
              and nutrient levels through distributed IoT sensors. This data feeds
              into a <strong>multi-variable regression model</strong> that predicts
              optimal planting schedules, irrigation timing, and composting cycles.
              The feedback loop ensures that every decision — from when to water
              the crops to when to turn the compost — is{" "}
              <strong>data-informed and adaptive</strong>, reducing resource waste
              by up to 40% compared to traditional campus gardening approaches.
              The system accounts for seasonal variation, microclimate effects,
              and the compounding benefits of regenerative soil practices over time.
            </p>
          </motion.blockquote>

          {/* AI Pedagogical Engine */}
          <motion.blockquote
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative p-6 sm:p-8 bg-violet-50/50 rounded-2xl border-l-4 border-violet-500"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                AI Pedagogical Engine
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              At the heart of AgriHeroes lies a{" "}
              <strong>
                Gemini-powered Adaptive Learning Engine
              </strong>{" "}
              that generates personalized educational content in real-time. Unlike
              static curricula, the engine{" "}
              <strong>dynamically adjusts language complexity</strong> based on the
              learner&apos;s role (Primary vs. Secondary students), quiz performance
              history, and engagement patterns. Each learning module is generated
              as a structured JSON payload containing lesson content, assessment
              questions, and media suggestions — enabling a{" "}
              <strong>&quot;Phygital&quot; (Physical + Digital)</strong> learning
              experience where students seamlessly move between hands-on garden
              activities and AI-guided digital modules. The system implements{" "}
              <strong>spaced repetition</strong> principles by tracking quiz
              completion and XP progression through a gamified skill tree.
            </p>
          </motion.blockquote>

          {/* Source Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-2 text-sm text-slate-400 justify-center"
          >
            <BookOpen className="w-4 h-4" />
            <span>Solar Decathlon India — Technical Documentation 2025-26</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
