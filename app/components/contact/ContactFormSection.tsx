"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Send,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
} from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    agreePrivacy: false,
  });

  const [contactInfo, setContactInfo] = useState<any>({
    location: "Imadol, Lalitpur, Bagmati Province, Nepal",
    phone: "+977 98111 95091",
    email: "hello@jitseetec.com",
    hours: "Sunday - Friday: 9:00 AM - 6:00 PM (Nepal Time)",
    linkedinUrl: "https://www.linkedin.com/company/jitseetec",
    twitterUrl: "https://twitter.com/jitseetec",
    githubUrl: "https://github.com/jitseetec",
    instagramUrl: "https://instagram.com/jitseetec",
    facebookUrl: "https://facebook.com/jitseetec",
  });

  const fetchContactInfo = async () => {
    try {
      const res = await fetch("/api/content/contact_info");
      if (res.ok) {
        const json = await res.json();
        if (json.data) setContactInfo(json.data);
      }
    } catch (e) {
      // fallback
    }
  };

  useEffect(() => {
    fetchContactInfo();
    const unsubscribe = subscribeToCmsUpdate((key) => {
      if (!key || key === "contact_info") {
        fetchContactInfo();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreePrivacy) {
      alert("Please agree to the Privacy Policy to proceed.");
      return;
    }

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          company: form.company,
          phone: form.phone,
          service: form.service,
          message: form.message,
        }),
      });
    } catch (err) {
      // ignore
    }

    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-[#F7F9FB] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column Form Card ("Send Us a Message") */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0B1623] mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-8">
              Tell us about your project and we&apos;ll get back to you shortly.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1623] mb-1.5">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 bg-[#F7F9FB] border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0E7C86] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1623] mb-1.5">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-[#F7F9FB] border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0E7C86] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Company & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1623] mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      placeholder="Your company or organization"
                      className="w-full px-4 py-3 bg-[#F7F9FB] border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0E7C86] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1623] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-[#F7F9FB] border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0E7C86] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Service Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#0B1623] mb-1.5">
                    What service are you looking for?
                  </label>
                  <div className="relative">
                    <select
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#F7F9FB] border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0E7C86] focus:bg-white appearance-none cursor-pointer transition-all"
                    >
                      <option value="">Select a service...</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App Development">
                        Mobile App Development
                      </option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Custom Software Development">
                        Custom Software Development
                      </option>
                      <option value="Other / General Inquiry">
                        Other / General Inquiry
                      </option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-[#0B1623] mb-1.5">
                    Project Details or Message*
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us about your project goals, timeline, or any specific requirements..."
                    className="w-full px-4 py-3 bg-[#F7F9FB] border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0E7C86] focus:bg-white transition-all leading-relaxed"
                  />
                </div>

                {/* Privacy Consent Checkbox */}
                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="privacy-check"
                    checked={form.agreePrivacy}
                    onChange={(e) =>
                      setForm({ ...form, agreePrivacy: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-[#0E7C86] focus:ring-[#0E7C86] cursor-pointer"
                  />
                  <label
                    htmlFor="privacy-check"
                    className="text-xs text-slate-600 cursor-pointer"
                  >
                    I agree to the processing of my personal data according to
                    the{" "}
                    <Link
                      href="/contact"
                      className="text-[#0E7C86] font-semibold underline hover:text-[#0B1623]"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#0B1623]">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  We have received your message and our team will get back to
                  you within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      fullName: "",
                      email: "",
                      company: "",
                      phone: "",
                      service: "",
                      budget: "",
                      timeline: "",
                      message: "",
                      agreePrivacy: false,
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0B1623] hover:bg-slate-800 text-white text-xs font-bold transition-all"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

          {/* Right Column Sidebar ("Get in Touch") */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold font-heading text-[#0B1623] mb-2">
                Get in Touch
              </h2>
              <p className="text-xs text-slate-600 mb-8">
                Reach out to us through any of these channels.
              </p>

              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1623]">
                      Location
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {contactInfo.location ||
                        "Imadol, Lalitpur, Bagmati Province, Nepal"}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1623]">
                      Phone
                    </div>
                    <a
                      href={`tel:${(contactInfo.phone || "+977 98111 95091").replace(/\s+/g, "")}`}
                      className="text-xs text-slate-600 hover:text-[#0E7C86] mt-0.5 block font-medium"
                    >
                      {contactInfo.phone || "+977 98111 95091"}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1623]">
                      Email
                    </div>
                    <a
                      href={`mailto:${contactInfo.email || "hello@jitseetec.com"}`}
                      className="text-xs text-slate-600 hover:text-[#0E7C86] mt-0.5 block font-medium"
                    >
                      {contactInfo.email || "hello@jitseetec.com"}
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1623]">
                      Business Hours
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {contactInfo.hours ||
                        "Sunday - Friday: 9:00 AM - 6:00 PM (Nepal Time)"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="pt-8 mt-8 border-t border-slate-200">
              <div className="text-xs font-bold text-[#0B1623] mb-3 uppercase tracking-wider font-heading">
                Follow Us
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={contactInfo.linkedinUrl || "https://linkedin.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#070E17] border border-slate-800 hover:border-[#2CCFD3] hover:bg-[#0E7C86] text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
                  </svg>
                </a>
                <a
                  href={contactInfo.githubUrl || "https://github.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#070E17] border border-slate-800 hover:border-[#2CCFD3] hover:bg-[#0E7C86] text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                  </svg>
                </a>
                <a
                  href={contactInfo.twitterUrl || "https://twitter.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#070E17] border border-slate-800 hover:border-[#2CCFD3] hover:bg-[#0E7C86] text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={contactInfo.facebookUrl || "https://facebook.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#070E17] border border-slate-800 hover:border-[#2CCFD3] hover:bg-[#0E7C86] text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.65 13.75 5.65c1.08 0 2.22.19 2.22.19v2.44h-1.25c-1.23 0-1.62.77-1.62 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
