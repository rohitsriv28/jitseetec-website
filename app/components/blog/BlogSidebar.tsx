"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, CheckCircle2 } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export default function BlogSidebar() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  const relatedPosts = [
    {
      title: "Modern Web Development Trends to Watch in 2024",
      date: "May 15, 2024",
      image: "/images/finova_dashboard.png",
    },
    {
      title: "Building Scalable Mobile Apps: Best Practices",
      date: "May 8, 2024",
      image: "/images/mediflow_app.png",
    },
    {
      title: "Cloud-Native Architecture: Why It Matters",
      date: "Apr 30, 2024",
      image: "/images/services_hero_3d.png",
    },
    {
      title: "The Ultimate Guide to API Security",
      date: "Apr 24, 2024",
      image: "/images/shophub_platform.png",
    },
  ];

  const categories = [
    { name: "Web Development", count: 18 },
    { name: "Mobile Development", count: 14 },
    { name: "UI/UX Design", count: 8 },
    { name: "Business & Strategy", count: 6 },
  ];

  const tags = [
    "React",
    "Next.js",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "DevOps",
    "Docker",
    "UI/UX",
    "MongoDB",
    "API",
    "Performance",
  ];

  return (
    <aside className="space-y-8">
      {/* 1. About the Author Widget */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-center">
        <h3 className="text-sm font-bold font-heading text-[#0B1623] mb-4 text-left border-b border-slate-100 pb-3">
          About the Author
        </h3>
        <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-slate-200 shadow-md">
          <Image
            src="/images/rohit_kumar_author.png"
            alt="Rohit Kumar"
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <h4 className="text-base font-bold font-heading text-[#0B1623]">
          Rohit Kumar
        </h4>
        <div className="text-xs font-semibold text-[#0E7C86] mb-3">
          Senior Developer
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Passionate about building performant applications and exploring new
          technologies.
        </p>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-[#0E7C86] hover:text-white transition-colors"
        >
          <FaLinkedin className="w-4 h-4" />
        </a>
      </div>

      {/* 2. Related Posts Widget */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-bold font-heading text-[#0B1623] mb-4 border-b border-slate-100 pb-3">
          Related Posts
        </h3>
        <div className="space-y-4">
          {relatedPosts.map((post, idx) => (
            <Link
              key={idx}
              href="/blog"
              className="flex items-center gap-3 group"
            >
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="56px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0B1623] group-hover:text-[#0E7C86] transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h4>
                <div className="text-[10px] text-slate-400 font-medium mt-1">
                  {post.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Categories Widget */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-bold font-heading text-[#0B1623] mb-4 border-b border-slate-100 pb-3">
          Categories
        </h3>
        <div className="space-y-2.5 text-xs">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href="/resources#blog"
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

      {/* 4. Newsletter Subscription Widget */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold font-heading text-[#0B1623] mb-2">
          Stay Ahead with Expert Insights
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-6">
          Subscribe to our newsletter and get the latest articles, guides, and
          industry updates straight to your inbox.
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-[#F7F9FB] border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0E7C86] transition-all"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#0E7C86] hover:bg-[#0B6871] text-white font-bold text-xs rounded-xl transition-all shadow-md"
            >
              Subscribe
            </button>
            <div className="text-[10px] text-slate-400 font-medium">
              No spam. Unsubscribe anytime.
            </div>
          </form>
        ) : (
          <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Thank you for subscribing!</span>
          </div>
        )}
      </div>

      {/* 5. Popular Tags Widget */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-bold font-heading text-[#0B1623] mb-4 border-b border-slate-100 pb-3">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <Link
              key={idx}
              href="/resources#blog"
              className="px-3 py-1.5 rounded-xl bg-[#F7F9FB] hover:bg-[#0E7C86] text-slate-600 hover:text-white border border-slate-200 text-xs font-medium transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
