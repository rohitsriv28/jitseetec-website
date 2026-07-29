"use client";

import React from "react";
import {
  Globe,
  Users,
  Clock,
  Heart,
  Zap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface AboutCtaProps {
  onOpenConsultation: () => void;
}

export default function AboutCta({ onOpenConsultation }: AboutCtaProps) {
  return (
    <>
      {/* REMOTE CULTURE SECTION */}
      <section className="py-20 bg-[#0B1623] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[#2CCFD3] text-xs font-semibold tracking-wider uppercase font-heading">
                REMOTE CULTURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                Remote-First.
                <br />
                People-First.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                We believe great work happens when people feel trusted,
                supported, and empowered to do their best work—wherever they are.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0E7C86] hover:bg-[#2CCFD3] hover:text-[#0B1623] text-white font-bold text-xs transition-all shadow-lg"
                >
                  <span>Life at JitSeeTec</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center Column: 6 Feature Pills */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#162533] border border-slate-700/60 rounded-2xl flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    Work From Anywhere
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Flexibility across timezones
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#162533] border border-slate-700/60 rounded-2xl flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    Strong Collaboration
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Connected & aligned
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#162533] border border-slate-700/60 rounded-2xl flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    Flexible Hours
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Focus on outcomes
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#162533] border border-slate-700/60 rounded-2xl flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    Wellness First
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Mental health & balance
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#162533] border border-slate-700/60 rounded-2xl flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    Learning Culture
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Continuous growth & skills
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#162533] border border-slate-700/60 rounded-2xl flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    Open Communication
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Transparency & feedback
                  </div>
                </div>
              </div>
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
                Join Our Mission to Build the Future
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                We&apos;re always looking for passionate, curious, and
                collaborative people to join our growing team.
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="shrink-0 px-8 py-3.5 bg-[#0E7C86] hover:bg-[#0B6871] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>View Open Positions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
