"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

export default function AuthorCard() {
  return (
    <div className="bg-[#F7F9FB] border border-slate-200 rounded-3xl p-6 sm:p-8 my-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
      {/* Avatar */}
      <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
        <Image
          src="/images/rohit_kumar_author.png"
          alt="Rohit Kumar - Senior Developer"
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Info & Bio */}
      <div className="flex-1 space-y-3 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold font-heading text-[#0B1623] flex items-center justify-center sm:justify-start gap-2">
              <span>Rohit Kumar</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#0E7C86] hover:text-[#0B6871] transition-colors"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </h3>
            <div className="text-xs font-medium text-[#0E7C86]">
              Senior Developer
            </div>
          </div>

          <Link
            href="/resources#blog"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#0E7C86] hover:bg-[#0B6871] text-white font-bold text-xs rounded-xl transition-colors shadow-sm self-center sm:self-auto"
          >
            View all posts
          </Link>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Rohit is a full-stack developer with 8+ years of experience building
          scalable web applications. He loves sharing insights on modern
          JavaScript, React, and performance optimization.
        </p>
      </div>
    </div>
  );
}
