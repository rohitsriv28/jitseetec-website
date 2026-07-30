"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

export default function FeaturedWorkSection() {
  const [projects, setProjects] = useState<any[]>([
    {
      title: "Finova Dashboard",
      category: "Fintech",
      desc: "A comprehensive financial management platform for businesses with real-time analytics, budget tracking, and automated reporting.",
      image: "/images/finova_dashboard.png",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "MediFlow App",
      category: "Healthcare",
      desc: "Telemedicine mobile app connecting doctors and patients seamlessly with appointment booking, video consultations, and e-prescriptions.",
      image: "/images/mediflow_app.png",
      tags: ["Flutter", "Firebase", "Node.js"],
    },
    {
      title: "ShopHub Platform",
      category: "E-commerce",
      desc: "Feature-rich e-commerce platform with modern shopping experience, recommendations engine, secure checkout, and inventory sync.",
      image: "/images/shophub_platform.png",
      tags: ["Next.js", "Tailwind CSS", "Stripe"],
    },
  ]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          // Display top 3 featured projects
          setProjects(json.data.slice(0, 3));
        }
      }
    } catch (e) {
      // fallback
    }
  };

  useEffect(() => {
    fetchProjects();
    const unsubscribe = subscribeToCmsUpdate((key) => {
      if (!key || key === "projects" || key === "projects_module") {
        fetchProjects();
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
              OUR WORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
              Delivering Impactful
              <br />
              Digital Experiences
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mt-3">
              We partner with ambitious businesses to build products that solve
              real problems and create measurable results.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0E7C86] hover:bg-[#0B6871] text-white font-bold text-xs transition-all shadow-md"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Featured Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const tags = Array.isArray(project.tags)
              ? project.tags
              : typeof project.tags === "string"
                ? project.tags.split(",").map((t: string) => t.trim())
                : ["Tech", "Design"];

            return (
              <div
                key={project._id || idx}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-[#0E7C86] hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <Image
                      src={project.image || "/images/finova_dashboard.png"}
                      alt={`${project.title} Mockup`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-[#0E7C86] text-[11px] font-bold shadow-sm backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold font-heading text-[#0B1623] group-hover:text-[#0E7C86] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {project.desc || project.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                    {tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-[#F3F4F6] text-[11px] font-semibold text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
