"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

export default function FeaturedCaseStudies() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCaseStudies = async () => {
    try {
      const res = await fetch("/api/case-studies?status=published");
      if (res.ok) {
        const json = await res.json();
        const list = json.data || json.caseStudies || json || [];
        setCaseStudies(list.slice(0, 3));
      }
    } catch (e) {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
    const unsubscribe = subscribeToCmsUpdate((key) => {
      if (!key || key === "cases_module") fetchCaseStudies();
    });
    return () => unsubscribe();
  }, []);

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

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-3xl overflow-hidden animate-pulse">
                <div className="h-48 bg-slate-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-full" />
                  <div className="grid grid-cols-3 gap-2 pt-3">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-12 bg-slate-100 rounded-xl" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Case Study Cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.length === 0 ? (
              <p className="col-span-3 text-center text-slate-400 text-sm py-16">No case studies found.</p>
            ) : (
              caseStudies.map((cs, idx) => (
                <div
                  key={cs._id || idx}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-[#0E7C86] hover:shadow-xl transition-all shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <Image
                        src={cs.coverImage || "/images/placeholder.png"}
                        alt={cs.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-[#0E7C86] text-[11px] font-bold shadow-sm backdrop-blur-md">
                        {cs.industry}
                      </span>
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold font-heading text-[#0B1623] group-hover:text-[#0E7C86] transition-colors">
                        {cs.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {cs.challenge?.slice(0, 120)}{cs.challenge?.length > 120 ? "…" : ""}
                      </p>

                      {cs.metrics && cs.metrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
                          {cs.metrics.slice(0, 3).map((m: any, i: number) => (
                            <div key={i} className="bg-[#F7F9FB] rounded-xl p-2">
                              <div className="text-sm font-extrabold text-[#0E7C86] font-heading">{m.val}</div>
                              <div className="text-[9px] text-slate-500 font-medium">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      href="/case-studies"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7C86] group-hover:underline"
                    >
                      <span>Read Full Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
