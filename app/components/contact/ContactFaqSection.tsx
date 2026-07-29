"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ContactFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contactFaqs = [
    {
      q: "How long does it take to get a response?",
      a: "We guarantee a response within 24 business hours. Our team reviews every inquiry thoroughly to provide expert recommendations.",
    },
    {
      q: "Do you work with startups?",
      a: "Yes! We specialize in helping early-stage startups build MVPs, scale digital infrastructure, and launch fast.",
    },
    {
      q: "Can you sign an NDA?",
      a: "Absolutely. We are 100% committed to intellectual property protection and happy to sign a Non-Disclosure Agreement before discussing project details.",
    },
    {
      q: "What is your typical project timeline?",
      a: "Project timelines depend on scope. Simple web apps take 3–6 weeks, while comprehensive mobile or enterprise software takes 3–6 months.",
    },
    {
      q: "What if I'm not sure about my requirements?",
      a: "No problem at all! Our solution architects will conduct a free discovery consultation to help define your technical scope, architecture, and roadmap.",
    },
  ];

  return (
    <div className="lg:col-span-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0B1623]">
          Frequently Asked Questions
        </h2>
        <Link
          href="/resources#faqs"
          className="text-xs font-bold text-[#0E7C86] hover:underline flex items-center gap-1"
        >
          <span>View all FAQs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {contactFaqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-[#F7F9FB] border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full px-5 py-3.5 text-left flex items-center justify-between text-xs font-bold text-[#0B1623] hover:text-[#0E7C86] transition-colors"
            >
              <span>{faq.q}</span>
              <span className="text-base font-bold text-[#0E7C86] shrink-0 ml-3">
                {openFaq === idx ? "−" : "+"}
              </span>
            </button>
            {openFaq === idx && (
              <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
