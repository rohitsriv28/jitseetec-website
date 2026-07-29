"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, Rocket, Users, Code2 } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-16 bg-[#0B1623] bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2CCFD3]">About Us</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="text-[#2CCFD3] text-xs font-semibold tracking-wider uppercase font-heading">
              ABOUT US
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-tight">
              Building Digital Solutions.
              <br />
              Empowering <span className="text-[#2CCFD3]">Growth.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              JitSeeTec is a technology company that helps startups, SMEs, and
              enterprises turn ideas into powerful digital products. We combine
              modern technologies, agile processes, and a user-first mindset to
              deliver solutions that drive real business impact.
            </p>

            {/* 4 Quick Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold font-heading text-white">
                    2022
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Founded
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] flex items-center justify-center shrink-0">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold font-heading text-[#2CCFD3]">
                    14+
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Projects Delivered
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold font-heading text-white">
                    10+
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Happy Clients
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] flex items-center justify-center shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold font-heading text-[#2CCFD3]">
                    4+
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Technologies
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Office Photo Mockup */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 group">
              <Image
                src="/images/about_office_hero.png"
                alt="JitSeeTec Corporate Office Headquarters"
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
