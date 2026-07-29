"use client";

import React from "react";
import { TrendingUp, UserCheck, Zap, Award } from "lucide-react";

export default function CaseStudyImpactBar() {
  const metrics = [
    {
      val: "65%",
      label: "Increase in Appointments",
      icon: TrendingUp,
    },
    {
      val: "40%",
      label: "Reduction in No-Shows",
      icon: UserCheck,
    },
    {
      val: "3.5x",
      label: "Faster Booking Process",
      icon: Zap,
    },
    {
      val: "98%",
      label: "Customer Satisfaction",
      icon: Award,
    },
  ];

  return (
    <div className="bg-[#0B1623] border border-slate-800 rounded-3xl p-8 shadow-2xl text-white my-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, idx) => {
          const IconComp = m.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#162533] border border-slate-700/60"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] flex items-center justify-center shrink-0">
                <IconComp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  {m.val}
                </div>
                <div className="text-xs text-slate-300 font-medium leading-snug mt-0.5">
                  {m.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
