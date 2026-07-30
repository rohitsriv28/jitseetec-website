"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Play } from "lucide-react";
import { fetchSectionContent } from "@/lib/apiClient";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

interface HomeHeroProps {
  onOpenConsultation: () => void;
}

export default function HomeHero({ onOpenConsultation }: HomeHeroProps) {
  const [heroData, setHeroData] = useState({
    title: "Unlocking Strategic Digital Acceleration.",
    subtitle: "SOFTWARE SOLUTIONS THAT DRIVE GROWTH",
    description:
      "We design and build modern, scalable and high-performance digital solutions that help startups, SMEs and enterprises transform ideas into impactful products.",
    heroImage: "/images/hero_isometric_tech.png",
  });

  const loadHero = useCallback(() => {
    fetchSectionContent("home_hero", heroData).then((data) => {
      if (data && data.title) {
        setHeroData(data);
      }
    });
  }, []);

  useEffect(() => {
    loadHero();
    const unsub = subscribeToCmsUpdate((key) => {
      if (!key || key === "home_hero" || key === "all") {
        loadHero();
      }
    });
    return unsub;
  }, [loadHero]);

  const renderHeading = (titleText: string) => {
    if (titleText.includes("Acceleration.")) {
      const parts = titleText.split("Acceleration.");
      return (
        <>
          {parts[0]}
          <span className="text-[#2CCFD3] inline-block">Acceleration.</span>
          {parts[1] || ""}
        </>
      );
    }
    return titleText;
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-16 bg-[#0B1623] bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E7C86]/15 border border-[#0E7C86]/40 text-[#2CCFD3] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{heroData.subtitle}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-[1.15] text-white">
              {renderHeading(heroData.title)}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {heroData.description}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0E7C86] hover:bg-[#2CCFD3] hover:text-[#0B1623] text-white font-bold text-xs transition-all duration-300 shadow-xl shadow-[#0E7C86]/30"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors"
              >
                <Play className="w-4 h-4 fill-slate-200 text-slate-200" />
                <span>Watch Our Story</span>
              </Link>
            </div>

            {/* TRUSTED BY BUSINESSES WORLDWIDE */}
            <div className="pt-6 mt-6 border-t border-slate-800/80">
              <p className="text-left text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-4">
                TRUSTED BY BUSINESSES WORLDWIDE
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 lg:gap-8 opacity-80 hover:opacity-100 transition-opacity">
                {["NOVATECH", "MEDIFLOW", "EduSphere", "Finova", "Travelo"].map(
                  (logo, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-slate-300 font-heading font-bold text-sm hover:text-[#2CCFD3] transition-colors cursor-pointer"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0E7C86]" />
                      <span>{logo}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Section Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Image
              src={heroData.heroImage || "/images/hero_isometric_tech.png"}
              alt="Digital Acceleration 3D Tech Illustration"
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
