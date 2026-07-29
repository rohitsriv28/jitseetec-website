"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModal";

// Modular Services Section Components
import ServicesHero from "../components/services/ServicesHero";
import ServiceCards from "../components/services/ServiceCards";
import DevelopmentProcess from "../components/services/DevelopmentProcess";
import WhyChooseUsServices from "../components/services/WhyChooseUsServices";
import ServicesCta from "../components/services/ServicesCta";

export default function ServicesPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1623] text-white selection:bg-[#0E7C86] selection:text-white">
      {/* Navbar */}
      <Navbar onOpenConsultation={() => setConsultationOpen(true)} />

      <main className="flex-1">
        {/* Services Hero Banner */}
        <ServicesHero onOpenConsultation={() => setConsultationOpen(true)} />

        {/* 6 Service Offering Cards */}
        <ServiceCards onOpenConsultation={() => setConsultationOpen(true)} />

        {/* 6 Step Development Process */}
        <DevelopmentProcess />

        {/* Why Choose Us */}
        <WhyChooseUsServices />

        {/* Services CTA & Brand Strip */}
        <ServicesCta onOpenConsultation={() => setConsultationOpen(true)} />
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
