"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, Zap, ShieldCheck } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-16 bg-[#0B1623] bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2CCFD3]">Contact</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-tight">
              Let&apos;s Build Something
              <br />
              Great <span className="text-[#2CCFD3]">Together</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Have a project in mind or need expert advice? We&apos;d love to
              hear from you. Fill out the form or reach out using any of the
              options below.
            </p>

            {/* 3 Key Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">
                    Quick Response
                  </div>
                  <div className="text-[11px] text-slate-400">
                    We reply within 24 hours
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">
                    Expert Consultation
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Get the right solution
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">
                    100% Confidential
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Your idea is safe with us
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Image */}
          <div className="lg:col-span-5 hidden lg:flex justify-center lg:justify-end">
            <Image
              src="/images/contact_hero_3d.png"
              alt="Contact 3D Digital Envelope Graphic"
              width={550}
              height={420}
              className="w-full h-auto object-contain pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
