"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Globe,
  Users,
  Clock,
  Heart,
  Zap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

const iconMap: Record<string, React.ElementType> = {
  Globe, Users, Clock, Heart, Zap, ShieldCheck,
};

interface AboutCtaProps {
  onOpenConsultation?: () => void;
}

export default function AboutCta({ onOpenConsultation }: AboutCtaProps) {
  const [culture, setCulture] = useState<any>({
    subtitle: "REMOTE CULTURE",
    title: "Remote-First. People-First.",
    description:
      "We believe great work happens when people feel trusted, supported, and empowered to do their best work—wherever they are.",
    perks: [
      { title: "Work From Anywhere", desc: "Flexibility across timezones", icon: "Globe" },
      { title: "Strong Collaboration", desc: "Connected & aligned", icon: "Users" },
      { title: "Flexible Hours", desc: "Focus on outcomes", icon: "Clock" },
      { title: "Wellness First", desc: "Mental health & balance", icon: "Heart" },
      { title: "Learning Culture", desc: "Continuous growth & skills", icon: "Zap" },
      { title: "Open Communication", desc: "Transparency & feedback", icon: "ShieldCheck" },
    ],
    buttonLabel: "Life at JitSeeTec",
  });
  const [cta, setCta] = useState<any>({
    title: "Join Our Mission to Build the Future",
    description:
      "We're always looking for passionate, curious, and collaborative people to join our growing team.",
    buttonLabel: "View Open Positions",
  });

  const fetchCulture = async () => {
    try {
      const res = await fetch("/api/content/about_culture");
      if (res.ok) {
        const json = await res.json();
        if (json.data) setCulture(json.data);
      }
    } catch (e) {
      // fallback
    }
  };

  const fetchCta = async () => {
    try {
      const res = await fetch("/api/content/about_cta");
      if (res.ok) {
        const json = await res.json();
        if (json.data) setCta(json.data);
      }
    } catch (e) {
      // fallback
    }
  };

  useEffect(() => {
    fetchCulture();
    fetchCta();
    const unsubscribe = subscribeToCmsUpdate((key) => {
      if (!key || key === "about_culture") fetchCulture();
      if (!key || key === "about_cta") fetchCta();
    });
    return () => unsubscribe();
  }, []);

  const perks: any[] = culture.perks || [];

  return (
    <>
      {/* REMOTE CULTURE SECTION */}
      <section className="py-20 bg-[#0B1623] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[#2CCFD3] text-xs font-semibold tracking-wider uppercase font-heading">
                {culture.subtitle || "REMOTE CULTURE"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                {culture.title || "Remote-First. People-First."}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {culture.description}
              </p>
              <div className="pt-2">
                <Link
                  href="/about#team"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0E7C86] hover:bg-[#2CCFD3] hover:text-[#0B1623] text-white font-bold text-xs transition-all shadow-lg"
                >
                  <span>{culture.buttonLabel || "Life at JitSeeTec"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perks.map((perk: any, idx: number) => {
                const IconComp = iconMap[perk.icon] || Globe;
                return (
                  <div
                    key={idx}
                    className="p-4 bg-[#162533] border border-slate-700/60 rounded-2xl flex items-center gap-3"
                  >
                    <div className="p-2.5 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {perk.title}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {perk.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0B1623]">
                {cta.title || "Join Our Mission to Build the Future"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                {cta.description}
              </p>
            </div>

            {onOpenConsultation ? (
              <button
                onClick={onOpenConsultation}
                className="shrink-0 px-8 py-3.5 bg-[#0E7C86] hover:bg-[#0B6871] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>{cta.buttonLabel || "Let's Talk"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <a
                href="mailto:hello@jitseetec.com?subject=Career%20Inquiry%20-%20JitSeeTec"
                className="shrink-0 px-8 py-3.5 bg-[#0E7C86] hover:bg-[#0B6871] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>{cta.buttonLabel || "View Open Positions"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
