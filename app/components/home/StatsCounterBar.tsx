"use client";

import React from "react";
import { Rocket, Smile, Calendar, Code2, Globe } from "lucide-react";

export default function StatsCounterBar() {
  return (
    <section className="py-12 bg-[#EEF4F8] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* Stat 1 */}
          <div className="pt-4 md:pt-0 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-2">
              <Rocket className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623]">
              14+
            </div>
            <div className="text-xs text-slate-600 mt-1 font-medium">
              Projects Delivered
            </div>
          </div>

          {/* Stat 2 */}
          <div className="pt-4 md:pt-0 md:pl-4 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-2">
              <Smile className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0E7C86]">
              95%
            </div>
            <div className="text-xs text-slate-600 mt-1 font-medium">
              Client Satisfaction
            </div>
          </div>

          {/* Stat 3 */}
          <div className="pt-4 md:pt-0 md:pl-4 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623]">
              4+
            </div>
            <div className="text-xs text-slate-600 mt-1 font-medium">
              Years of Experience
            </div>
          </div>

          {/* Stat 4 */}
          <div className="pt-4 md:pt-0 md:pl-4 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-2">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0E7C86]">
              10+
            </div>
            <div className="text-xs text-slate-600 mt-1 font-medium">
              Technologies
            </div>
          </div>

          {/* Stat 5 */}
          <div className="pt-4 md:pt-0 md:pl-4 col-span-2 md:col-span-1 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-2">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623]">
              8
            </div>
            <div className="text-xs text-slate-600 mt-1 font-medium">
              Countries Served
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
