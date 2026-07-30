"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  FileText,
  Edit3,
  Code2,
  Rocket,
  Headphones,
} from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

const defaultIcons = [Search, FileText, Edit3, Code2, Rocket, Headphones];

export default function DevelopmentProcess() {
  const [content, setContent] = useState<any>({
    heading: "A Collaborative Process That Delivers Results",
    subtitle: "OUR PROCESS",
    steps: [
      {
        step: "01",
        stepNumber: 1,
        title: "Discover",
        desc: "We understand your business, goals and challenges.",
      },
      {
        step: "02",
        stepNumber: 2,
        title: "Plan",
        desc: "We define the strategy, roadmap and technical approach.",
      },
      {
        step: "03",
        stepNumber: 3,
        title: "Design",
        desc: "We create intuitive designs that users love.",
      },
      {
        step: "04",
        stepNumber: 4,
        title: "Develop",
        desc: "We build robust, scalable and secure solutions.",
      },
      {
        step: "05",
        stepNumber: 5,
        title: "Deliver",
        desc: "We test, deploy and deliver great software on time.",
      },
      {
        step: "06",
        stepNumber: 6,
        title: "Support",
        desc: "We provide ongoing support and continuous improvement.",
      },
    ],
  });

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content/services_process");
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
      if (!key || key === "services_process") {
        fetchContent();
      }
    });
    return () => unsubscribe();
  }, []);

  const steps =
    content.steps && content.steps.length > 0
      ? content.steps
      : [
          {
            step: "01",
            title: "Discover",
            desc: "We understand your business, goals and challenges.",
          },
          {
            step: "02",
            title: "Plan",
            desc: "We define the strategy, roadmap and technical approach.",
          },
          {
            step: "03",
            title: "Design",
            desc: "We create intuitive designs that users love.",
          },
          {
            step: "04",
            title: "Develop",
            desc: "We build robust, scalable and secure solutions.",
          },
          {
            step: "05",
            title: "Deliver",
            desc: "We test, deploy and deliver great software on time.",
          },
          {
            step: "06",
            title: "Support",
            desc: "We provide ongoing support and continuous improvement.",
          },
        ];

  return (
    <section className="py-20 bg-[#EEF4F8] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center sm:text-left">
          <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
            {content.subtitle || "OUR PROCESS"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
            {content.heading || "A Collaborative Process That Delivers Results"}
          </h2>
        </div>

        {/* 6 Step Horizontal Process Container */}
        <div className="relative pt-2">
          {/* Connector line for desktop running through the floating icons */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 border-t-2 border-dashed border-slate-300 z-0" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {steps.map((proc: any, idx: number) => {
              const ProcessIcon = defaultIcons[idx % defaultIcons.length];
              const stepLabel =
                proc.step ||
                (proc.stepNumber ? `0${proc.stepNumber}` : `0${idx + 1}`);

              return (
                <div key={idx} className="group flex flex-col items-center">
                  {/* Icon Circle COMPLETELY OUTSIDE & ABOVE the Card Box */}
                  <div className="w-14 h-14 rounded-full bg-white text-[#0E7C86] border-2 border-slate-200 flex items-center justify-center shadow-md mb-5 transition-all duration-300 group-hover:bg-[#0E7C86] group-hover:text-white group-hover:border-[#2CCFD3] group-hover:shadow-[0_0_24px_rgba(44,207,211,0.75)] group-hover:scale-110 z-10">
                    <ProcessIcon className="w-6 h-6 transition-transform duration-300" />
                  </div>

                  {/* Card Container below the icon */}
                  <div className="w-full bg-[#F7F9FB] border border-slate-200 rounded-2xl p-5 text-center transition-all duration-300 shadow-sm group-hover:border-[#0E7C86] group-hover:shadow-xl group-hover:shadow-[#0E7C86]/10 group-hover:-translate-y-1 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#0E7C86] font-mono mb-1">
                        {stepLabel}
                      </div>
                      <h3 className="text-sm font-bold font-heading text-[#0B1623] mb-2">
                        {proc.title}
                      </h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {proc.desc || proc.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
