"use client";

import React, { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

export default function ClientTestimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const json = await res.json();
        const list = json.testimonials || json.data || json || [];
        // Sort by order, then show featured first
        const sorted = [...list].sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (a.order ?? 0) - (b.order ?? 0);
        });
        setTestimonials(sorted);
      }
    } catch (e) {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
    const unsubscribe = subscribeToCmsUpdate((key) => {
      if (!key || key === "testimonials_module") fetchTestimonials();
    });
    return () => unsubscribe();
  }, []);

  // Reset active index if testimonials change
  useEffect(() => {
    setActiveTestimonial(0);
  }, [testimonials.length]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1623] border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0E7C86]/20 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-8">
            <div>
              <span className="text-[#2CCFD3] text-xs font-semibold tracking-wider uppercase font-heading">
                CLIENT SUCCESS STORIES
              </span>
              <h2 className="text-3xl font-bold font-heading text-white mt-2">
                What Our Clients Say About Us
              </h2>
            </div>

            {/* Loading Skeleton */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl border border-slate-700/60 bg-[#162533]/50 animate-pulse space-y-3"
                  >
                    <div className="h-8 w-8 rounded bg-slate-700" />
                    <div className="h-3 bg-slate-700 rounded w-full" />
                    <div className="h-3 bg-slate-700 rounded w-4/5" />
                    <div className="h-3 bg-slate-700 rounded w-3/5" />
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-10 h-10 rounded-full bg-slate-700" />
                      <div className="space-y-1">
                        <div className="h-3 w-24 bg-slate-700 rounded" />
                        <div className="h-2 w-16 bg-slate-700 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Testimonials Grid */}
            {!loading && testimonials.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.slice(0, 3).map((t, idx) => (
                  <div
                    key={t._id || idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                      activeTestimonial === idx
                        ? "bg-[#162533] border-[#2CCFD3] shadow-lg"
                        : "bg-[#162533]/50 border-slate-700/60 hover:bg-[#162533]"
                    }`}
                  >
                    <Quote className="w-8 h-8 text-[#0E7C86] mb-4 opacity-60" />

                    {/* Star Rating */}
                    {t.rating && (
                      <div className="flex items-center gap-0.5 mb-3">
                        {[...Array(t.rating)].map((_, si) => (
                          <Star
                            key={si}
                            className="w-3 h-3 text-amber-400 fill-amber-400"
                          />
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-slate-300 leading-relaxed mb-6 italic">
                      &quot;{t.quote}&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0E7C86] text-white font-bold text-sm flex items-center justify-center shrink-0">
                        {getInitials(t.author)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {t.author}
                        </div>
                        <div className="text-xs text-slate-400">
                          {t.role}
                          {t.company ? `, ${t.company}` : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && testimonials.length === 0 && (
              <p className="text-center text-slate-400 text-sm py-8">
                No testimonials found.
              </p>
            )}

            {/* Dots Navigation */}
            {!loading && testimonials.length > 0 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                {testimonials.slice(0, 3).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2 rounded-full transition-all ${
                      activeTestimonial === idx
                        ? "w-8 bg-[#2CCFD3]"
                        : "w-2 bg-slate-700"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
