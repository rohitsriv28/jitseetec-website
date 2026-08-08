"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ConsultationModal from "./components/ConsultationModal";

// Modular Home Section Components
import HomeHero from "./components/home/HomeHero";
import WhatWeDoSection from "./components/home/WhatWeDoSection";
import TechMarqueeBar from "./components/home/TechMarqueeBar";
import FeaturedWorkSection from "./components/home/FeaturedWorkSection";
import WhyChooseUsSection from "./components/home/WhyChooseUsSection";
import LatestArticlesSection from "./components/home/LatestArticlesSection";
import HomeCta from "./components/home/HomeCta";

export default function Home() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1623] text-white selection:bg-[#0E7C86] selection:text-white">
      {/* Navigation Header */}
      <Navbar onOpenConsultation={() => setConsultationOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <HomeHero onOpenConsultation={() => setConsultationOpen(true)} />

        {/* What We Do Services Section */}
        <WhatWeDoSection />

        {/* Tech Stack & E-Commerce Marquee Bar */}
        <TechMarqueeBar />

        {/* Featured Work Showcase */}
        <FeaturedWorkSection />

        {/* Why Choose Us */}
        <WhyChooseUsSection />

        {/* Testimonials & Latest Insights */}
        <LatestArticlesSection />

        {/* Conversion Action CTA */}
        <HomeCta onOpenConsultation={() => setConsultationOpen(true)} />
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
