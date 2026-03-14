"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MissionGrid from "@/components/MissionGrid";
import AILab from "@/components/AILab";
import SkillTree from "@/components/SkillTree";
import RoleBasedPanel from "@/components/RoleBasedPanel";
import IoTDashboard from "@/components/IoTDashboard";
import CircularEconomyGraphic from "@/components/CircularEconomyGraphic";
import ResearchBlock from "@/components/ResearchBlock";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <MissionGrid />
      <AILab />
      <SkillTree />
      <RoleBasedPanel />
      <IoTDashboard />
      <CircularEconomyGraphic />
      <ResearchBlock />
      <Footer />
    </main>
  );
}
