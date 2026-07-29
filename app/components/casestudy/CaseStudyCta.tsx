"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CaseStudyCtaProps {
  onOpenConsultation: () => void;
}

export default function CaseStudyCta({
  onOpenConsultation,
}: CaseStudyCtaProps) {
  return (
    <section className="py-16 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1623] border border-slate-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden text-white">
          <div className="space-y-2 text-center md:text-left z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Ready to build your success story?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Let&apos;s create something amazing together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 z-10 w-full md:w-auto">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#2CCFD3] hover:bg-[#0E7C86] hover:text-white text-[#0B1623] font-bold text-xs rounded-xl transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/portfolio"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>View Our Work</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
