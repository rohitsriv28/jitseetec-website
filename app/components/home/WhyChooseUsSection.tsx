"use client";

import React, { useEffect, useState } from "react";
import { Users, ShieldCheck, Zap, Headphones } from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

const defaultIcons = [Users, ShieldCheck, Zap, Headphones];

export default function WhyChooseUsSection() {
  const [content, setContent] = useState<any>({
    subtitle: "WHY CHOOSE US",
    title: "Your Success Is Our Commitment",
    description:
      "We combine technology, creativity and strategy to deliver solutions that help you stay ahead in a competitive digital landscape.",
    pillars: [
      {
        title: "Client-Centric Approach",
        desc: "We listen, collaborate and align our solutions with your business goals.",
      },
      {
        title: "Transparent Process",
        desc: "We follow clear communication and transparent processes at every step.",
      },
      {
        title: "Agile & Scalable",
        desc: "Our agile approach ensures flexibility, scalability and faster time-to-market.",
      },
      {
        title: "Long-Term Partnership",
        desc: "We build lasting relationships and support your growth beyond delivery.",
      },
    ],
  });

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content/home_why");
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
      if (!key || key === "home_why") {
        fetchContent();
      }
    });
    return () => unsubscribe();
  }, []);

  const pillars = content.pillars && content.pillars.length > 0
    ? content.pillars
    : [
        {
          title: "Client-Centric Approach",
          desc: "We listen, collaborate and align our solutions with your business goals.",
        },
        {
          title: "Transparent Process",
          desc: "We follow clear communication and transparent processes at every step.",
        },
        {
          title: "Agile & Scalable",
          desc: "Our agile approach ensures flexibility, scalability and faster time-to-market.",
        },
        {
          title: "Long-Term Partnership",
          desc: "We build lasting relationships and support your growth beyond delivery.",
        },
      ];

  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
            {content.subtitle || "WHY CHOOSE US"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
            {content.title || "Your Success Is Our Commitment"}
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            {content.description ||
              "We combine technology, creativity and strategy to deliver solutions that help you stay ahead in a competitive digital landscape."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar: any, idx: number) => {
            const IconComponent = defaultIcons[idx % defaultIcons.length];
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
                  {pillar.desc || pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
