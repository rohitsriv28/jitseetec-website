"use client";

import React, { useState } from "react";
import {
  Quote,
  CheckCircle2,
  AlertCircle,
  Zap,
  Layers,
  ListFilter,
  Code2,
  BarChart3,
  Share2,
  Check,
} from "lucide-react";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function BlogArticleBody() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-10">
      {/* Intro Paragraph */}
      <p className="text-base text-slate-600 leading-relaxed">
        As React applications grow in complexity, performance can become a
        critical factor in delivering a smooth user experience. In this guide,
        we&apos;ll explore proven strategies and best practices to optimize your
        React applications and ensure they run blazing fast.
      </p>

      {/* Featured Quote Callout Block */}
      <div className="my-8 border-l-4 border-[#0E7C86] bg-[#0E7C86]/5 p-6 rounded-r-2xl relative">
        <Quote className="w-8 h-8 text-[#0E7C86]/30 absolute top-4 left-4 -z-0" />
        <blockquote className="relative z-10 text-base font-semibold text-[#0B1623] italic font-serif leading-relaxed">
          &ldquo;Performance is not a feature, it&apos;s a user
          experience.&rdquo;
        </blockquote>
        <div className="mt-2 text-xs font-bold text-[#0E7C86]">
          — Addy Osmani
        </div>
      </div>

      {/* Section 1 */}
      <section id="section-1" className="space-y-3 pt-2">
        <h2 className="text-xl font-bold font-heading text-[#0B1623]">
          1. Why Performance Matters in React
        </h2>
        <p className="text-slate-600">
          A slow application can lead to frustrated users, higher bounce rates,
          and lost conversions. Optimizing performance ensures your application
          is responsive, scalable, and user-friendly across all devices.
        </p>
      </section>

      {/* Section 2 */}
      <section id="section-2" className="space-y-4 pt-4">
        <h2 className="text-xl font-bold font-heading text-[#0B1623]">
          2. Common Performance Bottlenecks
        </h2>
        <p className="text-slate-600">
          Some common issues that can impact your React app&apos;s performance:
        </p>
        <ul className="space-y-2.5 pl-0 list-none text-slate-700">
          {[
            "Unnecessary re-renders",
            "Large bundle sizes",
            "Inefficient state management",
            "Expensive calculations in render",
            "Improper list rendering",
          ].map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 bg-[#F7F9FB] p-3 rounded-xl border border-slate-200/80"
            >
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-xs text-slate-800">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 3 */}
      <section id="section-3" className="space-y-4 pt-4">
        <h2 className="text-xl font-bold font-heading text-[#0B1623]">
          3. Tips to Optimize React Performance
        </h2>
        <p className="text-slate-600">
          Here are some practical tips you can apply right away:
        </p>

        <div className="space-y-3">
          {/* Tip 1 */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-4 shadow-sm hover:border-[#0E7C86] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-heading text-[#0B1623] mb-1">
                Use React.memo
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prevent unnecessary re-renders of functional components by using{" "}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#0E7C86] font-mono text-[11px]">
                  React.memo
                </code>
                .
              </p>
            </div>
          </div>

          {/* Tip 2 */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-4 shadow-sm hover:border-[#0E7C86] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-heading text-[#0B1623] mb-1">
                Optimize Re-renders with useCallback & useMemo
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Memoize functions and values to prevent unnecessary
                recalculations across renders.
              </p>
            </div>
          </div>

          {/* Tip 3 */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-4 shadow-sm hover:border-[#0E7C86] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-heading text-[#0B1623] mb-1">
                Code Splitting
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Split your code into smaller chunks using{" "}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#0E7C86] font-mono text-[11px]">
                  React.lazy
                </code>{" "}
                and Suspense.
              </p>
            </div>
          </div>

          {/* Tip 4 */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-4 shadow-sm hover:border-[#0E7C86] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center shrink-0">
              <ListFilter className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-heading text-[#0B1623] mb-1">
                Optimize Lists
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use keys properly, and consider virtualization for long lists
                with{" "}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#0E7C86] font-mono text-[11px]">
                  react-window
                </code>
                .
              </p>
            </div>
          </div>

          {/* Tip 5 */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-start gap-4 shadow-sm hover:border-[#0E7C86] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-heading text-[#0B1623] mb-1">
                Avoid Inline Functions
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inline functions can cause unnecessary re-renders. Move them
                outside or memoize them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section id="section-4" className="space-y-4 pt-4">
        <h2 className="text-xl font-bold font-heading text-[#0B1623]">
          4. Advanced Optimization Techniques
        </h2>
        <p className="text-slate-600">
          Take your performance to the next level:
        </p>
        <ul className="space-y-2.5 pl-0 list-none">
          {[
            "Lazy loading components and routes",
            "Prefetching data",
            "Using the React Profiler to identify bottlenecks",
            "Server-side rendering (SSR) or Static Site Generation (SSG)",
          ].map((tech, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 text-xs text-slate-700 font-medium"
            >
              <CheckCircle2 className="w-4 h-4 text-[#0E7C86] shrink-0" />
              <span>{tech}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 5 */}
      <section id="section-5" className="space-y-4 pt-4">
        <h2 className="text-xl font-bold font-heading text-[#0B1623]">
          5. Measuring Performance
        </h2>
        <p className="text-slate-600">Use tools like:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-[#F7F9FB] border border-slate-200 rounded-xl p-4 text-center">
            <BarChart3 className="w-5 h-5 text-[#0E7C86] mx-auto mb-2" />
            <div className="text-xs font-bold text-[#0B1623]">
              React DevTools Profiler
            </div>
          </div>
          <div className="bg-[#F7F9FB] border border-slate-200 rounded-xl p-4 text-center">
            <Zap className="w-5 h-5 text-[#0E7C86] mx-auto mb-2" />
            <div className="text-xs font-bold text-[#0B1623]">Lighthouse</div>
          </div>
          <div className="bg-[#F7F9FB] border border-slate-200 rounded-xl p-4 text-center">
            <CheckCircle2 className="w-5 h-5 text-[#0E7C86] mx-auto mb-2" />
            <div className="text-xs font-bold text-[#0B1623]">Web Vitals</div>
          </div>
        </div>
        <p className="text-xs text-slate-600 pt-2">
          to monitor and improve your app&apos;s performance.
        </p>
      </section>

      {/* Section 6 */}
      <section id="section-6" className="space-y-4 pt-4">
        <h2 className="text-xl font-bold font-heading text-[#0B1623]">
          6. Best Practices Checklist
        </h2>
        <p className="text-slate-600">
          A quick checklist to keep your React apps running at peak performance:
        </p>
        <div className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-5 space-y-3">
          {[
            "Minimize re-renders",
            "Keep components small and focused",
            "Use memoization wisely",
            "Optimize bundle size",
            "Measure and monitor regularly",
          ].map((check, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded bg-[#0E7C86] text-white flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-[#0B1623]">
                {check}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7 */}
      <section id="section-7" className="space-y-3 pt-4">
        <h2 className="text-xl font-bold font-heading text-[#0B1623]">
          7. Conclusion
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Optimizing performance is an ongoing process. By following these best
          practices and continuously monitoring your application, you can ensure
          a fast, smooth, and delightful experience for your users.
        </p>
      </section>

      {/* Share Section */}
      <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <span className="text-xs font-bold text-[#0B1623] uppercase tracking-wider">
          Share this article
        </span>
        <div className="flex items-center gap-2">
          <a
            href="https://twitter.com/share"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-[#0E7C86] hover:text-white flex items-center justify-center transition-colors"
          >
            <FaTwitter className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://linkedin.com/share"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-[#0E7C86] hover:text-white flex items-center justify-center transition-colors"
          >
            <FaLinkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://facebook.com/share"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-[#0E7C86] hover:text-white flex items-center justify-center transition-colors"
          >
            <FaFacebook className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleCopyLink}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-[#0E7C86] hover:text-white flex items-center justify-center transition-colors relative"
            title="Copy Link"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
