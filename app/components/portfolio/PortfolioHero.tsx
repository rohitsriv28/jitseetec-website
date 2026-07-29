"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight } from "lucide-react";

interface PortfolioHeroProps {
  onOpenConsultation: () => void;
}

export default function PortfolioHero({
  onOpenConsultation,
}: PortfolioHeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-16 bg-[#0B1623] bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2CCFD3]">Portfolio</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-tight">
              Our Work.
              <br />
              <span className="text-[#2CCFD3]">Real Impact.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore a selection of digital products we&apos;ve designed and
              developed for startups, SMEs, and enterprises across the globe.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0E7C86] hover:bg-[#2CCFD3] hover:text-[#0B1623] text-white font-bold text-xs transition-all shadow-xl shadow-[#0E7C86]/30"
              >
                <span>Let&apos;s Build Your Success</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Image
              src="/images/portfolio_hero_3d.png"
              alt="Portfolio Showcase 3D Graphic"
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
