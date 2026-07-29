"use client";

import React from "react";
import { List } from "lucide-react";

export default function TableOfContents() {
  const items = [
    { id: "section-1", title: "1. Why Performance Matters in React" },
    { id: "section-2", title: "2. Common Performance Bottlenecks" },
    { id: "section-3", title: "3. Tips to Optimize React Performance" },
    { id: "section-4", title: "4. Advanced Optimization Techniques" },
    { id: "section-5", title: "5. Measuring Performance" },
    { id: "section-6", title: "6. Best Practices Checklist" },
    { id: "section-7", title: "7. Conclusion" },
  ];

  return (
    <div className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-6 mb-8">
      <div className="flex items-center gap-2.5 mb-4 text-[#0B1623]">
        <List className="w-4 h-4 text-[#0E7C86]" />
        <h3 className="text-sm font-bold font-heading">Table of Contents</h3>
      </div>
      <ul className="space-y-2.5 text-xs">
        {items.map((item, idx) => (
          <li key={idx}>
            <a
              href={`#${item.id}`}
              className="text-slate-600 hover:text-[#0E7C86] font-medium transition-colors hover:underline block"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
