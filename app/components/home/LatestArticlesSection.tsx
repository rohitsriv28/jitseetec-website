"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Quote } from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

export default function LatestArticlesSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const [testimonials, setTestimonials] = useState<any[]>([
    {
      quote:
        "JitSeeTec delivered our project on time and exceeded our expectations. Their team is highly skilled, professional and responsive.",
      author: "Rohit Sharma",
      role: "CEO, Finova",
      avatar: "RS",
    },
    {
      quote:
        "Their dedication and technical expertise helped us launch our app successfully. Highly recommended!",
      author: "Priya Nair",
      role: "Product Manager, MediFlow",
      avatar: "PN",
    },
    {
      quote:
        "Excellent communication and a seamless development process. We'll definitely work with them again.",
      author: "James Carter",
      role: "Founder, ShopHub",
      avatar: "JC",
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

  return (
    <>
      {/* Testimonials Card Section */}
      <section className="py-20 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B1623] border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0E7C86]/20 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-8">
              <div>
                <span className="text-[#2CCFD3] text-xs font-semibold tracking-wider uppercase font-heading">
                  WHAT OUR CLIENTS SAY
                </span>
                <h2 className="text-3xl font-bold font-heading text-white mt-2">
                  Trusted by Businesses Around the World
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t, idx) => {
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
                      key={t._id || idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                        activeTestimonial === idx
                          ? "bg-[#162533] border-[#2CCFD3] shadow-lg"
                          : "bg-[#162533]/50 border-slate-700/60 hover:bg-[#162533]"
                      }`}
                    >
                      <Quote className="w-8 h-8 text-[#0E7C86] mb-4 opacity-60" />
                      <p className="text-xs text-slate-300 leading-relaxed mb-6 italic">
                        &quot;{t.quote || t.content || t.comment}&quot;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0E7C86] text-white font-bold text-sm flex items-center justify-center">
                          {avatarText}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">
                            {authorName}
                          </div>
                          <div className="text-xs text-slate-400">
                            {t.role || t.designation || t.company || "Client"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-2 pt-4">
                {testimonials.map((_, idx) => (
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
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="py-20 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
                LATEST INSIGHTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
                Read Our Latest
                <br />
                Articles & News
              </h2>
            </div>

            <Link
              href="/resources"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:border-[#0E7C86] hover:text-[#0E7C86] transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <div
                key={article._id || idx}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-[#0E7C86] transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div className="h-40 bg-gradient-to-br from-[#0E7C86]/10 to-slate-50 p-6 flex flex-col justify-between">
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
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-lg font-bold font-heading text-[#0B1623] group-hover:text-[#0E7C86] transition-colors leading-snug">
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
