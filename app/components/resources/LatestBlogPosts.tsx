"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export default function LatestBlogPosts() {
  const blogPosts = [
    {
      badge: "Web Development",
      title: "Top 10 Web Development Trends to Watch in 2024",
      desc: "Explore the latest trends shaping the future of web development.",
      date: "May 15, 2024",
      readTime: "6 min read",
      image: "/images/finova_dashboard.png",
    },
    {
      badge: "Cloud",
      title: "Why Cloud Migration Is Essential for Your Business",
      desc: "Learn how cloud migration can improve agility, security, and reduce costs.",
      date: "May 8, 2024",
      readTime: "7 min read",
      image: "/images/services_hero_3d.png",
    },
    {
      badge: "Mobile Development",
      title: "Cross-Platform vs Native App Development: Which to Choose?",
      desc: "A detailed comparison to help you choose the right approach for your app.",
      date: "Apr 28, 2024",
      readTime: "5 min read",
      image: "/images/mediflow_app.png",
    },
    {
      badge: "DevOps",
      title: "CI/CD Best Practices for Faster and Reliable Deployments",
      desc: "Implement these DevOps practices to streamline your deployment pipeline.",
      date: "Apr 20, 2024",
      readTime: "4 min read",
      image: "/images/shophub_platform.png",
    },
  ];

  return (
    <section
      id="blog"
      className="py-20 bg-white text-slate-900 border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
              FROM THE BLOG
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
              Latest Articles & Technical Insights
            </h2>
          </div>

          <Link
            href="/resources"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#0E7C86] hover:underline"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-[#0E7C86] hover:shadow-xl transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[#0E7C86] text-[10px] font-bold shadow-sm backdrop-blur-md">
                    {post.badge}
                  </span>
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-heading text-[#0B1623] group-hover:text-[#0E7C86] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {post.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7C86] group-hover:underline"
                >
                  <span>Read Article</span>
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
