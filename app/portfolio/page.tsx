"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModal";

// Modular Portfolio Section Components
import PortfolioHero from "../components/portfolio/PortfolioHero";
import CategoryFilterGrid from "../components/portfolio/CategoryFilterGrid";
import BrandLogoStrip from "../components/portfolio/BrandLogoStrip";
import ClientTestimonials from "../components/portfolio/ClientTestimonials";
import PortfolioCta from "../components/portfolio/PortfolioCta";

export default function PortfolioPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1623] text-white selection:bg-[#0E7C86] selection:text-white">
      {/* Navbar */}
      <Navbar onOpenConsultation={() => setConsultationOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <PortfolioHero onOpenConsultation={() => setConsultationOpen(true)} />

        {/* Category & Industry Filterable Projects Grid */}
        <CategoryFilterGrid />

        {/* Brand Logo Strip */}
        <BrandLogoStrip />

        {/* Client Success Stories Testimonials */}
        <ClientTestimonials />

        {/* Portfolio CTA */}
        <PortfolioCta onOpenConsultation={() => setConsultationOpen(true)} />
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
