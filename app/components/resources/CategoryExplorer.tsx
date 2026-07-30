"use client";

import React from "react";
import Link from "next/link";
import { Edit3, Briefcase, HelpCircle, Code2, ArrowRight } from "lucide-react";

export default function CategoryExplorer() {
  const categories = [
    {
      title: "Blog",
      desc: "Latest articles, industry insights, and expert opinions on technology and business.",
      icon: Edit3,
      linkText: "Explore Blog",
    },
    {
      title: "Case Studies",
      desc: "In-depth stories of how we solved real challenges and delivered measurable results.",
      icon: Briefcase,
      linkText: "Explore Case Studies",
    },
    {
      title: "FAQs",
      desc: "Find answers to common questions about our services, process, and engagement.",
      icon: HelpCircle,
      linkText: "Explore FAQs",
    },
    {
      title: "Technology Stack",
      desc: "Discover the technologies and tools we use to build scalable digital solutions.",
      icon: Code2,
      linkText: "Explore Technologies",
    },
  ];

  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
            RESOURCES BY CATEGORY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
            Everything You Need to Succeed
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-[#0E7C86] hover:shadow-xl transition-all shadow-sm group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-6 group-hover:bg-[#0E7C86] group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-[#0B1623] mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href="#blog"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7C86] hover:underline transition-colors"
                  >
                    <span>{cat.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
