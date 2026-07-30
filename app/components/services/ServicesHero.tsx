"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight } from "lucide-react";
import { fetchSectionContent } from "@/lib/apiClient";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

interface ServicesHeroProps {
  onOpenConsultation: () => void;
}

export default function ServicesHero({
  onOpenConsultation,
}: ServicesHeroProps) {
  const [heroData, setHeroData] = useState({
    title: "Services That Drive Real Business Impact",
    subtitle: "OUR SERVICES",
    description:
      "We design, build and scale digital solutions that help startups, SMEs and enterprises innovate faster, operate smarter and grow beyond limits.",
    heroImage: "/images/services_hero_3d.png",
  });

  const loadHero = useCallback(() => {
    fetchSectionContent("services_hero", heroData).then((data) => {
      if (data && data.title) {
        setHeroData(data);
      }
    });
  }, []);

  useEffect(() => {
    loadHero();
    const unsub = subscribeToCmsUpdate((key) => {
      if (!key || key === "services_hero" || key === "all") {
        loadHero();
      }
    });
    return unsub;
  }, [loadHero]);

  const renderHeading = (titleText: string) => {
    if (titleText.includes("Business Impact")) {
      const parts = titleText.split("Business Impact");
      return (
        <>
          {parts[0]}
          <span className="text-[#2CCFD3]">Business Impact</span>
          {parts[1] || ""}
        </>
      );
    }
    return titleText;
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-16 bg-[#0B1623] bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2CCFD3]">Services</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-tight">
              {renderHeading(heroData.title)}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {heroData.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0E7C86] hover:bg-[#2CCFD3] hover:text-[#0B1623] text-white font-bold text-xs transition-all duration-300 shadow-xl shadow-[#0E7C86]/30"
              >
                <span>Let&apos;s Talk About Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors"
              >
                <span>View Our Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column Image */}
          <div className="lg:col-span-5 hidden lg:flex justify-center lg:justify-end">
            <Image
              src={heroData.heroImage || "/images/services_hero_3d.png"}
              alt="Services 3D Tech Illustration"
              width={600}
              height={450}
              className="w-full h-auto object-contain pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
