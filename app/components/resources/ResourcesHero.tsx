"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Search } from "lucide-react";
import { fetchSectionContent } from "@/lib/apiClient";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

export default function ResourcesHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [heroData, setHeroData] = useState<any>({
    title: "Insights, Knowledge & Tools to Help You Grow",
    subtitle: "RESOURCES & INSIGHTS",
    description:
      "Explore our blogs, case studies, FAQs, and tech stack to stay informed and empowered with the right information for your business.",
    heroImage: "/images/resources_hero_3d.png",
    popularTags: ["Next.js", "React", "Cloud", "UI/UX", "DevOps"],
  });

  const fetchContent = async () => {
    const data = await fetchSectionContent("resources_hero", heroData);
    if (data && data.title) setHeroData(data);
  };

  useEffect(() => {
    fetchContent();
    const unsubscribe = subscribeToCmsUpdate((key) => {
      if (!key || key === "resources_hero") fetchContent();
    });
    return () => unsubscribe();
  }, []);

  const popularTags: string[] = heroData.popularTags || ["Next.js", "React", "Cloud", "UI/UX", "DevOps"];

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-16 bg-[#0B1623] bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2CCFD3]">Resources</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="text-[#2CCFD3] text-xs font-semibold tracking-wider uppercase font-heading">
              {heroData.subtitle || "RESOURCES & INSIGHTS"}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-tight">
              {heroData.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {heroData.description}
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto lg:mx-0">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, guides, topics..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#2CCFD3] shadow-lg"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
              </div>
            </div>

            {/* Popular Topics */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
              <span className="text-xs text-slate-400 font-medium mr-1">Popular:</span>
              {popularTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-[#0E7C86] text-slate-300 hover:text-white text-[11px] font-medium transition-colors border border-slate-700/60"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column Image */}
          <div className="lg:col-span-5 hidden lg:flex justify-center lg:justify-end">
            <Image
              src={heroData.heroImage || "/images/resources_hero_3d.png"}
              alt="Resources Hub 3D Tech Graphic"
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
