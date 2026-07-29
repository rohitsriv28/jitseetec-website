"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Heart,
  ShieldCheck,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#070E17] text-slate-300 border-t border-slate-800/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Multi-Column Layout matching Reference Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800/60">
          {/* Brand Info (Col span 4) */}
          <div className="lg:col-span-4 space-y-5 lg:pr-6 lg:border-r border-slate-800/60">
            <Link href="/" className="flex items-center gap-0">
              <Image
                src="/logo/logo.png"
                alt="JitSeeTec Logo"
                width={48}
                height={48}
                className="w-18 h-18 object-contain"
              />
              <span className="text-2xl font-bold font-heading text-white">
                JitSeeTec<span className="text-[#2CCFD3]">.</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              We design, build and scale digital solutions that help startups,
              SMEs and enterprises transform ideas into impactful products.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700/60 hover:border-[#2CCFD3] hover:bg-[#0E7C86] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700/60 hover:border-[#2CCFD3] hover:bg-[#0E7C86] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700/60 hover:border-[#2CCFD3] hover:bg-[#0E7C86] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700/60 hover:border-[#2CCFD3] hover:bg-[#0E7C86] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.65 13.75 5.65c1.08 0 2.22.19 2.22.19v2.44h-1.25c-1.23 0-1.62.77-1.62 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav Links & Contact Info (Col span 8) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-5 gap-6 pl-0 lg:pl-4">
            {/* Company */}
            <div>
              <h3 className="text-xs font-bold text-[#2CCFD3] tracking-wider uppercase mb-4 font-heading border-b border-[#2CCFD3]/30 pb-1.5 inline-block">
                Company
              </h3>
              <ul className="space-y-2.5 text-xs font-medium">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#2CCFD3] transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about#team"
                    className="hover:text-[#2CCFD3] transition-colors"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#2CCFD3] transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#2CCFD3] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xs font-bold text-[#2CCFD3] tracking-wider uppercase mb-4 font-heading border-b border-[#2CCFD3]/30 pb-1.5 inline-block">
                Services
              </h3>
              <ul className="space-y-2.5 text-xs font-medium">
                <li>
                  <Link
                    href="/services#web-dev"
                    className="hover:text-[#2CCFD3] transition-colors"
                  >
                    Web
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#mobile-dev"
                    className="hover:text-[#2CCFD3] transition-colors"
                  >
                    Mobile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#cloud-devops"
                    className="hover:text-[#2CCFD3] transition-colors"
                  >
                    Cloud
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#uiux-design"
                    className="hover:text-[#2CCFD3] transition-colors"
                  >
                    UI/UX
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#cloud-devops"
                    className="hover:text-[#2CCFD3] transition-colors"
                  >
                    DevOps
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xs font-bold text-[#2CCFD3] tracking-wider uppercase mb-4 font-heading border-b border-[#2CCFD3]/30 pb-1.5 inline-block">
                Resources
              </h3>
              <ul className="space-y-2.5 text-xs font-medium">
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-[#2CCFD3] transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/case-studies"
                    className="hover:text-[#2CCFD3] transition-colors"
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources#faqs"
                    className="hover:text-[#2CCFD3] transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-bold text-[#2CCFD3] tracking-wider uppercase mb-4 font-heading border-b border-[#2CCFD3]/30 pb-1.5 inline-block">
                Legal
              </h3>
              <ul className="space-y-2.5 text-xs font-medium">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#2CCFD3] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#2CCFD3] transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get in Touch */}
            <div className="col-span-2 sm:col-span-1 border-l border-slate-800/80 pl-4">
              <h3 className="text-xs font-bold text-[#2CCFD3] tracking-wider uppercase mb-4 font-heading border-b border-[#2CCFD3]/30 pb-1.5 inline-block">
                Get in Touch
              </h3>
              <ul className="space-y-3 text-xs font-medium">
                <li className="flex items-start gap-2.5 text-slate-400">
                  <MapPin className="w-4 h-4 text-[#2CCFD3] shrink-0 mt-0.5" />
                  <span>
                    Near Anandit Church, Imadol, Lalitpur, Bagmati Province,
                    Nepal
                  </span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <Phone className="w-4 h-4 text-[#2CCFD3] shrink-0" />
                  <a
                    href="tel:+9779811195091"
                    className="hover:text-white transition-colors"
                  >
                    +977 98111 95091
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <Mail className="w-4 h-4 text-[#2CCFD3] shrink-0" />
                  <a
                    href="mailto:hello@jitseetec.com"
                    className="hover:text-white transition-colors"
                  >
                    hello@jitseetec.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription Bar ("Stay in the Loop") */}
        <div className="bg-[#0B1623] border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#0E7C86]/20 text-[#2CCFD3] flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-heading text-white">
                Stay in the Loop
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Get the latest insights, updates and tech stories delivered
                straight to your inbox.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto"
          >
            {!subscribed ? (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-72 px-4 py-3 bg-[#162533] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#2CCFD3] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0E7C86] hover:bg-[#2CCFD3] hover:text-[#0B1623] text-white font-bold text-xs transition-all shadow-md shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-[#16A34A] bg-[#16A34A]/10 border border-[#16A34A]/30 px-5 py-3 rounded-xl">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you for subscribing!</span>
              </div>
            )}
          </form>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 border-t border-slate-800/40">
          <p>© 2026 JitSeeTec. Pvt. Ltd. All rights reserved.</p>

          <div className="flex items-center gap-2 text-slate-400">
            <Heart className="w-3.5 h-3.5 text-[#2CCFD3] fill-[#2CCFD3] inline" />
            <span>Built with passion for great digital experiences.</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#2CCFD3]" />
            <span>Your data is safe with us.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
