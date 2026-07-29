"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Share2, ArrowRight, Sparkles } from "lucide-react";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

interface CaseStudySidebarProps {
  onOpenConsultation: () => void;
}

export default function CaseStudySidebar({
  onOpenConsultation,
}: CaseStudySidebarProps) {
  const [copied, setCopied] = useState(false);

  const categories = [
    { name: "Healthcare", count: 12 },
    { name: "Web Development", count: 18 },
    { name: "UI/UX Design", count: 15 },
    { name: "SaaS Platform", count: 10 },
    { name: "Patient Management", count: 8 },
  ];

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <aside className="space-y-8">
      {/* 1. Share Widget */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-xs font-bold font-heading text-[#0B1623] uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">
          Share this case study
        </h3>
        <div className="flex items-center gap-3">
          <a
            href="https://facebook.com/share"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-xl bg-[#F7F9FB] hover:bg-[#0E7C86] text-slate-600 hover:text-white flex items-center justify-center transition-colors border border-slate-200"
          >
            <FaFacebook className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com/share"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-xl bg-[#F7F9FB] hover:bg-[#0E7C86] text-slate-600 hover:text-white flex items-center justify-center transition-colors border border-slate-200"
          >
            <FaTwitter className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/share"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-xl bg-[#F7F9FB] hover:bg-[#0E7C86] text-slate-600 hover:text-white flex items-center justify-center transition-colors border border-slate-200"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          <button
            onClick={handleCopyLink}
            className="w-9 h-9 rounded-xl bg-[#F7F9FB] hover:bg-[#0E7C86] text-slate-600 hover:text-white flex items-center justify-center transition-colors border border-slate-200 relative"
            title="Copy Link"
          >
            <Share2 className="w-4 h-4" />
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. Project Categories Widget */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-xs font-bold font-heading text-[#0B1623] uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">
          Project Categories
        </h3>
        <div className="space-y-2.5 text-xs">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href="/portfolio"
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#0E7C86] font-medium transition-colors"
            >
              <span>{cat.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-mono text-[10px]">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Have a Similar Project in Mind? CTA Card */}
      <div className="bg-[#0B1623] border border-slate-800 rounded-3xl p-6 shadow-xl text-white space-y-4">
        <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] flex items-center justify-center">
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold font-heading leading-snug">
          Have a similar project in mind?
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Let&apos;s build something impactful together. Reach out to hear about
          our ideas.
        </p>
        <button
          onClick={onOpenConsultation}
          className="w-full py-3 bg-[#2CCFD3] hover:bg-[#0E7C86] text-[#0B1623] hover:text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
        >
          <span>Start a Project</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
