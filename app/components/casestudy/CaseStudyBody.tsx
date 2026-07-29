"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Target,
  Users,
  Layers,
  Code2,
  ShieldCheck,
  Calendar,
  Sparkles,
  Quote,
  TrendingUp,
} from "lucide-react";
import { FaReact, FaNodeJs, FaAws } from "react-icons/fa";
import {
  SiMongodb,
  SiTailwindcss,
  SiFirebase,
  SiCloudinary,
  SiSentry,
} from "react-icons/si";

export default function CaseStudyBody() {
  const [activeScreen, setActiveScreen] = useState(0);

  const screens = [
    {
      title: "Clinic Operations Dashboard",
      img: "/images/finova_dashboard.png",
    },
    {
      title: "Patient Appointment Booking Screen",
      img: "/images/mediflow_app.png",
    },
    {
      title: "Doctor Schedule & Teleconsultation",
      img: "/images/shophub_platform.png",
    },
  ];

  const techStack = [
    { name: "React.js", icon: FaReact, color: "text-[#61DAFB]" },
    { name: "Node.js", icon: FaNodeJs, color: "text-[#339933]" },
    { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
    { name: "Firebase", icon: SiFirebase, color: "text-[#FFCA28]" },
    { name: "Cloudinary", icon: SiCloudinary, color: "text-[#3448C5]" },
    { name: "Sentry", icon: SiSentry, color: "text-[#362D59]" },
    { name: "AWS", icon: FaAws, color: "text-[#FF9900]" },
  ];

  const timeline = [
    { step: "Discovery & Planning", time: "3 Weeks" },
    { step: "Design & Prototyping", time: "4 Weeks" },
    { step: "Development", time: "6 Weeks" },
    { step: "Testing & QA", time: "2 Weeks" },
    { step: "Deployment", time: "1 Week" },
  ];

  return (
    <div className="space-y-14 text-slate-700 text-sm leading-relaxed">
      {/* 1. The Challenge */}
      <section className="space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h2 className="text-xl font-bold font-heading text-[#0B1623]">
            The Challenge
          </h2>
        </div>
        <p className="text-slate-600 leading-relaxed pl-10">
          Patients faced long waiting times and inefficient appointment
          scheduling. Clinics struggled with manual processes, high no-show
          rates, and managing patient records across multiple disconnected
          systems.
        </p>
      </section>

      {/* 2. Objectives */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h2 className="text-xl font-bold font-heading text-[#0B1623]">
            Objectives
          </h2>
        </div>
        <ul className="space-y-2.5 pl-10 list-none">
          {[
            "Simplify the appointment booking experience for patients",
            "Reduce no-shows and improve schedule management",
            "Provide an all-in-one platform for doctors and clinics",
            "Ensure data security and HIPAA compliance",
          ].map((obj, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 font-medium text-slate-800"
            >
              <CheckCircle2 className="w-4.5 h-4.5 text-[#0E7C86] shrink-0" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Research & Discovery */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h2 className="text-xl font-bold font-heading text-[#0B1623]">
            Research & Discovery
          </h2>
        </div>
        <p className="text-slate-600 leading-relaxed pl-10">
          We conducted in-depth interviews with patients, doctors, and clinic
          administrators. Market research and competitor analysis helped us
          identify key pain points and opportunities.
        </p>

        {/* Discovery Workshop Image */}
        <div className="pl-10">
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-md my-4">
            <Image
              src="/images/research_discovery_team.png"
              alt="Research & Discovery Workshop Team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* 5 Process Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {[
              { title: "User Interviews", desc: "20+ Interviews" },
              { title: "Competitor Analysis", desc: "5 Platforms Studied" },
              { title: "Pain Point Mapping", desc: "10+ Key Issues" },
              { title: "Feature Prioritization", desc: "Must-have Matrix" },
              { title: "Validation", desc: "Real User Tests" },
            ].map((pill, idx) => (
              <div
                key={idx}
                className="bg-[#F7F9FB] border border-slate-200 rounded-xl p-3 text-center"
              >
                <div className="text-xs font-bold text-[#0B1623]">
                  {pill.title}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {pill.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Strategy */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold text-xs">
            4
          </div>
          <h2 className="text-xl font-bold font-heading text-[#0B1623]">
            Strategy
          </h2>
        </div>
        <p className="text-slate-600 pl-10">
          We defined a user-centric strategy focusing on simplicity,
          accessibility, and automation to streamline the entire healthcare
          journey:
        </p>
        <ul className="space-y-2 pl-10 list-none font-medium">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
            <span>Patient-first approach</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
            <span>Automation for reminders & follow-ups</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
            <span>Scalable and secure architecture</span>
          </li>
        </ul>
      </section>

      {/* 5. Design Process */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold text-xs">
            5
          </div>
          <h2 className="text-xl font-bold font-heading text-[#0B1623]">
            Design Process
          </h2>
        </div>
        <p className="text-slate-600 pl-10">
          We designed intuitive user flows and clean interfaces that make
          booking and managing appointments effortless:
        </p>
        <ul className="space-y-2 pl-10 list-none font-medium">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
            <span>Wireframing & Prototyping</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
            <span>UI Design with Design System</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
            <span>Usability Testing & Iteration</span>
          </li>
        </ul>
      </section>

      {/* 6. Development Approach */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold text-xs">
            6
          </div>
          <h2 className="text-xl font-bold font-heading text-[#0B1623]">
            Development Approach
          </h2>
        </div>
        <p className="text-slate-600 pl-10">
          Agile methodology with 2-week sprints, continuous testing, and regular
          client feedback:
        </p>
        <ul className="space-y-2 pl-10 list-none font-medium">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
            <span>Agile Scrum Framework</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
            <span>CI/CD Pipeline</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
            <span>Test-Driven Development</span>
          </li>
        </ul>
      </section>

      {/* 7. Key Features */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold text-xs">
            7
          </div>
          <h2 className="text-xl font-bold font-heading text-[#0B1623]">
            Key Features
          </h2>
        </div>
        <div className="pl-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Doctor & Clinic Management",
            "Teleconsultation Integration",
            "Online Appointment Booking",
            "Secure Payments",
            "Real-time Availability",
            "Patient Dashboard",
            "Automated Reminders",
            "Reports & Analytics",
          ].map((feat, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#F7F9FB] border border-slate-200 rounded-xl flex items-center gap-3"
            >
              <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
              <span className="text-xs font-bold text-[#0B1623]">{feat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Technology Stack */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold text-xs">
            8
          </div>
          <h2 className="text-xl font-bold font-heading text-[#0B1623]">
            Technology Stack
          </h2>
        </div>
        <div className="pl-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {techStack.map((tech, idx) => {
            const IconComp = tech.icon;
            return (
              <div
                key={idx}
                className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-4 text-center flex flex-col items-center justify-center space-y-2 hover:border-[#0E7C86] transition-colors"
              >
                <IconComp className={`w-7 h-7 ${tech.color}`} />
                <span className="text-xs font-bold text-[#0B1623]">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Project Timeline */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold text-xs">
            9
          </div>
          <h2 className="text-xl font-bold font-heading text-[#0B1623]">
            Project Timeline
          </h2>
        </div>
        <div className="pl-10 relative">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F7F9FB] border border-slate-200 rounded-xl p-3 text-center"
              >
                <div className="text-[10px] font-bold text-[#0E7C86] uppercase">
                  {item.time}
                </div>
                <div className="text-xs font-bold text-[#0B1623] mt-1">
                  {item.step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Design Showcase */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold text-xs">
            10
          </div>
          <h2 className="text-xl font-bold font-heading text-[#0B1623]">
            Design Showcase
          </h2>
        </div>
        <div className="pl-10 space-y-3">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900">
            <Image
              src={screens[activeScreen].img}
              alt={screens[activeScreen].title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700/80 flex items-center justify-between text-white text-xs">
              <span className="font-bold">{screens[activeScreen].title}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActiveScreen(
                      (activeScreen - 1 + screens.length) % screens.length,
                    )
                  }
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-[#0E7C86] flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setActiveScreen((activeScreen + 1) % screens.length)
                  }
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-[#0E7C86] flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Before & After */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold text-xs">
            11
          </div>
          <h2 className="text-xl font-bold font-heading text-[#0B1623]">
            Before & After
          </h2>
        </div>
        <div className="pl-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Before */}
          <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-bold font-heading text-rose-800 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Before (Legacy Process)</span>
            </h4>
            <ul className="space-y-2 text-xs text-rose-900">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Manual appointment scheduling via phone calls</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>High no-show rate (25%) causing lost revenue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Scattered patient records across paper files</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Limited patient engagement and communication</span>
              </li>
            </ul>
          </div>

          {/* After */}
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-bold font-heading text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>After (SwiftCare Platform)</span>
            </h4>
            <ul className="space-y-2 text-xs text-emerald-900">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Automated 24/7 online self-service booking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>No-show rate reduced significantly down to 10%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Centralized digital patient records & history</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>High patient engagement via SMS & WhatsApp</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 12. Results & Impact */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold text-xs">
            12
          </div>
          <h2 className="text-xl font-bold font-heading text-[#0B1623]">
            Results & Impact
          </h2>
        </div>
        <div className="pl-10 space-y-4">
          <div className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-bold text-[#0B1623] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#0E7C86]" />
                <span>Appointment Growth & No-Show Reduction Over Time</span>
              </div>
              <span className="text-[10px] text-slate-500">6 Month Trend</span>
            </div>
            {/* Visual Impact Chart Representation */}
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-lg font-extrabold text-[#0E7C86]">
                  +65%
                </div>
                <div className="text-[10px] text-slate-500">Appointments</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-lg font-extrabold text-emerald-600">
                  -40%
                </div>
                <div className="text-[10px] text-slate-500">No-Shows</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-lg font-extrabold text-[#0E7C86]">
                  3.5x
                </div>
                <div className="text-[10px] text-slate-500">Booking Speed</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-lg font-extrabold text-[#0E7C86]">98%</div>
                <div className="text-[10px] text-slate-500">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Client Testimonial */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold text-xs">
            13
          </div>
          <h2 className="text-xl font-bold font-heading text-[#0B1623]">
            Client Testimonial
          </h2>
        </div>
        <div className="pl-10">
          <div className="bg-[#F7F9FB] border border-slate-200 rounded-3xl p-6 sm:p-8 relative">
            <Quote className="w-8 h-8 text-[#0E7C86]/20 absolute top-4 left-4" />
            <blockquote className="text-sm font-medium text-[#0B1623] italic leading-relaxed mb-4 pl-6">
              &ldquo;JitSeeTec transformed our appointment system completely.
              The platform is intuitive, reliable, and has significantly
              improved our operations and patient satisfaction.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3 pl-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-300">
                <Image
                  src="/images/dr_ananya_sharma.png"
                  alt="Dr. Ananya Sharma - CEO, SwiftCare"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B1623]">
                  Dr. Ananya Sharma
                </div>
                <div className="text-[11px] text-slate-500">
                  CEO, SwiftCare Health Pvt. Ltd.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. Lessons Learned */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center font-bold text-xs">
            14
          </div>
          <h2 className="text-xl font-bold font-heading text-[#0B1623]">
            Lessons Learned
          </h2>
        </div>
        <div className="pl-10 space-y-2.5">
          {[
            "Early user feedback is crucial for the right product direction.",
            "Automation and reminders directly reduce no-shows and increase clinic revenue.",
            "Scalable architecture ensures long-term growth and system stability.",
          ].map((lesson, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-xs font-medium text-slate-800"
            >
              <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
              <span>{lesson}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
