"use client";

import React, { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreePrivacy) {
      alert("Please agree to the Privacy Policy to proceed.");
      return;
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
                      placeholder="+977 98000 00000"
                      className="w-full px-4 py-3 bg-[#F7F9FB] border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0E7C86] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Service Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-[#0B1623] mb-1.5">
                    Service You&apos;re Interested In
                  </label>
                  <div className="relative">
                    <select
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#F7F9FB] border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0E7C86] focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select a Service</option>
                      <option value="web-dev">Web Development</option>
                      <option value="mobile-dev">Mobile App Development</option>
                      <option value="uiux-design">UI/UX Design</option>
                      <option value="cloud-devops">Cloud & DevOps</option>
                      <option value="custom-software">
                        Custom Enterprise Software
                      </option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Row 4: Budget Range & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1623] mb-1.5">
                      Project Budget
                    </label>
                    <div className="relative">
                      <select
                        value={form.budget}
                        onChange={(e) =>
                          setForm({ ...form, budget: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#F7F9FB] border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0E7C86] focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select Budget Range</option>
                        <option value="<5k">Less than $5,000</option>
                        <option value="5k-15k">$5,000 - $15,000</option>
                        <option value="15k-30k">$15,000 - $30,000</option>
                        <option value=">30k">$30,000+</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1623] mb-1.5">
                      Timeline
                    </label>
                    <div className="relative">
                      <select
                        value={form.timeline}
                        onChange={(e) =>
                          setForm({ ...form, timeline: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#F7F9FB] border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0E7C86] focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select Timeline</option>
                        <option value="urgent">Urgent (&lt; 1 month)</option>
                        <option value="1-3months">1 - 3 months</option>
                        <option value="3-6months">3 - 6 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 5: Project Details Textarea */}
                <div>
                  <label className="block text-xs font-bold text-[#0B1623] mb-1.5">
                    Project Details*
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us about your project, goals, and requirements..."
                    className="w-full px-4 py-3 bg-[#F7F9FB] border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0E7C86] focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Privacy Checkbox */}
                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="agreePrivacy"
                    checked={form.agreePrivacy}
                    onChange={(e) =>
                      setForm({ ...form, agreePrivacy: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#0E7C86] focus:ring-[#0E7C86] accent-[#0E7C86] cursor-pointer"
                  />
                  <label
                    htmlFor="agreePrivacy"
                    className="text-xs text-slate-600 cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link
                      href="/privacy"
                      className="text-[#0E7C86] underline font-medium"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#0E7C86] hover:bg-[#0B6871] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#0B1623]">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out to JitSeeTec. One of our technical
                  leads will review your inquiry and get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#0E7C86] text-white font-bold text-xs rounded-xl hover:bg-[#0B6871] transition-colors"
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
                      Imadol, Lalitpur, Bagmati Province, Nepal
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
                      href="tel:+9779811195091"
                      className="text-xs text-slate-600 hover:text-[#0E7C86] mt-0.5 block font-medium"
                    >
                      +977 98111 95091
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
                      href="mailto:hello@jitseetec.com"
                      className="text-xs text-slate-600 hover:text-[#0E7C86] mt-0.5 block font-medium"
                    >
                      hello@jitseetec.com
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
                      Sunday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      (Nepal Time)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="pt-8 mt-8 border-t border-slate-200">
              <div className="text-xs font-bold text-[#0B1623] mb-3">
                Follow Us
              </div>
              <div className="flex items-center gap-3">
                {["linkedin", "github", "twitter", "facebook"].map(
                  (platform, idx) => (
                    <a
                      key={idx}
                      href={`https://${platform}.com`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-xl bg-[#F7F9FB] hover:bg-[#0E7C86] text-slate-700 hover:text-white flex items-center justify-center transition-colors border border-slate-200"
                    >
                      <span className="capitalize text-[10px] font-bold">
                        {platform[0].toUpperCase()}
                      </span>
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
