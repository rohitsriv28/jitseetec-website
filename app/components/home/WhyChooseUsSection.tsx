"use client";

import React from "react";
import { Users, ShieldCheck, Zap, Headphones } from "lucide-react";

export default function WhyChooseUsSection() {
  const pillars = [
    {
      title: "Client-Centric Approach",
      desc: "We listen, collaborate and align our solutions with your business goals.",
      icon: Users,
    },
    {
      title: "Transparent Process",
      desc: "We follow clear communication and transparent processes at every step.",
      icon: ShieldCheck,
    },
    {
      title: "Agile & Scalable",
      desc: "Our agile approach ensures flexibility, scalability and faster time-to-market.",
      icon: Zap,
    },
    {
      title: "Long-Term Partnership",
      desc: "We build lasting relationships and support your growth beyond delivery.",
      icon: Headphones,
    },
  ];

  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
            Your Success Is Our Commitment
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            We combine technology, creativity and strategy to deliver solutions
            that help you stay ahead in a competitive digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center hover:border-[#0E7C86] transition-colors shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold font-heading text-[#0B1623] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
