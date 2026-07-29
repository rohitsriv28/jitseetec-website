"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModal";

// Modular Blog Section Components
import BlogDetailHero from "../components/blog/BlogDetailHero";
import TableOfContents from "../components/blog/TableOfContents";
import BlogArticleBody from "../components/blog/BlogArticleBody";
import AuthorCard from "../components/blog/AuthorCard";
import PostNavigation from "../components/blog/PostNavigation";
import BlogSidebar from "../components/blog/BlogSidebar";
import RelatedPostsGrid from "../components/blog/RelatedPostsGrid";

export default function BlogDetailPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1623] text-white selection:bg-[#0E7C86] selection:text-white">
      {/* Navbar */}
      <Navbar onOpenConsultation={() => setConsultationOpen(true)} />

      <main className="flex-1 bg-white text-slate-900">
        {/* Blog Detail Hero Banner */}
        <BlogDetailHero />

        {/* Main Article & Sidebar Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 8 Columns: Article Content */}
            <div className="lg:col-span-8">
              {/* Table of Contents Box */}
              <TableOfContents />

              {/* Main Article Content Body */}
              <BlogArticleBody />

              {/* Author Bio Card */}
              <AuthorCard />

              {/* Previous / Next Article Navigation */}
              <PostNavigation />
            </div>

            {/* Right 4 Columns: Sidebar Widgets */}
            <div className="lg:col-span-4">
              <BlogSidebar />
            </div>
          </div>
        </div>

        {/* You Might Also Like Grid */}
        <RelatedPostsGrid />
      </main>

      {/* Footer */}
      <Footer />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}
