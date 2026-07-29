"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedCaseStudies() {
  const caseStudies = [
    {
      badge: "Fintech",
      title: "Finova Dashboard",
      desc: "A real-time financial management platform that helps businesses track, analyze, and optimize their finances effortlessly.",
      metrics: [
        { label: "Time Saved", val: "40%" },
        { label: "Faster Reporting", val: "60%" },
        { label: "Users Impacted", val: "100K+" },
      ],
      image: "/images/finova_dashboard.png",
    },
    {
      badge: "Healthcare",
      title: "MediFlow App",
      desc: "A telemedicine app connecting doctors and patients seamlessly with secure consultations, appointments, and e-prescriptions.",
      metrics: [
        { label: "Increase in Appointments", val: "70%" },
        { label: "User Rating", val: "4.8★" },
        { label: "Downloads", val: "50K+" },
      ],
      image: "/images/mediflow_app.png",
    },
    {
      badge: "E-commerce",
      title: "ShopHub Platform",
      desc: "An advanced e-commerce platform with AI-powered recommendations, secure payments, and streamlined order management.",
      metrics: [
        { label: "More Conversions", val: "35%" },
        { label: "Higher AOV", val: "25%" },
        { label: "Orders Processed", val: "200K+" },
      ],
      image: "/images/shophub_platform.png",
    },
  ];

  return (
    <section className="py-20 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
              CASE STUDIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
              Real Impact. Measurable Results.
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#0E7C86] hover:underline"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((cs, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-[#0E7C86] hover:shadow-xl transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <Image
                    src={cs.image}
                    alt={cs.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-[#0E7C86] text-[11px] font-bold shadow-sm backdrop-blur-md">
                    {cs.badge}
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold font-heading text-[#0B1623] group-hover:text-[#0E7C86] transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cs.desc}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
                    {cs.metrics.map((m, i) => (
                      <div key={i} className="bg-[#F7F9FB] rounded-xl p-2">
                        <div className="text-sm font-extrabold text-[#0E7C86] font-heading">
                          {m.val}
                        </div>
                        <div className="text-[9px] text-slate-500 font-medium">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7C86] group-hover:underline"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
