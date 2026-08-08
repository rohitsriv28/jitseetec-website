"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, Cpu } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Web Development",
    budget: "$5,000 - $10,000",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // reset after feedback
    }, 500);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#162533] border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0E7C86] rounded-full blur-3xl opacity-30 pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#0E7C86] flex items-center justify-center text-white">
                <Cpu className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold font-heading text-white">
                Book a Free Consultation
              </h2>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Let&apos;s discuss your project goals, timeline, and technical
              requirements with our engineering team.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#0B1623] border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#2CCFD3] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#0B1623] border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#2CCFD3] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Service Needed
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-[#0B1623] border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#2CCFD3] transition-colors"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">
                      Mobile App Dev
                    </option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Custom Software">Custom Software</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-[#0B1623] border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#2CCFD3] transition-colors"
                  >
                    <option value="< $5,000">&lt; $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000+">$25,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Summary
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us briefly about your goals, features, and target launch timeline..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#0B1623] border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#2CCFD3] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#0E7C86] hover:bg-[#2CCFD3] hover:text-[#0B1623] text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                <span>Submit Consultation Request</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#16A34A]/20 text-[#16A34A] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-white">
              Consultation Requested!
            </h3>
            <p className="text-sm text-slate-300 max-w-xs mx-auto leading-relaxed">
              Thank you,{" "}
              <span className="text-[#2CCFD3] font-semibold">
                {formData.name}
              </span>
              . Our technical director will review your project details and
              respond within 24 hours.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
