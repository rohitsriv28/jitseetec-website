"use client";

import React from "react";
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";

export default function TechStackSection() {
  const techStack = [
    { name: "React", icon: FaReact, color: "text-[#61DAFB]" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-slate-900" },
    { name: "Node.js", icon: FaNodeJs, color: "text-[#339933]" },
    { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
    { name: "Python", icon: FaPython, color: "text-[#3776AB]" },
    { name: "AWS", icon: FaAws, color: "text-[#FF9900]" },
    { name: "Docker", icon: FaDocker, color: "text-[#2496ED]" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
    { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
  ];

  return (
    <section className="py-20 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
            TECHNOLOGY STACK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
            Built with Industry-Leading Technologies
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {techStack.map((tech, idx) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={idx}
                className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-6 text-center hover:border-[#0E7C86] hover:shadow-md transition-all group flex flex-col items-center justify-center space-y-3"
              >
                <IconComponent
                  className={`w-10 h-10 ${tech.color} group-hover:scale-110 transition-transform duration-300`}
                />
                <span className="text-xs font-bold text-[#0B1623]">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
