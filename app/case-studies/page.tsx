"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModal";

// Modular Case Study Components
import CaseStudyHero from "../components/casestudy/CaseStudyHero";
import CaseStudyImpactBar from "../components/casestudy/CaseStudyImpactBar";
import CaseStudyBody from "../components/casestudy/CaseStudyBody";
import CaseStudySidebar from "../components/casestudy/CaseStudySidebar";
import RelatedCaseStudies from "../components/casestudy/RelatedCaseStudies";
import CaseStudyCta from "../components/casestudy/CaseStudyCta";

export default function CaseStudyPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1623] text-white selection:bg-[#0E7C86] selection:text-white">
      {/* Navbar */}
      <Navbar onOpenConsultation={() => setConsultationOpen(true)} />

      <main className="flex-1 bg-white text-slate-900">
        {/* Case Study Hero */}
        <CaseStudyHero onOpenConsultation={() => setConsultationOpen(true)} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Key Impact & Metrics Highlight Bar */}
          <CaseStudyImpactBar />

          {/* Main 2-Column Body & Sidebar */}
          <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 8 Columns: Case Study Body */}
            <div className="lg:col-span-8">
              <CaseStudyBody />
            </div>

            {/* Right 4 Columns: Case Study Sidebar */}
            <div className="lg:col-span-4">
              <CaseStudySidebar
                onOpenConsultation={() => setConsultationOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* Related Case Studies */}
        <RelatedCaseStudies />

        {/* Bottom CTA Banner */}
        <CaseStudyCta onOpenConsultation={() => setConsultationOpen(true)} />
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
