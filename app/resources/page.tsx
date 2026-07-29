"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModal";

// Modular Resources Section Components
import ResourcesHero from "../components/resources/ResourcesHero";
import CategoryExplorer from "../components/resources/CategoryExplorer";
import LatestBlogPosts from "../components/resources/LatestBlogPosts";
import FeaturedCaseStudies from "../components/resources/FeaturedCaseStudies";
import InteractiveFaq from "../components/resources/InteractiveFaq";
import TechStackSection from "../components/resources/TechStackSection";
import GuidesDownloads from "../components/resources/GuidesDownloads";
import ResourcesCta from "../components/resources/ResourcesCta";

export default function ResourcesPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1623] text-white selection:bg-[#0E7C86] selection:text-white">
      {/* Navbar */}
      <Navbar onOpenConsultation={() => setConsultationOpen(true)} />

      <main className="flex-1">
        {/* Searchable Resources Hero */}
        <ResourcesHero />

        {/* Resources by Category Grid */}
        <CategoryExplorer />

        {/* Latest Blog Posts */}
        <LatestBlogPosts />

        {/* Featured Case Studies */}
        <FeaturedCaseStudies />

        {/* Interactive FAQ Accordion */}
        <InteractiveFaq />

        {/* Technology Stack Grid */}
        <TechStackSection />

        {/* Guides & Downloads */}
        <GuidesDownloads />

        {/* Resources Conversion CTA */}
        <ResourcesCta onOpenConsultation={() => setConsultationOpen(true)} />
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
