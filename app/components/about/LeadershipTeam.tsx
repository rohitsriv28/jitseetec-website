"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

export default function LeadershipTeam() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeam = async () => {
    try {
      const res = await fetch("/api/team");
      if (res.ok) {
        const json = await res.json();
        const all: any[] = json.data || json.team || json || [];
        const sorted = [...all].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setLeaders(sorted.filter((m) => m.isLeadership));
        setTeam(sorted.filter((m) => !m.isLeadership));
      }
    } catch (e) {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
    const unsubscribe = subscribeToCmsUpdate((key) => {
      if (!key || key === "team_module") fetchTeam();
    });
    return () => unsubscribe();
  }, []);

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 3);

  return (
    <>
      {/* ── Leadership Section ── */}
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

          {/* Leadership Cards */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex gap-6 animate-pulse">
                  <div className="w-36 h-44 rounded-2xl bg-slate-200 shrink-0" />
                  <div className="flex-1 space-y-3 pt-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {leaders.map((leader, idx) => (
                <div
                  key={leader._id || idx}
                  className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative w-36 h-44 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-md">
                    {leader.avatar ? (
                      <Image
                        src={leader.avatar}
                        alt={`${leader.name} — ${leader.role}`}
                        fill
                        sizes="144px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#0E7C86]/10 flex items-center justify-center text-[#0E7C86] font-bold text-2xl">
                        {getInitials(leader.name)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold font-heading text-[#0B1623]">
                          {leader.name}
                        </h3>
                        <div className="text-xs font-bold text-[#0E7C86] mt-0.5">
                          {leader.role}
                        </div>
                      </div>
                      {leader.linkedin && (
                        <a
                          href={leader.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 hover:bg-[#0E7C86] hover:text-white flex items-center justify-center transition-colors"
                        >
                          <FaLinkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    {leader.bio && (
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {leader.bio}
                      </p>
                    )}
                    <div className="text-base font-serif italic text-slate-400 font-bold pt-2">
                      {leader.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Core Team Section ── */}
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

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-5 animate-pulse">
                  <div className="w-14 h-14 rounded-full bg-slate-200 mx-auto mb-3" />
                  <div className="h-3 bg-slate-200 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-2 bg-slate-100 rounded w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {team.map((member, idx) => (
                <div
                  key={member._id || idx}
                  className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-5 text-center shadow-sm hover:border-[#0E7C86] transition-colors relative group"
                >
                  <div className="w-14 h-14 rounded-full bg-[#0E7C86]/10 text-[#0E7C86] font-bold text-sm flex items-center justify-center mx-auto mb-3 shadow-inner">
                    {member.initials || getInitials(member.name)}
                  </div>
                  <div className="text-xs font-bold text-[#0B1623]">
                    {member.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                    {member.role}
                  </div>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white text-slate-500 hover:text-[#0E7C86] flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaLinkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
