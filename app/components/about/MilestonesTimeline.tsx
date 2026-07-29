"use client";

import React from "react";
import { Flag, Code2, Users, Globe, Rocket } from "lucide-react";

export default function MilestonesTimeline() {
  const milestones = [
    {
      year: "2022",
      title: "Founded",
      desc: "JitSeeTec was founded with a mission to help businesses transform through technology.",
      icon: Flag,
    },
    {
      year: "2023",
      title: "First Projects",
      desc: "Delivered our first set of successful projects for startups and SMEs.",
      icon: Code2,
    },
    {
      year: "2024",
      title: "Team Growth",
      desc: "Expanded our team and strengthened our development and delivery capabilities.",
      icon: Users,
    },
    {
      year: "2025",
      title: "Global Reach",
      desc: "Started working with clients across different regions and industries.",
      icon: Globe,
    },
    {
      year: "Future",
      title: "What's Next",
      desc: "Continuing to innovate, collaborate, and build impactful products.",
      icon: Rocket,
    },
  ];

  return (
    <section className="py-20 bg-[#EEF4F8] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
            OUR JOURNEY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
            Milestones That Define Our Growth
          </h2>
        </div>

        <div className="relative">
          {/* Dashed connector line */}
          <div className="hidden lg:block absolute top-10 left-12 right-12 h-0.5 border-t-2 border-dashed border-slate-300 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {milestones.map((m, i) => {
              const IconComp = m.icon;
              return (
                <div
                  key={i}
                  className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-5 text-center hover:border-[#0E7C86] transition-colors shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-white text-[#0E7C86] border border-slate-200 flex items-center justify-center mx-auto mb-3 shadow-md">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-[#0E7C86] font-mono mb-1">
                    {m.year}
                  </div>
                  <h3 className="text-sm font-bold font-heading text-[#0B1623] mb-2">
                    {m.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
