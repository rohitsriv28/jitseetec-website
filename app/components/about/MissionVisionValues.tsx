"use client";

import React from "react";
import { Target, Eye, Award, CheckCircle2 } from "lucide-react";

export default function MissionVisionValues() {
  const values = [
    "Client Success First",
    "Quality Without Compromise",
    "Integrity & Transparency",
    "Collaboration & Respect",
    "Innovation in Everything We Do",
    "Continuous Learning",
  ];

  return (
    <section className="py-16 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#0B1623] mb-3">
                Our Mission
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To deliver innovative, reliable, and scalable digital solutions
                that help businesses operate smarter, move faster, and grow
                beyond limits.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#0B1623] mb-3">
                Our Vision
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To be a globally trusted technology partner recognized for
                building software that creates meaningful impact.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-[#0B1623] mb-4">
              Our Values
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
              {values.map((val, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
                  <span>{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
