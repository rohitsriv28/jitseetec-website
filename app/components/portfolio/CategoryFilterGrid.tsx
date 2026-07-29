"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function CategoryFilterGrid() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [activeIndustry, setActiveIndustry] = useState("All Industries");

  const categories = [
    "All Projects",
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "Cloud & DevOps",
    "Custom Software",
  ];

  const industries = [
    "All Industries",
    "Fintech",
    "Healthcare",
    "E-commerce",
    "Real Estate",
    "Education",
    "Logistics",
  ];

  const projects = [
    {
      id: "finova",
      category: "Web Development",
      industry: "Fintech",
      title: "Finova Dashboard",
      desc: "A comprehensive financial management platform for businesses with real-time analytics, budget tracking, and automated reporting.",
      tags: ["React", "Node.js", "MongoDB"],
      image: "/images/finova_dashboard.png",
    },
    {
      id: "mediflow",
      category: "Mobile Apps",
      industry: "Healthcare",
      title: "MediFlow App",
      desc: "Telemedicine mobile app connecting doctors and patients seamlessly with appointments, video consultations, and e-prescriptions.",
      tags: ["Flutter", "Firebase", "Node.js"],
      image: "/images/mediflow_app.png",
    },
    {
      id: "shophub",
      category: "Web Development",
      industry: "E-commerce",
      title: "ShopHub Platform",
      desc: "Feature-rich e-commerce platform with advanced search, recommendation engine, secure payments, and order management system.",
      tags: ["Next.js", "Tailwind CSS", "Stripe"],
      image: "/images/shophub_platform.png",
    },
    {
      id: "urbannest",
      category: "UI/UX Design",
      industry: "Real Estate",
      title: "UrbanNest Website",
      desc: "Modern real estate platform for property listings, virtual tours, lead management, and advanced search for buyers and agents.",
      tags: ["Vue.js", "Laravel", "MySQL"],
      image: "/images/urban_nest.png",
    },
    {
      id: "edusphere",
      category: "Custom Software",
      industry: "Education",
      title: "EduSphere LMS",
      desc: "Learning management system with course management, live classes, assessments, and progress tracking for students.",
      tags: ["React", "Node.js", "PostgreSQL"],
      image: "/images/edusphere_lms.png",
    },
    {
      id: "transpotrack",
      category: "Cloud & DevOps",
      industry: "Logistics",
      title: "TranspoTrack System",
      desc: "Logistics and fleet management system with real-time tracking, route optimization, and maintenance management.",
      tags: ["Angular", ".NET Core", "SQL Server"],
      image: "/images/transpotrack.png",
    },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchCat =
      activeCategory === "All Projects" || p.category === activeCategory;
    const matchInd =
      activeIndustry === "All Industries" || p.industry === activeIndustry;
    return matchCat && matchInd;
  });

  return (
    <section className="py-16 bg-[#F7F9FB] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Pills & Industry Dropdown */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 pb-4 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#0E7C86] text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              value={activeIndustry}
              onChange={(e) => setActiveIndustry(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#0E7C86] shadow-sm cursor-pointer"
            >
              {industries.map((ind, idx) => (
                <option key={idx} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project) => (
            <Link
              href="/case-studies"
              key={project.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-[#0E7C86] hover:shadow-xl transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 bg-slate-100 overflow-hidden border-b border-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 text-[#0E7C86] text-[11px] font-bold shadow-sm backdrop-blur-md">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#0B1623]/80 text-white text-[11px] font-bold backdrop-blur-md">
                      {project.industry}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold font-heading text-[#0B1623] group-hover:text-[#0E7C86] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-[#F3F4F6] text-[11px] font-semibold text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
