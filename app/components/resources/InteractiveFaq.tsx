"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function InteractiveFaq() {
  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    {
      q: "What is your typical project timeline?",
      a: "Timelines vary based on project complexity and requirements. A simple website might take 3–6 weeks, while a complex web or mobile application can take 3–6 months. We follow an agile approach and provide a detailed timeline after the discovery phase.",
    },
    {
      q: "How do you ensure project security?",
      a: "We adhere to strict industry-standard security protocols including end-to-end data encryption, OWASP guidelines, secure API authentication, regular automated security audits, and NDA compliance.",
    },
    {
      q: "What engagement models do you offer?",
      a: "We offer flexible engagement models tailored to your needs: Dedicated Engineering Teams, Time & Materials (T&M), and Fixed-Price Project Delivery.",
    },
    {
      q: "Do you provide post-launch support?",
      a: "Yes! We offer comprehensive post-launch support and maintenance SLAs, including bug fixes, security updates, server monitoring, and continuous feature enhancements.",
    },
    {
      q: "Can you work with our existing team?",
      a: "Absolutely. Our engineers and designers can seamlessly integrate as team extensions, adopting your tools, workflows, and communication channels.",
    },
  ];

  return (
    <section className="py-20 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#0E7C86] text-xs font-bold tracking-wider uppercase font-heading">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1623] mt-2">
            Got Questions? We Have Answers.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl transition-all overflow-hidden ${
                activeFaq === idx
                  ? "border-[#0E7C86] bg-slate-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-base font-bold font-heading text-[#0B1623]">
                  {faq.q}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    activeFaq === idx
                      ? "bg-[#0E7C86] text-white rotate-180"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {activeFaq === idx && (
                <div className="px-6 pb-6 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 mt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
