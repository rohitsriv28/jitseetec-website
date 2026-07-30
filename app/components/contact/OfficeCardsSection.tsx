"use client";

import React, { useEffect, useState } from "react";
import { Building, Building2, Globe, ArrowRight } from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

const officeIcons = [Building, Building2, Globe];

export default function OfficeCardsSection() {
  const [content, setContent] = useState<any>({
    title: "Our Locations",
    description:
      "Majorly operated from Lalitpur with key presence in Birgunj and serving clients worldwide.",
    offices: [
      {
        label: "Headquarters",
        address: "Imadol, Lalitpur\nBagmati Province, Nepal",
        directionsUrl: "https://maps.app.goo.gl/fa84PRvN3VryUcnh7",
        directionsLabel: "Get Directions",
      },
      {
        label: "Regional Hub",
        address: "Birgunj, Parsa\nMadhesh Province, Nepal",
        directionsUrl: "https://www.google.com/maps/search/Birgunj,+Nepal",
        directionsLabel: "Get Directions",
      },
      {
        label: "Global Presence",
        address: "Serving Worldwide\nRemote-First Teams",
        directionsUrl: "https://maps.google.com",
        directionsLabel: "View Coverage",
      },
    ],
  });

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content/contact_offices");
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
      if (!key || key === "contact_offices") fetchContent();
    });
    return () => unsubscribe();
  }, []);

  const offices: any[] = content.offices || [];

  return (
    <div className="lg:col-span-6 space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0B1623]">
          {content.title || "Our Locations"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          {content.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {offices.map((office, idx) => {
          const IconComp = officeIcons[idx % officeIcons.length];
          const lines = (office.address || "").split("\n");
          return (
            <div
              key={idx}
              className="bg-[#F7F9FB] border border-slate-200 rounded-2xl p-5 text-left hover:border-[#0E7C86] transition-colors shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0E7C86]/10 text-[#0E7C86] flex items-center justify-center mb-3">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold font-heading text-[#0B1623]">
                  {office.label}
                </h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {lines.map((line: string, i: number) => (
                    <span key={i}>
                      {line}
                      {i < lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
              <a
                href={office.directionsUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0E7C86] hover:underline pt-3"
              >
                <span>{office.directionsLabel || "Get Directions"}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
