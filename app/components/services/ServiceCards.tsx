"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Code2,
  Smartphone,
  Layout,
  Cloud,
  Terminal,
  Cpu,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

interface ServiceCardsProps {
  onOpenConsultation: () => void;
}

export default function ServiceCards({
  onOpenConsultation,
}: ServiceCardsProps) {
  const [content, setContent] = useState<any>({
    subtitle: "WHAT WE OFFER",
    title: "End-to-End Digital Solutions Tailored to Your Needs",
    description:
      "From strategy and design to development and support, we offer a wide range of services to turn your ideas into powerful digital products.",
  });

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content/services_offerings");
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
      if (!key || key === "services_offerings") {
        fetchContent();
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
          <div className="lg:col-span-7">
            <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
              {content.subtitle || "WHAT WE OFFER"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
              {content.title || "End-to-End Digital Solutions Tailored to Your Needs"}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-slate-600 text-sm leading-relaxed">
              {content.description ||
                "From strategy and design to development and support, we offer a wide range of services to turn your ideas into powerful digital products."}
            </p>
          </div>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Web Development */}
          <div
            id="web-dev"
            className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-[#0E7C86] hover:shadow-xl transition-all shadow-sm group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-6 group-hover:bg-[#0E7C86] group-hover:text-white transition-colors">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#0B1623] mb-3">
                Web Development
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                We build fast, secure and scalable web applications using modern
                frameworks and best practices.
              </p>

              <div className="relative h-44 rounded-2xl overflow-hidden mb-6 bg-slate-100 border border-slate-200">
                <Image
                  src="/images/finova_dashboard.png"
                  alt="Web Development Dashboard Mockup"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <ul className="space-y-2.5 mb-8">
                {[
                  "Custom Web Applications",
                  "Enterprise Web Solutions",
                  "Progressive Web Apps (PWA)",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7C86] hover:underline transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Mobile App Development */}
          <div
            id="mobile-dev"
            className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-[#0E7C86] hover:shadow-xl transition-all shadow-sm group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-6 group-hover:bg-[#0E7C86] group-hover:text-white transition-colors">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#0B1623] mb-3">
                Mobile App Development
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Native and cross-platform mobile apps that deliver seamless
                performance and great user experience.
              </p>

              <div className="relative h-44 rounded-2xl overflow-hidden mb-6 bg-slate-100 border border-slate-200">
                <Image
                  src="/images/mediflow_app.png"
                  alt="Mobile App Development Mockup"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <ul className="space-y-2.5 mb-8">
                {[
                  "iOS App Development",
                  "Android App Development",
                  "Cross-Platform (Flutter / React Native)",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7C86] hover:underline transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3: UI/UX Design */}
          <div
            id="uiux-design"
            className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-[#0E7C86] hover:shadow-xl transition-all shadow-sm group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-6 group-hover:bg-[#0E7C86] group-hover:text-white transition-colors">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#0B1623] mb-3">
                UI/UX Design
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                User-centered interfaces designed for clarity, engagement and
                exceptional visual appeal.
              </p>

              <div className="relative h-44 rounded-2xl overflow-hidden mb-6 bg-slate-100 border border-slate-200">
                <Image
                  src="/images/shophub_platform.png"
                  alt="UI/UX Design Showcase Mockup"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <ul className="space-y-2.5 mb-8">
                {[
                  "User Research & Testing",
                  "Wireframing & Prototyping",
                  "UI Design & Design Systems",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7C86] hover:underline transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 4: Cloud & DevOps */}
          <div
            id="cloud-devops"
            className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-[#0E7C86] hover:shadow-xl transition-all shadow-sm group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-6 group-hover:bg-[#0E7C86] group-hover:text-white transition-colors">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#0B1623] mb-3">
                Cloud & DevOps
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Cloud architecture, CI/CD automation and infrastructure
                management for high availability.
              </p>

              <ul className="space-y-2.5 mb-8">
                {[
                  "Cloud Infrastructure Setup",
                  "CI/CD Pipeline Automation",
                  "Cloud Migration & Security",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7C86] hover:underline transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 5: Custom Software */}
          <div
            id="custom-software"
            className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-[#0E7C86] hover:shadow-xl transition-all shadow-sm group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-6 group-hover:bg-[#0E7C86] group-hover:text-white transition-colors">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#0B1623] mb-3">
                Custom Software
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Tailored software solutions engineered to solve complex
                business challenges.
              </p>

              <ul className="space-y-2.5 mb-8">
                {[
                  "Tailored Business Logic",
                  "Legacy System Modernization",
                  "API Development & Integration",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7C86] hover:underline transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 6: AI & Machine Learning */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-[#0E7C86] hover:shadow-xl transition-all shadow-sm group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-6 group-hover:bg-[#0E7C86] group-hover:text-white transition-colors">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#0B1623] mb-3">
                AI & Machine Learning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Smart automation, data analytics and intelligent features to
                power next-gen products.
              </p>

              <ul className="space-y-2.5 mb-8">
                {[
                  "Custom AI Model Development",
                  "Natural Language Processing",
                  "Predictive Analytics & Automation",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E7C86] hover:underline transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
