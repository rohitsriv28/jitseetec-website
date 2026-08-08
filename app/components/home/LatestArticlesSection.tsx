"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Quote } from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

export default function LatestArticlesSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const [testimonials, setTestimonials] = useState<any[]>([
    {
      quote:
        "JitSeeTec delivered our project on time and exceeded our expectations. Their team is highly skilled, professional and responsive.",
      author: "Rohit Sharma",
      role: "CEO",
      company: "Finova",
      avatar: "RS",
    },
    {
      quote:
        "Their dedication and technical expertise helped us launch our app successfully. Highly recommended!",
      author: "Priya Nair",
      role: "Product Manager",
      company: "MediFlow",
      avatar: "PN",
    },
    {
      quote:
        "Excellent communication and a seamless development process. We'll definitely work with them again.",
      author: "James Carter",
      role: "Founder",
      company: "ShopHub",
      avatar: "JC",
    },
    {
      quote:
        "Working with JitSeeTec was a seamless experience. They built a robust LMS that handles thousands of concurrent learners without a hitch.",
      author: "Ananya Singh",
      role: "CTO",
      company: "EduSphere",
      avatar: "AS",
    },
    {
      quote:
        "The fleet tracking system they built reduced our operational costs by 30%. Highly recommend their engineering team.",
      author: "Lucas Fernandez",
      role: "Operations Head",
      company: "TranspoTrack",
      avatar: "LF",
    },
  ]);

  const [articles, setArticles] = useState<any[]>([
    {
      date: "May 20, 2024",
      category: "Web Development",
      title: "Top 10 Web Development Trends to Watch in 2024",
      readTime: "5 min read",
      slug: "web-development-trends-2024",
    },
    {
      date: "May 15, 2024",
      category: "Cloud",
      title: "Why Cloud Migration Is Essential for Your Business",
      readTime: "6 min read",
      slug: "cloud-migration-essential",
    },
    {
      date: "May 10, 2024",
      category: "Mobile",
      title: "Cross-Platform vs Native App Development: Which to Choose?",
      readTime: "4 min read",
      slug: "cross-platform-vs-native",
    },
  ]);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setTestimonials(json.data);
        }
      }
    } catch (e) {
      // fallback
    }
  };

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setArticles(json.data.slice(0, 3));
        }
      }
    } catch (e) {
      // fallback
    }
  };

  useEffect(() => {
    fetchTestimonials();
    fetchArticles();

    const unsubscribe = subscribeToCmsUpdate((key) => {
      if (
        !key ||
        key === "testimonials" ||
        key === "testimonials_module" ||
        key === "blogs" ||
        key === "blogs_module"
      ) {
        fetchTestimonials();
        fetchArticles();
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
    <>
      {/* Testimonials Card Section */}
      <section className="py-12 sm:py-20 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-[#0B1623] border border-slate-800 rounded-3xl p-5 sm:p-10 relative overflow-hidden shadow-2xl text-white"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0E7C86]/20 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-6 sm:space-y-8">
              {/* Header Title */}
              <div>
                <span className="text-[#2CCFD3] text-xs font-semibold tracking-wider uppercase font-heading">
                  WHAT OUR CLIENTS SAY
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mt-1.5">
                  Trusted by Businesses Around the World
                </h2>
              </div>

              {/* Slider Viewport & Track */}
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
                    const authorName = t.author || t.name || "Client";
                    const avatarText =
                      t.avatar ||
                      (authorName
                        ? authorName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                        : "CL");

                    return (
                      <div
                        key={t._id ? `${t._id}-${idx}` : `test-${idx}`}
                        onClick={() => setActiveTestimonial(originalIdx)}
                        className={`w-full md:w-[calc((100%-3rem)/3)] shrink-0 p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between box-border ${
                          isSelected
                            ? "bg-[#162533] border-[#2CCFD3] shadow-lg ring-1 ring-[#2CCFD3]/50"
                            : "bg-[#162533]/50 border-slate-700/60 hover:bg-[#162533]"
                        }`}
                      >
                        <div>
                          <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-[#0E7C86] mb-3 opacity-60" />
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 italic">
                            &quot;{t.quote || t.content || t.comment}&quot;
                          </p>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0E7C86] text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
                            {avatarText}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm font-bold text-white truncate">
                              {authorName}
                            </div>
                            <div className="text-[11px] sm:text-xs text-slate-400 truncate">
                              {getRoleText(t.role || t.designation, t.company)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Indicator Dots for Testimonials */}
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
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="py-12 sm:py-20 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
                LATEST INSIGHTS
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
                Read Our Latest
                <br />
                Articles & News
              </h2>
            </div>

            <Link
              href="/resources"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:border-[#0E7C86] hover:text-[#0E7C86] transition-colors self-start sm:self-auto"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {articles.map((article, idx) => (
              <div
                key={article._id || idx}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-[#0E7C86] transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div className="h-36 sm:h-40 bg-gradient-to-br from-[#0E7C86]/10 to-slate-50 p-5 sm:p-6 flex flex-col justify-between">
                  <span className="self-start px-3 py-1 rounded-full bg-white text-[#0E7C86] text-[11px] font-bold shadow-sm">
                    {article.category || "Insight"}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date ||
                      (article.createdAt
                        ? new Date(article.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )
                        : "May 2024")}
                  </span>
                </div>
                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#0B1623] group-hover:text-[#0E7C86] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
                    <span>{article.readTime || "5 min read"}</span>
                    <Link
                      href={article.slug ? `/blog/${article.slug}` : "/blog"}
                      className="text-[#0E7C86] font-bold group-hover:underline flex items-center gap-1"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
