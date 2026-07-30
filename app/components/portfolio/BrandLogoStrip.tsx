"use client";

import React, { useEffect, useState } from "react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

export default function BrandLogoStrip() {
  const [content, setContent] = useState<any>({
    heading: "TRUSTED BY BUSINESSES WORLDWIDE",
    brands: [
      "NOVATECH",
      "MEDIFLOW",
      "EduSphere",
      "Finova",
      "Travelo",
      "HealthPlus",
      "Payrix",
    ],
  });

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content/portfolio_brands");
      if (res.ok) {
        const json = await res.json();
        if (json.data) setContent(json.data);
      }
    } catch (e) {
      // fallback
    }
  };

  useEffect(() => {
    fetchContent();
    const unsubscribe = subscribeToCmsUpdate((key) => {
      if (!key || key === "portfolio_brands") fetchContent();
    });
    return () => unsubscribe();
  }, []);

  const brands: string[] = content.brands || [];

  return (
    <section className="py-12 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
          {content.heading || "TRUSTED BY BUSINESSES WORLDWIDE"}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14 opacity-80">
          {brands.map((logo, idx) => (
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
