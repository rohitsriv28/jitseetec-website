"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PostNavigation() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 border-t border-b border-slate-200 py-6">
      {/* Previous Post */}
      <Link
        href="/resources#blog"
        className="group p-4 bg-[#F7F9FB] border border-slate-200 rounded-2xl flex items-center gap-4 hover:border-[#0E7C86] transition-all shadow-sm"
      >
        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-200">
          <Image
            src="/images/mediflow_app.png"
            alt="Building Scalable Mobile Apps"
            fill
            sizes="56px"
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-bold text-[#0E7C86] uppercase tracking-wider">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            <span>Previous Post</span>
          </div>
          <h4 className="text-xs font-bold font-heading text-[#0B1623] group-hover:text-[#0E7C86] transition-colors line-clamp-1">
            Building Scalable Mobile Apps: Best Practices
          </h4>
        </div>
      </Link>

      {/* Next Post */}
      <Link
        href="/resources#blog"
        className="group p-4 bg-[#F7F9FB] border border-slate-200 rounded-2xl flex items-center justify-between gap-4 hover:border-[#0E7C86] transition-all shadow-sm text-right"
      >
        <div className="space-y-1 text-right flex-1">
          <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-[#0E7C86] uppercase tracking-wider">
            <span>Next Post</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="text-xs font-bold font-heading text-[#0B1623] group-hover:text-[#0E7C86] transition-colors line-clamp-1">
            The Power of Minimal UI in Modern Design
          </h4>
        </div>
        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-200">
          <Image
            src="/images/shophub_platform.png"
            alt="The Power of Minimal UI"
            fill
            sizes="56px"
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>
      </Link>
    </div>
  );
}
