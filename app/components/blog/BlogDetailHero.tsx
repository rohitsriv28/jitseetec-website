"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, Clock } from "lucide-react";

export default function BlogDetailHero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-16 bg-[#0B1623] bg-grid-pattern text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href="/resources#blog"
            className="hover:text-white transition-colors"
          >
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-400">Web Development</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2CCFD3] truncate max-w-[200px] sm:max-w-none">
            Optimizing Performance in React Applications
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Meta Details */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-block text-[#2CCFD3] text-xs font-bold tracking-wider uppercase font-heading bg-[#0E7C86]/20 px-3 py-1 rounded-md border border-[#0E7C86]/30">
              WEB DEVELOPMENT
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white leading-tight">
              Optimizing Performance in React Applications
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Practical tips and techniques to make your React apps faster and
              more efficient.
            </p>

            {/* Author & Published Info Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 border-t border-slate-800 text-xs">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-700 shrink-0">
                  <Image
                    src="/images/rohit_kumar_author.png"
                    alt="Rohit Kumar - Senior Developer"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white">Rohit Kumar</div>
                  <div className="text-[11px] text-slate-400">
                    Senior Developer
                  </div>
                </div>
              </div>

              <div className="hidden sm:block h-6 w-px bg-slate-800" />

              {/* Date */}
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-[#2CCFD3]" />
                <span>May 12, 2024</span>
              </div>

              <div className="hidden sm:block h-6 w-px bg-slate-800" />

              {/* Read Time */}
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-[#2CCFD3]" />
                <span>6 min read</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Laptop Setup Image */}
          <div className="lg:col-span-5 hidden lg:flex justify-center lg:justify-end">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
              <Image
                src="/images/blog_hero_laptop.png"
                alt="Workspace Laptop with glowing React code"
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
