"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LeadershipTeam() {
  const team = [
    { name: "Aayush Gupta", role: "Project Manager", initials: "AG" },
    { name: "Mandip Shah", role: "Senior Developer", initials: "MS" },
    { name: "Rohit Srivastava", role: "UI/UX Designer", initials: "RS" },
    { name: "Deepak Karn", role: "DevOps Engineer", initials: "DK" },
    { name: "Prakash Kushwaha", role: "QA Engineer", initials: "PK" },
    { name: "ChhupaRustam Kushwaha", role: "Business Analyst", initials: "CRK" },
  ];

  return (
    <>
      {/* Leadership Section */}
      <section id="team" className="py-20 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
            <div className="lg:col-span-7">
              <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
                LEADERSHIP
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
                Experienced Leaders. Clear Direction.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-slate-600 text-sm leading-relaxed">
                Our leadership team brings together diverse experience and a
                shared passion for technology and people.
              </p>
            </div>
          </div>

          {/* 2 Leadership Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Leader 1: Ronit Kumar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm hover:shadow-md transition-all">
              <div className="relative w-36 h-44 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-md">
                <Image
                  src="/images/leader_ronit.png"
                  alt="Ronit Kumar - Co-Founder & CEO"
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-3 flex-1 text-center sm:text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-[#0B1623]">
                      Ronit Kumar
                    </h3>
                    <div className="text-xs font-bold text-[#0E7C86] mt-0.5">
                      Co-Founder & CEO
                    </div>
                  </div>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 hover:bg-[#0E7C86] hover:text-white flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
                    </svg>
                  </a>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Visionary leader with a passion for building products and teams
                  that create lasting impact. Ronit drives strategy, innovation,
                  and client success at JitSeeTec.
                </p>
                <div className="text-base font-serif italic text-slate-400 font-bold pt-2">
                  Ronit Kumar
                </div>
              </div>
            </div>

            {/* Leader 2: Abhishek Kumar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm hover:shadow-md transition-all">
              <div className="relative w-36 h-44 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-md">
                <Image
                  src="/images/leader_abhishek.png"
                  alt="Abhishek Kumar - Co-Founder & CTO"
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-3 flex-1 text-center sm:text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-[#0B1623]">
                      Abhishek Kumar
                    </h3>
                    <div className="text-xs font-bold text-[#0E7C86] mt-0.5">
                      Co-Founder & CTO
                    </div>
                  </div>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 hover:bg-[#0E7C86] hover:text-white flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
                    </svg>
                  </a>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Technology enthusiast and problem solver who leads our
                  engineering team and ensures we deliver scalable, secure, and
                  high-quality software solutions.
                </p>
                <div className="text-base font-serif italic text-slate-400 font-bold pt-2">
                  Abhishek Kumar
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-white text-slate-900 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
            <div>
              <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
                OUR TEAM
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
                Talented People Behind Our Success
              </h2>
            </div>

            <Link
              href="/about#team"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7C86] hover:underline"
            >
              <span>View all team members</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-5 text-center shadow-sm hover:border-[#0E7C86] transition-colors relative group"
              >
                <div className="w-14 h-14 rounded-full bg-[#0E7C86]/10 text-[#0E7C86] font-bold text-sm flex items-center justify-center mx-auto mb-3 shadow-inner">
                  {member.initials}
                </div>
                <div className="text-xs font-bold text-[#0B1623]">
                  {member.name}
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                  {member.role}
                </div>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white text-slate-500 hover:text-[#0E7C86] flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
