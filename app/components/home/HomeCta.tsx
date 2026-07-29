"use client";

import React from "react";
import { Send, ArrowRight } from "lucide-react";

interface HomeCtaProps {
  onOpenConsultation: () => void;
}

export default function HomeCta({ onOpenConsultation }: HomeCtaProps) {
  return (
    <section className="py-16 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0E7C86] to-[#125860] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden text-white">
          {/* Left Side Info */}
          <div className="flex items-center gap-5 z-10">
            <div className="w-14 h-14 rounded-full bg-white text-[#0E7C86] flex items-center justify-center shrink-0 shadow-lg">
              <Send className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Have a Project in Mind?
              </h2>
              <p className="text-xs sm:text-sm text-teal-100">
                Let&apos;s discuss how we can help you turn your ideas into
                powerful digital solutions.
              </p>
            </div>
          </div>

          {/* Right Side Button */}
          <button
            onClick={onOpenConsultation}
            className="z-10 shrink-0 px-8 py-3.5 bg-[#0B1623] hover:bg-[#2CCFD3] hover:text-[#0B1623] text-white font-bold text-xs rounded-xl transition-all shadow-xl flex items-center gap-2"
          >
            <span>Get In Touch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
