"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModal";

// Modular About Section Components
import AboutHero from "../components/about/AboutHero";
import MissionVisionValues from "../components/about/MissionVisionValues";
import MilestonesTimeline from "../components/about/MilestonesTimeline";
import LeadershipTeam from "../components/about/LeadershipTeam";
import AboutCta from "../components/about/AboutCta";

export default function AboutPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1623] text-white selection:bg-[#0E7C86] selection:text-white">
      {/* Navbar */}
      <Navbar onOpenConsultation={() => setConsultationOpen(true)} />

      <main className="flex-1">
        {/* About Hero Section */}
        <AboutHero />

        {/* Mission, Vision, & Values */}
        <MissionVisionValues />

        {/* Milestones Journey Timeline */}
        <MilestonesTimeline />

        {/* Leadership & Core Team */}
        <LeadershipTeam />

        {/* Remote Culture & Hiring CTA */}
        <AboutCta onOpenConsultation={() => setConsultationOpen(true)} />
      </main>

      {/* Corporate Footer */}
      <Footer />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}
