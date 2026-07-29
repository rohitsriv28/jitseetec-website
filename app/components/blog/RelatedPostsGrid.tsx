"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

export default function RelatedPostsGrid() {
  const posts = [
    {
      badge: "CLOUD & DEVOPS",
      title: "Cloud-Native Architecture: Why It Matters",
      date: "Apr 30, 2024",
      readTime: "7 min read",
      image: "/images/services_hero_3d.png",
    },
    {
      badge: "UI/UX DESIGN",
      title: "10 UI/UX Design Trends for 2024",
      date: "Apr 25, 2024",
      readTime: "5 min read",
      image: "/images/shophub_platform.png",
    },
    {
      badge: "MOBILE DEVELOPMENT",
      title: "Flutter vs React Native: Which One to Choose?",
      date: "May 5, 2024",
      readTime: "4 min read",
      image: "/images/mediflow_app.png",
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold font-heading text-[#0B1623] mb-8">
          You Might Also Like
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <Link
              key={idx}
              href="/blog"
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-[#0E7C86] hover:shadow-xl transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-[#0E7C86] text-[10px] font-bold shadow-sm backdrop-blur-md">
                    {post.badge}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-base font-bold font-heading text-[#0B1623] group-hover:text-[#0E7C86] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium pt-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#0E7C86]" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
