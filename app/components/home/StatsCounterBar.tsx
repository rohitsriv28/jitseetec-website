"use client";

import React, { useEffect, useState } from "react";
import { Rocket, Smile, Calendar, Code2, Globe } from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

const defaultIcons = [Rocket, Smile, Calendar, Code2, Globe];

export default function StatsCounterBar() {
  const [stats, setStats] = useState<any[]>([
    { number: "14+", label: "Projects Delivered" },
    { number: "95%", label: "Client Satisfaction" },
    { number: "4+", label: "Years of Experience" },
    { number: "10+", label: "Technologies" },
    { number: "8", label: "Countries Served" },
  ]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setStats(json.data);
        }
      }
    } catch (e) {
      // fallback
    }
  };

  useEffect(() => {
    fetchStats();
    const unsubscribe = subscribeToCmsUpdate((key) => {
      if (!key || key === "stats" || key === "stats_module") {
        fetchStats();
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-12 bg-[#EEF4F8] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {stats.map((stat, idx) => {
            const IconComp = defaultIcons[idx % defaultIcons.length];
            const isHighlight = idx % 2 === 1;
            return (
              <div
                key={stat._id || idx}
                className={`pt-4 md:pt-0 ${idx > 0 ? "md:pl-4" : ""} ${
                  idx === 4 ? "col-span-2 md:col-span-1" : ""
                } flex flex-col items-center`}
              >
                <div className="w-10 h-10 rounded-full bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-2">
                  <IconComp className="w-5 h-5" />
                </div>
                <div
                  className={`text-3xl sm:text-4xl font-extrabold font-heading ${
                    isHighlight ? "text-[#0E7C86]" : "text-[#0B1623]"
                  }`}
                >
                  {stat.value || stat.number}
                </div>
                <div className="text-xs text-slate-600 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
