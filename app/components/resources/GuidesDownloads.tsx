"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Download } from "lucide-react";

export default function GuidesDownloads() {
  const guides = [
    {
      title: "The Ultimate Guide to Building Scalable Web Applications",
      desc: "Best practices, architectures, and tools for building scalable and maintainable web apps.",
      image: "/images/finova_dashboard.png",
    },
    {
      title: "UI/UX Design Process: From Research to Launch",
      desc: "A complete walkthrough of our proven design process to create exceptional user experiences.",
      image: "/images/shophub_platform.png",
    },
    {
      title: "DevOps Handbook for Startups",
      desc: "Essential DevOps practices that help startups deploy faster and scale with confidence.",
      image: "/images/services_hero_3d.png",
    },
  ];

  const downloads = [
    { title: "Project Requirements Checklist", format: "PDF", size: "1.2 MB" },
    { title: "Website Redesign Checklist", format: "PDF", size: "1.1 MB" },
    { title: "Mobile App Development Guide", format: "PDF", size: "2.4 MB" },
  ];

  return (
    <section className="py-20 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Guides Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
                GUIDES & E-BOOKS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
                In-Depth Technical Guides
              </h2>
            </div>

            <Link
              href="/resources"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#0E7C86] hover:underline"
            >
              <span>View All Guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guides.map((guide, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-[#0E7C86] hover:shadow-xl transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold font-heading text-[#0B1623] group-hover:text-[#0E7C86] transition-colors leading-snug">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {guide.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href="/resources"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7C86] group-hover:underline"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Downloads Section */}
        <div>
          <div className="mb-12">
            <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
              FREE DOWNLOADS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
              Templates, Checklists & Whitepapers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {downloads.map((dl, idx) => (
              <div
                key={idx}
                className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-6 flex items-center justify-between hover:border-[#0E7C86] hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B1623] leading-snug">
                      {dl.title}
                    </h4>
                    <div className="text-[10px] text-slate-500 font-medium mt-1">
                      {dl.format} • {dl.size}
                    </div>
                  </div>
                </div>

                <button className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-[#0E7C86] hover:text-white flex items-center justify-center transition-colors shadow-sm shrink-0">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
