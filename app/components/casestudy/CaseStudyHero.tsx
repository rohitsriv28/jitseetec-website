"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ExternalLink } from "lucide-react";

interface CaseStudyHeroProps {
  onOpenConsultation: () => void;
}

export default function CaseStudyHero({
  onOpenConsultation,
}: CaseStudyHeroProps) {
  const metaItems = [
    { label: "Client", val: "SwiftCare Health Pvt. Ltd." },
    { label: "Industry", val: "Healthcare" },
    { label: "Services", val: "Web Dev, UI/UX, API, Cloud" },
    { label: "Duration", val: "4 Months" },
    { label: "Year", val: "2024" },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24 bg-[#0B1623] bg-grid-pattern text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href="/portfolio"
            className="hover:text-white transition-colors"
          >
            Case Studies
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2CCFD3]">
            SwiftCare – Doctor Appointment Platform
          </span>
        </div>

        {/* Title & Description */}
        <div className="max-w-3xl space-y-4 mb-10">
          <span className="inline-block text-[#2CCFD3] text-xs font-bold tracking-wider uppercase font-heading bg-[#0E7C86]/20 px-3 py-1 rounded-md border border-[#0E7C86]/30">
            HEALTHCARE CASE STUDY
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white leading-tight">
            SwiftCare – Doctor Appointment Platform
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            A modern healthcare platform that simplifies appointment booking and
            patient management for clinics and hospitals.
          </p>
        </div>

        {/* Meta Bar & Live Project CTA */}
        <div className="bg-[#162533] border border-slate-700/80 rounded-2xl p-6 mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 flex-1">
            {metaItems.map((item, idx) => (
              <div key={idx}>
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                <div className="text-xs font-bold text-white font-heading truncate">
                  {item.val}
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://swiftcare.example.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0E7C86] hover:bg-[#2CCFD3] hover:text-[#0B1623] text-white font-bold text-xs transition-all shadow-lg shrink-0"
          >
            <span>View Live Project</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Hero Product Mockup */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-900 group">
          <Image
            src="/images/swiftcare_hero_mockup.png"
            alt="SwiftCare Doctor Appointment Platform Mockup"
            width={1200}
            height={650}
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
            priority
          />
        </div>
      </div>
    </section>
  );
}
