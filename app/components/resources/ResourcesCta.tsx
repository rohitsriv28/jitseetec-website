"use client";

import React, { useEffect, useState } from "react";
import { Send, ArrowRight } from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

interface ResourcesCtaProps {
  onOpenConsultation: () => void;
}

export default function ResourcesCta({
  onOpenConsultation,
}: ResourcesCtaProps) {
  const [content, setContent] = useState<any>({
    title: "Need Help with Your Digital Project?",
    description:
      "Our experts are ready to discuss your ideas and help you build the right solution.",
    buttonLabel: "Talk to an Expert",
  });

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content/resources_cta");
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
      if (!key || key === "resources_cta") fetchContent();
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-16 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1623] border border-slate-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden text-white">
          <div className="flex items-center gap-5 z-10">
            <div className="w-14 h-14 rounded-full bg-white text-[#0E7C86] flex items-center justify-center shrink-0 shadow-lg">
              <Send className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                {content.title || "Need Help with Your Digital Project?"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                {content.description}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenConsultation}
            className="z-10 shrink-0 px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl transition-all shadow-xl flex items-center gap-2"
          >
            <span>{content.buttonLabel || "Talk to an Expert"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
