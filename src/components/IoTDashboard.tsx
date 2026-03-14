"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Activity, Droplets, Wind, Thermometer } from "lucide-react";

function generateCO2Data() {
  const hours = ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"];
  return hours.map((h) => ({
    time: h,
    indoor: Math.floor(380 + Math.random() * 120),
    outdoor: Math.floor(340 + Math.random() * 60),
    campus: Math.floor(360 + Math.random() * 80),
  }));
}

function generateWaterData() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((d) => ({
    day: d,
    consumed: Math.floor(200 + Math.random() * 150),
    recycled: Math.floor(80 + Math.random() * 100),
    rainwater: Math.floor(30 + Math.random() * 70),
  }));
}

const stats = [
  { label: "CO₂ Saved", value: "2.4 tons", icon: Wind, color: "text-sky-500", bg: "bg-sky-50" },
  { label: "Water Recycled", value: "12,400 L", icon: Droplets, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Soil Temp", value: "24.3°C", icon: Thermometer, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "System Health", value: "98.2%", icon: Activity, color: "text-green-500", bg: "bg-green-50" },
];

export default function IoTDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [co2Data, setCo2Data] = useState(generateCO2Data());
  const [waterData, setWaterData] = useState(generateWaterData());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCo2Data(generateCO2Data());
      setWaterData(generateWaterData());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="impact-dashboard" className="section-padding bg-slate-900 text-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2" />
            Live Data
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            IoT <span className="text-gradient-earth">Impact Dashboard</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Real-time environmental metrics from campus sensors, updated every 5 seconds.
          </p>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="glass-dark rounded-xl p-5 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CO₂ Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-dark rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold mb-1">CO₂ Levels (ppm)</h3>
            <p className="text-sm text-slate-400 mb-6">
              Tracking indoor, outdoor, and campus average
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={co2Data}>
                <defs>
                  <linearGradient id="gradIndoor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D5A27" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2D5A27" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradOutdoor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="indoor"
                  stroke="#2D5A27"
                  fill="url(#gradIndoor)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="outdoor"
                  stroke="#38bdf8"
                  fill="url(#gradOutdoor)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Water Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-dark rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold mb-1">Water Usage (Liters)</h3>
            <p className="text-sm text-slate-400 mb-6">
              Weekly consumption, recycling, and rainwater harvest
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={waterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                />
                <Legend />
                <Bar dataKey="consumed" fill="#2D5A27" radius={[4, 4, 0, 0]} />
                <Bar dataKey="recycled" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rainwater" fill="#C8A951" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
