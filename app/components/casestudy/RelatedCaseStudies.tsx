"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RelatedCaseStudies() {
  const caseStudies = [
    {
      title: "FinTrack – Personal Finance Management Platform",
      badge: "Fintech",
      image: "/images/finova_dashboard.png",
    },
    {
      title: "EduLearn – Online Learning Management System",
      badge: "Education",
      image: "/images/edusphere_lms.png",
    },
    {
      title: "BuildFlow – Construction Project Management Tool",
      badge: "Construction",
      image: "/images/urban_nest.png",
    },
    {
      title: "ShopEase – E-commerce Platform Redesign",
      badge: "E-commerce",
      image: "/images/shophub_platform.png",
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-heading text-[#0B1623]">
            Related Case Studies
          </h2>
          <Link
            href="/portfolio"
            className="text-xs font-bold text-[#0E7C86] hover:underline flex items-center gap-1.5"
          >
            <span>View all case studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {caseStudies.map((cs, idx) => (
            <Link
              key={idx}
              href="/case-studies"
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-[#0E7C86] hover:shadow-xl transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <Image
                    src={cs.image}
                    alt={cs.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-sm font-bold font-heading text-[#0B1623] group-hover:text-[#0E7C86] transition-colors leading-snug line-clamp-2">
                    {cs.title}
                  </h3>
                  <span className="inline-block text-[10px] font-bold text-[#0E7C86] bg-[#0E7C86]/10 px-2.5 py-1 rounded-full">
                    {cs.badge}
                  </span>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#0E7C86] group-hover:underline">
                  <span>View Case Study</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
