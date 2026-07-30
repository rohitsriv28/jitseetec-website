"use client";

import React, { useEffect, useState } from "react";
import { Users, ShieldCheck, Award, Clock, Zap } from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

const defaultIcons = [Users, ShieldCheck, Award, Clock, Zap];

export default function WhyChooseUsServices() {
  const [content, setContent] = useState<any>({
    subtitle: "WHY CHOOSE US",
    title: "Your Success Is Our Commitment",
    pillars: [
      {
        title: "Experienced Team",
        desc: "Skilled professionals with years of experience in modern technologies.",
      },
      {
        title: "Agile & Transparent",
        desc: "We work in agile sprints and keep you updated at every step.",
      },
      {
        title: "Quality First",
        desc: "We follow best practices to deliver reliable and high-quality solutions.",
      },
      {
        title: "On-Time Delivery",
        desc: "We respect deadlines and deliver your projects on time, every time.",
      },
      {
        title: "Long-Term Partner",
        desc: "We build lasting relationships and support your growth beyond delivery.",
      },
    ],
  });

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content/services_why");
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
      if (!key || key === "services_why") {
        fetchContent();
      }
    });
    return () => unsubscribe();
  }, []);

  const pillars =
    content.pillars && content.pillars.length > 0
      ? content.pillars
      : [
          {
            title: "Experienced Team",
            desc: "Skilled professionals with years of experience in modern technologies.",
          },
          {
            title: "Agile & Transparent",
            desc: "We work in agile sprints and keep you updated at every step.",
          },
          {
            title: "Quality First",
            desc: "We follow best practices to deliver reliable and high-quality solutions.",
          },
          {
            title: "On-Time Delivery",
            desc: "We respect deadlines and deliver your projects on time, every time.",
          },
          {
            title: "Long-Term Partner",
            desc: "We build lasting relationships and support your growth beyond delivery.",
          },
        ];

  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
            {content.subtitle || "WHY CHOOSE US"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
            {content.title || "Your Success Is Our Commitment"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map((pillar: any, i: number) => {
            const IconComponent = defaultIcons[i % defaultIcons.length];
            return (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm hover:border-[#0E7C86] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mx-auto mb-3">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold font-heading text-[#0B1623] mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">
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
