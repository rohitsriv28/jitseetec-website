"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModal";

// Modular Contact Section Components
import ContactHero from "../components/contact/ContactHero";
import ContactFormSection from "../components/contact/ContactFormSection";
import InteractiveMapSection from "../components/contact/InteractiveMapSection";
import OfficeCardsSection from "../components/contact/OfficeCardsSection";
import ContactFaqSection from "../components/contact/ContactFaqSection";
import ContactCtaSection from "../components/contact/ContactCtaSection";

export default function ContactPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1623] text-white selection:bg-[#0E7C86] selection:text-white">
      {/* Navigation */}
      <Navbar onOpenConsultation={() => setConsultationOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <ContactHero />

        {/* Form & Direct Contact Info Grid */}
        <ContactFormSection />

        {/* Interactive Google Map */}
        <InteractiveMapSection />

        {/* Offices & FAQ 2-Column Section */}
        <section className="py-20 bg-white text-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <OfficeCardsSection />
              <ContactFaqSection />
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <ContactCtaSection onOpenConsultation={() => setConsultationOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}
