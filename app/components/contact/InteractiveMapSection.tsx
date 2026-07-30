"use client";

import React, { useEffect, useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { subscribeToCmsUpdate } from "@/lib/cmsBus";

export default function InteractiveMapSection() {
  const [content, setContent] = useState<any>({
    location: "Imadol, Lalitpur, Bagmati Province, Nepal",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d563.7535892769768!2d85.34472344216444!3d27.66557656021389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19fb545a7a6b%3A0x75ff9b4afb2d999d!2sM88V%2B6W9%2C%2044600%2C%20Nepal!5e1!3m2!1sen!2sin!4v1785314987417!5m2!1sen!2sin",
    googleMapsDirectionsUrl: "https://maps.app.goo.gl/fa84PRvN3VryUcnh7",
  });

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content/contact_info");
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
      if (!key || key === "contact_info") {
        fetchContent();
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="relative py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-slate-300 shadow-xl h-[420px] bg-slate-200">
          {/* Embedded Interactive Google Map Iframe */}
          <iframe
            title="JitSeeTec Headquarters Location Map"
            src={
              content.googleMapsEmbedUrl ||
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d563.7535892769768!2d85.34472344216444!3d27.66557656021389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19fb545a7a6b%3A0x75ff9b4afb2d999d!2sM88V%2B6W9%2C%2044600%2C%20Nepal!5e1!3m2!1sen!2sin!4v1785314987417!5m2!1sen!2sin"
            }
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-full"
          />

          {/* Card Overlay on Map */}
          <div className="absolute bottom-6 left-6 max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-3 z-10">
            <h3 className="text-base font-bold font-heading text-[#0B1623]">
              Our Headquarters
            </h3>
            <p className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#0E7C86] shrink-0 mt-0.5" />
              <span>{content.location || "Imadol, Lalitpur, Bagmati Province, Nepal"}</span>
            </p>
            <a
              href={content.googleMapsDirectionsUrl || "https://maps.app.goo.gl/fa84PRvN3VryUcnh7"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E7C86] hover:bg-[#0B6871] text-white text-xs font-bold transition-all shadow-md"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
