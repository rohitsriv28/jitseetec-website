"use client";

import React, { useEffect, useState, useRef } from "react";
import { Quote, Star } from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

export default function ClientTestimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const json = await res.json();
        const list = json.testimonials || json.data || json || [];
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
      if (!key || key === "testimonials_module" || key === "testimonials") {
        fetchTestimonials();
      }
    });

    return () => unsubscribe();
  }, []);

  // Auto-slide every 3 seconds unless hovered
  useEffect(() => {
    if (isHovered || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, testimonials.length]);

  const nextSlide = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsHovered(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }

    touchStartX.current = null;
    setIsHovered(false);
  };

  const getInitials = (name: string) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "CL";
  };

  const getRoleText = (role?: string, company?: string) => {
    const r = (role || "").trim();
    const c = (company || "").trim();
    if (!r) return c || "Client";
    if (!c) return r;
    if (r.toLowerCase().includes(c.toLowerCase())) return r;
    return `${r}, ${c}`;
  };

  const displayTestimonials =
    testimonials.length > 0 ? [...testimonials, ...testimonials] : [];

  return (
    <section className="py-12 sm:py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="bg-[#0B1623] border border-slate-800 rounded-3xl p-5 sm:p-10 relative overflow-hidden shadow-2xl text-white"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0E7C86]/20 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6 sm:space-y-8">
            {/* Header Controls */}
            <div>
              <span className="text-[#2CCFD3] text-xs font-semibold tracking-wider uppercase font-heading">
                CLIENT SUCCESS STORIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mt-1.5">
                What Our Clients Say About Us
              </h2>
            </div>

            {/* Skeleton Loading */}
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
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-10 h-10 rounded-full bg-slate-700" />
                      <div className="space-y-1">
                        <div className="h-3 w-24 bg-slate-700 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Testimonials Slider Track */}
            {!loading && testimonials.length > 0 && (
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="overflow-hidden py-2 px-1 select-none touch-pan-y"
              >
                <div
                  className="flex gap-4 md:gap-6 transition-transform duration-500 ease-in-out [--slide-step:calc(100%+1rem)] md:[--slide-step:calc((100%+1.5rem)/3)]"
                  style={{
                    transform: `translateX(calc(-${activeTestimonial} * var(--slide-step)))`,
                  }}
                >
                  {displayTestimonials.map((t, idx) => {
                    const originalIdx = idx % testimonials.length;
                    const isSelected = activeTestimonial === originalIdx;

                    return (
                      <div
                        key={t._id ? `${t._id}-${idx}` : `t-${idx}`}
                        onClick={() => setActiveTestimonial(originalIdx)}
                        className={`w-full md:w-[calc((100%-3rem)/3)] shrink-0 p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between box-border ${
                          isSelected
                            ? "bg-[#162533] border-[#2CCFD3] shadow-lg ring-1 ring-[#2CCFD3]/50"
                            : "bg-[#162533]/50 border-slate-700/60 hover:bg-[#162533]"
                        }`}
                      >
                        <div>
                          <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-[#0E7C86] mb-3 opacity-60" />

                          {t.rating && (
                            <div className="flex items-center gap-0.5 mb-3">
                              {[...Array(t.rating)].map((_, si) => (
                                <Star
                                  key={si}
                                  className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                                />
                              ))}
                            </div>
                          )}

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 italic">
                            &quot;{t.quote}&quot;
                          </p>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0E7C86] text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
                            {getInitials(t.author)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm font-bold text-white truncate">
                              {t.author}
                            </div>
                            <div className="text-[11px] sm:text-xs text-slate-400 truncate">
                              {getRoleText(t.role, t.company)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {!loading && testimonials.length === 0 && (
              <p className="text-center text-slate-400 text-sm py-8">
                No testimonials found.
              </p>
            )}

            {/* Dots Navigation */}
            {!loading && testimonials.length > 0 && (
              <div className="flex items-center justify-center gap-2 pt-2 sm:pt-4">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2 sm:h-2.5 rounded-full transition-all ${
                      activeTestimonial === idx
                        ? "w-6 sm:w-8 bg-[#2CCFD3]"
                        : "w-2 sm:w-2.5 bg-slate-700 hover:bg-slate-500"
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
