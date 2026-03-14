"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const nodes = [
  {
    id: "canteen",
    label: "Canteen Waste",
    emoji: "🍽️",
    description: "Food scraps & organic waste collected daily",
    cx: 50,
    cy: 15,
  },
  {
    id: "vermi",
    label: "Vermicompost",
    emoji: "🪱",
    description: "Earthworms transform waste into rich compost",
    cx: 85,
    cy: 50,
  },
  {
    id: "farm",
    label: "Campus Farm",
    emoji: "🌾",
    description: "Compost feeds the soil for healthy crops",
    cx: 50,
    cy: 85,
  },
  {
    id: "harvest",
    label: "Fresh Harvest",
    emoji: "🥬",
    description: "Fresh produce goes back to the campus canteen",
    cx: 15,
    cy: 50,
  },
];

export default function CircularEconomyGraphic() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="circular-economy" className="section-padding bg-parchment">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-earth-100 text-earth-600 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            Zero Waste
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            The <span className="text-gradient-earth">Nutrient Loop</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A closed-loop circular economy where nothing goes to waste on our campus.
          </p>
        </motion.div>

        {/* Circular Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-xl mx-auto"
        >
          <svg viewBox="0 0 100 100" className="w-full">
            {/* Central Circle Path */}
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="#2D5A27"
              strokeWidth="0.5"
              strokeDasharray="4 4"
              opacity="0.3"
            />

            {/* Animated Flow Arrows */}
            <path
              d="M 50 15 Q 85 15 85 50"
              fill="none"
              stroke="#2D5A27"
              strokeWidth="1.5"
              className="flow-animate"
              opacity="0.6"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M 85 50 Q 85 85 50 85"
              fill="none"
              stroke="#4A8B3F"
              strokeWidth="1.5"
              className="flow-animate"
              opacity="0.6"
              style={{ animationDelay: "1s" }}
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M 50 85 Q 15 85 15 50"
              fill="none"
              stroke="#6BAF5E"
              strokeWidth="1.5"
              className="flow-animate"
              opacity="0.6"
              style={{ animationDelay: "2s" }}
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M 15 50 Q 15 15 50 15"
              fill="none"
              stroke="#C8A951"
              strokeWidth="1.5"
              className="flow-animate"
              opacity="0.6"
              style={{ animationDelay: "3s" }}
              markerEnd="url(#arrowhead)"
            />

            {/* Arrow Marker */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="4"
                refX="5"
                refY="2"
                orient="auto"
              >
                <polygon points="0 0, 6 2, 0 4" fill="#2D5A27" />
              </marker>
            </defs>

            {/* Center Logo */}
            <circle cx="50" cy="50" r="10" fill="#2D5A27" opacity="0.1" />
            <text
              x="50"
              y="48"
              textAnchor="middle"
              fontSize="4"
              fontWeight="bold"
              fill="#2D5A27"
            >
              ♻️
            </text>
            <text
              x="50"
              y="54"
              textAnchor="middle"
              fontSize="2.5"
              fontWeight="600"
              fill="#2D5A27"
            >
              Net Zero
            </text>
          </svg>

          {/* Node Cards positioned around the circle */}
          {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
              className="absolute bg-white rounded-xl shadow-lg border border-earth-100 p-3 w-36 sm:w-44 text-center hover-lift"
              style={{
                left: `${node.cx}%`,
                top: `${node.cy}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="text-2xl sm:text-3xl block mb-1">{node.emoji}</span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-700">{node.label}</h4>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 leading-tight">
                {node.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Flow Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {["Canteen Waste", "→", "Vermicompost", "→", "Campus Farm", "→", "Fresh Harvest", "→", "Canteen"].map(
            (item, i) => (
              <span
                key={i}
                className={
                  item === "→"
                    ? "text-earth-400 font-bold text-lg"
                    : "px-4 py-2 bg-white rounded-lg shadow-sm border border-earth-100 text-sm font-medium text-slate-600"
                }
              >
                {item}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
