"use client";

import React from "react";

export default function BrandLogoStrip() {
  const logos = [
    "NOVATECH",
    "MEDIFLOW",
    "EduSphere",
    "Finova",
    "Travelo",
    "HealthPlus",
    "Payrix",
  ];

  return (
    <section className="py-12 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
          TRUSTED BY BUSINESSES WORLDWIDE
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14 opacity-80">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="text-[#0B1623] font-heading font-bold text-base flex items-center gap-1.5"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#0E7C86]" />
              <span>{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
