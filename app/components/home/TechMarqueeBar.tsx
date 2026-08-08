"use client";

import React from "react";
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaWordpress, FaShopify, FaMagento } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
  SiShopware,
  SiWoocommerce,
  SiBigcommerce,
  SiLaravel,
  SiVuedotjs,
} from "react-icons/si";

const techItems = [
  { name: "Shopware", icon: SiShopware, color: "#189EFF" },
  { name: "Magento 2", icon: FaMagento, color: "#EE6723" },
  { name: "Shopify", icon: FaShopify, color: "#96BF48" },
  { name: "WordPress", icon: FaWordpress, color: "#21759B" },
  { name: "WooCommerce", icon: SiWoocommerce, color: "#96588A" },
  { name: "BigCommerce", icon: SiBigcommerce, color: "#34313F" },
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Python", icon: FaPython, color: "#3776AB" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "Docker", icon: FaDocker, color: "#2496ED" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
];

export default function TechMarqueeBar() {
  const marqueeList = [...techItems, ...techItems];

  return (
    <section className="relative py-14 sm:py-16 overflow-hidden bg-[#070e17]">
      {/* Ambient glow blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-[#0E7C86]/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-[#2ccfd3]/8 blur-[100px] pointer-events-none" />

      {/* Top subtle separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0E7C86]/40 to-transparent" />
      {/* Bottom subtle separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0E7C86]/40 to-transparent" />

      {/* Side Fade Overlays */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#070e17] via-[#070e17]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#070e17] via-[#070e17]/80 to-transparent z-10" />

      {/* Section Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-[11px] font-bold tracking-[0.25em] text-[#2ccfd3]/70 uppercase font-heading">
          Technologies We Master
        </p>
      </div>

      {/* Marquee Row 1 — Left to Right */}
      <div className="flex overflow-hidden select-none mb-5">
        <div className="animate-marquee-slow flex items-center gap-4 sm:gap-5">
          {marqueeList.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={`row1-${idx}`}
                className="group flex items-center gap-3 shrink-0 px-5 py-2.5 rounded-full
                  bg-white/[0.04] border border-white/[0.07]
                  backdrop-blur-sm
                  hover:bg-white/[0.08] hover:border-[#0E7C86]/50
                  transition-all duration-300 cursor-default"
              >
                <IconComp
                  style={{ color: item.color }}
                  className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_currentColor] transition-all duration-300"
                />
                <span className="text-sm sm:text-[15px] font-semibold font-heading text-white/60 group-hover:text-white transition-colors whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee Row 2 — Right to Left (reverse) */}
      <div className="flex overflow-hidden select-none">
        <div className="animate-marquee-reverse flex items-center gap-4 sm:gap-5">
          {[...marqueeList].reverse().map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={`row2-${idx}`}
                className="group flex items-center gap-3 shrink-0 px-5 py-2.5 rounded-full
                  bg-white/[0.04] border border-white/[0.07]
                  backdrop-blur-sm
                  hover:bg-white/[0.08] hover:border-[#2ccfd3]/40
                  transition-all duration-300 cursor-default"
              >
                <IconComp
                  style={{ color: item.color }}
                  className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_currentColor] transition-all duration-300"
                />
                <span className="text-sm sm:text-[15px] font-semibold font-heading text-white/60 group-hover:text-white transition-colors whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
