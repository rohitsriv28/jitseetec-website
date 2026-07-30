"use client";

import React, { useEffect, useState } from "react";
import { Target, Eye, Award, CheckCircle2 } from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

export default function MissionVisionValues() {
  const [content, setContent] = useState<any>({
    mission: {
      title: "Our Mission",
      text: "To deliver innovative, reliable, and scalable digital solutions that help businesses operate smarter, move faster, and grow beyond limits.",
    },
    vision: {
      title: "Our Vision",
      text: "To be a globally trusted technology partner recognized for building software that creates meaningful impact.",
    },
    values: {
      title: "Our Values",
      list: [
        "Client Success First",
        "Quality Without Compromise",
        "Integrity & Transparency",
        "Collaboration & Respect",
        "Innovation in Everything We Do",
        "Continuous Learning",
      ],
    },
  });

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content/about_mission_vision");
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
      if (!key || key === "about_mission_vision") fetchContent();
    });
    return () => unsubscribe();
  }, []);

  const valuesList: string[] = content.values?.list || [];

  return (
    <section className="py-16 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#0B1623] mb-3">
                {content.mission?.title || "Our Mission"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {content.mission?.text}
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#0B1623] mb-3">
                {content.vision?.title || "Our Vision"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {content.vision?.text}
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-[#0B1623] mb-4">
              {content.values?.title || "Our Values"}
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
              {valuesList.map((val, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
                  <span>{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
