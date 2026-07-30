"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, Rocket, Users, Code2 } from "lucide-react";
import { fetchSectionContent } from "@/lib/apiClient";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

const quickStatIcons = [Calendar, Rocket, Users, Code2];

export default function AboutHero() {
  const [heroData, setHeroData] = useState<any>({
    title: "Building Digital Solutions. Empowering Growth.",
    subtitle: "ABOUT US",
    description:
      "JitSeeTec is a technology company that helps startups, SMEs, and enterprises turn ideas into powerful digital products. We combine modern technologies, agile processes, and a user-first mindset to deliver solutions that drive real business impact.",
    officeImage: "/images/about_office_hero.png",
    quickStats: [
      { label: "Founded", value: "2022" },
      { label: "Projects Delivered", value: "14+" },
      { label: "Happy Clients", value: "10+" },
      { label: "Technologies", value: "4+" },
    ],
  });

  const fetchContent = async () => {
    const data = await fetchSectionContent("about_hero", heroData);
    if (data && data.title) setHeroData(data);
  };

  useEffect(() => {
    fetchContent();
    const unsubscribe = subscribeToCmsUpdate((key) => {
      if (!key || key === "about_hero") fetchContent();
    });
    return () => unsubscribe();
  }, []);

  const quickStats = heroData.quickStats || [
    { label: "Founded", value: "2022" },
    { label: "Projects Delivered", value: "14+" },
    { label: "Happy Clients", value: "10+" },
    { label: "Technologies", value: "4+" },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-16 bg-[#0B1623] bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2CCFD3]">About Us</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="text-[#2CCFD3] text-xs font-semibold tracking-wider uppercase font-heading">
              {heroData.subtitle || "ABOUT US"}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-tight">
              {heroData.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {heroData.description}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
              {quickStats.map((stat: any, i: number) => {
                const IconComp = quickStatIcons[i % quickStatIcons.length];
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] flex items-center justify-center shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl font-bold font-heading text-white">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Office Photo */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 group">
              <Image
                src={heroData.officeImage || "/images/about_office_hero.png"}
                alt="JitSeeTec Corporate Office Headquarters"
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
