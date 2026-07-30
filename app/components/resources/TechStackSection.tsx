"use client";

import React, { useEffect, useState } from "react";
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

// Map iconKey strings to actual React components
const iconMap: Record<string, React.ElementType> = {
  FaReact,
  FaNodeJs,
  FaPython,
  FaAws,
  FaDocker,
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
};

const defaultTech = [
  { name: "React", iconKey: "FaReact", color: "#61DAFB" },
  { name: "Next.js", iconKey: "SiNextdotjs", color: "#000000" },
  { name: "Node.js", iconKey: "FaNodeJs", color: "#339933" },
  { name: "TypeScript", iconKey: "SiTypescript", color: "#3178C6" },
  { name: "Python", iconKey: "FaPython", color: "#3776AB" },
  { name: "AWS", iconKey: "FaAws", color: "#FF9900" },
  { name: "Docker", iconKey: "FaDocker", color: "#2496ED" },
  { name: "PostgreSQL", iconKey: "SiPostgresql", color: "#4169E1" },
  { name: "MongoDB", iconKey: "SiMongodb", color: "#47A248" },
  { name: "Tailwind CSS", iconKey: "SiTailwindcss", color: "#06B6D4" },
];

export default function TechStackSection() {
  const [content, setContent] = useState<any>({
    subtitle: "TECHNOLOGY STACK",
    title: "Built with Industry-Leading Technologies",
    technologies: defaultTech,
  });
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content/resources_tech_stack");
      if (res.ok) {
        const json = await res.json();
        if (json.data) setContent(json.data);
      }
    } catch (e) {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
    const unsubscribe = subscribeToCmsUpdate((key) => {
      if (!key || key === "resources_tech_stack") fetchContent();
    });
    return () => unsubscribe();
  }, []);

  const techStack: any[] = content.technologies || defaultTech;

  return (
    <section className="py-20 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
            {content.subtitle || "TECHNOLOGY STACK"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
            {content.title || "Built with Industry-Leading Technologies"}
          </h2>
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-6 animate-pulse flex flex-col items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full" />
                <div className="h-3 bg-slate-200 rounded w-16" />
              </div>
            ))}
          </div>
        )}

        {/* Tech Grid */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {techStack.map((tech, idx) => {
              const IconComponent = iconMap[tech.iconKey] || FaReact;
              const colorStyle = tech.color
                ? { color: tech.color }
                : undefined;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-6 text-center hover:border-[#0E7C86] hover:shadow-md transition-all group flex flex-col items-center justify-center space-y-3"
                >
                  <IconComponent
                    style={colorStyle}
                    className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="text-xs font-bold text-[#0B1623]">{tech.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
