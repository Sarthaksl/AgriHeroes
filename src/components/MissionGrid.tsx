"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sprout, Target, Shield, Recycle, Users, ArrowRight } from "lucide-react";

const missions = [
  {
    id: "soil",
    title: "Soil Foundation",
    subtitle: "Build the Living Base",
    description:
      "Analyze soil microbiomes, test pH levels, and prepare organic compost beds to create the foundation for regenerative growth.",
    icon: Sprout,
    color: "from-amber-600 to-yellow-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    students: 12,
    progress: 78,
  },
  {
    id: "sowing",
    title: "Precision Sowing",
    subtitle: "Data-Driven Planting",
    description:
      "Use IoT sensor data and seasonal calendars to plan and execute optimal planting strategies for maximum yield with minimum waste.",
    icon: Target,
    color: "from-earth-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    students: 9,
    progress: 45,
  },
  {
    id: "guardian",
    title: "Guardian Mode",
    subtitle: "Protect & Monitor",
    description:
      "Deploy AI-powered pest detection, monitor water quality, and maintain the ecosystem balance through real-time environmental sensing.",
    icon: Shield,
    color: "from-sky-600 to-blue-500",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    students: 15,
    progress: 62,
  },
  {
    id: "circular",
    title: "Circular Wealth",
    subtitle: "Zero Waste to Value",
    description:
      "Transform canteen waste into vermicompost, harvest biogas from organic matter, and close the nutrient loop on campus.",
    icon: Recycle,
    color: "from-violet-600 to-purple-500",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    students: 7,
    progress: 33,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function MissionGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="missions" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-earth-100 text-earth-600 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            The 4 Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Your <span className="text-gradient-earth">Mission Grid</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Four interconnected missions that guide students from soil science
            to sustainability mastery.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {missions.map((mission) => {
            const Icon = mission.icon;
            return (
              <motion.div
                key={mission.id}
                variants={cardVariants}
                className={`group relative p-6 rounded-2xl ${mission.bgColor} border ${mission.borderColor} hover-lift cursor-pointer overflow-hidden`}
              >
                {/* Background Gradient Glow */}
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${mission.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-3xl`}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mission.color} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  {mission.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 mb-3">
                  {mission.subtitle}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {mission.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-500">Progress</span>
                    <span className="font-semibold text-slate-700">
                      {mission.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${mission.progress}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full bg-gradient-to-r ${mission.color}`}
                    />
                  </div>
                </div>

                {/* Mission Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Users className="w-3.5 h-3.5" />
                    <span className="font-medium">
                      {mission.students} Students Active
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
