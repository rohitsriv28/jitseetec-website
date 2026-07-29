"use client";

import React from "react";
import { Building, Globe, ArrowRight } from "lucide-react";

export default function OfficeCardsSection() {
  return (
    <div className="lg:col-span-6 space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0B1623]">
          Our Offices
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          We work remotely and serve clients worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Office 1 */}
        <div className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-5 text-left hover:border-[#0E7C86] transition-colors shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-3">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold font-heading text-[#0B1623]">
              Headquarters
            </h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Imadol, Lalitpur
              <br />
              Bagmati Province, Nepal
            </p>
          </div>
          <a
            href="https://maps.app.goo.gl/fa84PRvN3VryUcnh7"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E7C86] hover:underline pt-3"
          >
            <span>Get Directions</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Office 2 */}
        <div className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-5 text-left hover:border-[#0E7C86] transition-colors shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-3">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold font-heading text-[#0B1623]">
              Development Center
            </h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Kathmandu, Nepal
              <br />
              Remote-First
            </p>
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E7C86] hover:underline pt-3"
          >
            <span>Get Directions</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Office 3 */}
        <div className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-5 text-left hover:border-[#0E7C86] transition-colors shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-3">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold font-heading text-[#0B1623]">
              Sales Office
            </h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Serving Globally
              <br />
              Worldwide Clients
            </p>
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E7C86] hover:underline pt-3"
          >
            <span>Get Directions</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
