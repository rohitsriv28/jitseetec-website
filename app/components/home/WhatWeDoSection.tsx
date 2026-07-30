"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Code2,
  Smartphone,
  Layout,
  Cloud,
  Terminal,
  ArrowRight,
} from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

const defaultIcons = [Code2, Smartphone, Layout, Cloud, Terminal];

export default function WhatWeDoSection() {
  const [content, setContent] = useState<any>({
    subtitle: "WHAT WE DO",
    title: "End-to-End Digital Solutions Built for the Future",
    description:
      "From ideation to deployment, we deliver tailored solutions that drive efficiency, growth and long-term success.",
    servicesList: [
      {
        title: "Web Development",
        desc: "We build fast, responsive and scalable web applications using modern technologies.",
        link: "/services#web-dev",
      },
      {
        title: "Mobile App Development",
        desc: "Native and cross-platform mobile apps that deliver seamless user experiences.",
        link: "/services#mobile-dev",
      },
      {
        title: "UI/UX Design",
        desc: "User-centered designs that are intuitive, engaging and aligned with your brand.",
        link: "/services#uiux-design",
      },
      {
        title: "Cloud & DevOps",
        desc: "Scalable cloud solutions and DevOps practices to ensure reliability and performance.",
        link: "/services#cloud-devops",
      },
      {
        title: "Custom Software",
        desc: "Robust software solutions tailored to your unique business requirements.",
        link: "/services#custom-software",
      },
    ],
  });

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content/home_what_we_do");
      if (res.ok) {
        const json = await res.json();
        if (json.data) setContent(json.data);
      }
    } catch (e) {
      // fallback
    }
  };

  useEffect(() => {
    fetchContent();
    const unsubscribe = subscribeToCmsUpdate((key) => {
      if (!key || key === "home_what_we_do") {
        fetchContent();
      }
    });
    return () => unsubscribe();
  }, []);

  const services =
    content.servicesList && content.servicesList.length > 0
      ? content.servicesList
      : [
          {
            title: "Web Development",
            desc: "We build fast, responsive and scalable web applications using modern technologies.",
            link: "/services#web-dev",
          },
          {
            title: "Mobile App Development",
            desc: "Native and cross-platform mobile apps that deliver seamless user experiences.",
            link: "/services#mobile-dev",
          },
          {
            title: "UI/UX Design",
            desc: "User-centered designs that are intuitive, engaging and aligned with your brand.",
            link: "/services#uiux-design",
          },
          {
            title: "Cloud & DevOps",
            desc: "Scalable cloud solutions and DevOps practices to ensure reliability and performance.",
            link: "/services#cloud-devops",
          },
          {
            title: "Custom Software",
            desc: "Robust software solutions tailored to your unique business requirements.",
            link: "/services#custom-software",
          },
        ];

  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
              {content.subtitle || "WHAT WE DO"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
              {content.title ||
                "End-to-End Digital Solutions Built for the Future"}
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mt-3">
              {content.description ||
                "From ideation to deployment, we deliver tailored solutions that drive efficiency, growth and long-term success."}
            </p>
          </div>

          <Link
            href="/services"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#0E7C86] hover:text-[#0B6871] transition-colors group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service: any, idx: number) => {
            const IconComp = defaultIcons[idx % defaultIcons.length];
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between hover:border-[#0E7C86] hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 shadow-sm"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-5 group-hover:bg-[#0E7C86] group-hover:text-white transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold font-heading text-[#0B1623] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                <Link
                  href={service.link || "/services"}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7C86] hover:underline transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
