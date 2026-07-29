# JitSeeTec Architecture & Repository Analysis

This document provides a comprehensive analysis of the **JitSeeTec Website codebase structure**. It details the **existing repository architecture** (Next.js 16 App Router with modular frontend components) and presents a **proposed full-stack architecture** for integrating a database, API routes, authentication, and content management (CMS) within the same Next.js project.

---

## 📌 Executive Summary

| Architectural Dimension | Existing Setup (Current) | Proposed Full-Stack Architecture |
| :--- | :--- | :--- |
| **Architecture Type** | Static-First Next.js App Router | Full-Stack Monorepo (Next.js Serverless + DB) |
| **Data Source** | Hardcoded TypeScript arrays in components | MongoDB Atlas Database + Mongoose Schemas |
| **Content Updates** | Code edit + Git push + Build redeployment | Admin Dashboard UI (`/admin`) or API routes |
| **Hosting & Infra** | Vercel Static Hosting ($0/mo) | Vercel Serverless + MongoDB Atlas ($0/mo) |
| **Media Handling** | Static assets stored in `public/images/` | Cloudinary CDN / Uploadthing |
| **Authentication** | None (Public site) | NextAuth.js / HTTP-Only JWT Cookie Auth |

---

## 📂 1. Current Repository Structure

The current codebase is organized into **lightweight page entrypoints** (~50 lines each) located in `app/` and **39 modular section components** categorized by page route in `app/components/`.

```text
jitseetec/
├── app/                                  # Next.js 16 App Router Routes & Pages
│   ├── about/
│   │   └── page.tsx                      # About Us Page (/about)
│   ├── blog/
│   │   ├── page.tsx                      # Primary Blog Detail Page (/blog)
│   │   └── [slug]/
│   │       └── page.tsx                  # Dynamic Blog Post Route (/blog/[slug])
│   ├── case-studies/
│   │   ├── page.tsx                      # Primary Case Study Detail Page (/case-studies)
│   │   └── [slug]/
│   │       └── page.tsx                  # Dynamic Case Study Route (/case-studies/[slug])
│   ├── contact/
│   │   └── page.tsx                      # Contact Us Page (/contact)
│   ├── portfolio/
│   │   └── page.tsx                      # Portfolio Showcase Page (/portfolio)
│   ├── resources/
│   │   └── page.tsx                      # Resource Hub Page (/resources)
│   ├── services/
│   │   └── page.tsx                      # Services Overview Page (/services)
│   ├── components/                       # Shared & Section Components
│   │   ├── Navbar.tsx                    # Global Header with Dropdowns
│   │   ├── Footer.tsx                    # Global Corporate Footer
│   │   ├── ConsultationModal.tsx         # Project Consultation Booking Modal
│   │   ├── about/                        # About Page Components
│   │   │   ├── AboutHero.tsx             # Hero with Office Graphic
│   │   │   ├── MissionVisionValues.tsx   # Mission, Vision & Core Values
│   │   │   ├── MilestonesTimeline.tsx    # Horizontal Timeline with Hover Glow
│   │   │   ├── LeadershipTeam.tsx        # Team Profiles with LinkedIn Icons
│   │   │   └── AboutCta.tsx              # Remote Culture & Hiring Links
│   │   ├── blog/                         # Blog Detail Page Components
│   │   │   ├── BlogDetailHero.tsx        # Hero with Workspace Graphic & Metadata
│   │   │   ├── TableOfContents.tsx       # Table of Contents Navigation Card
│   │   │   ├── BlogArticleBody.tsx       # Formatted Article Body & Callout Quotes
│   │   │   ├── AuthorCard.tsx            # Author Bio & LinkedIn Link
│   │   │   ├── PostNavigation.tsx        # Previous / Next Article Navigation
│   │   │   ├── BlogSidebar.tsx           # Author, Related Posts & Newsletter Widget
│   │   │   └── RelatedPostsGrid.tsx      # "You Might Also Like" 3-Card Grid
│   │   ├── casestudy/                    # Case Study Detail Page Components
│   │   │   ├── CaseStudyHero.tsx         # Hero with Dual Product Mockup
│   │   │   ├── CaseStudyImpactBar.tsx    # 4 Key Metrics Highlight Bar
│   │   │   ├── CaseStudyBody.tsx         # 14 Detailed Case Study Sections
│   │   │   ├── CaseStudySidebar.tsx      # Social Share & Project Categories Widget
│   │   │   ├── RelatedCaseStudies.tsx    # 4 Related Case Studies Grid
│   │   │   └── CaseStudyCta.tsx          # Bottom Conversion Banner
│   │   ├── contact/                      # Contact Page Components
│   │   │   ├── ContactHero.tsx           # Contact Hero Banner
│   │   │   ├── OfficeCardsSection.tsx    # HQ (Lalitpur), Hub (Birgunj) & Remote
│   │   │   ├── ContactFormSection.tsx    # Interactive Contact Form & Details
│   │   │   └── ContactCtaSection.tsx     # Direct Email & Phone Banner
│   │   ├── home/                         # Landing Page Components
│   │   │   ├── HomeHero.tsx              # Primary Hero with 3D Isometric Tech Graphic
│   │   │   ├── StatsCounterBar.tsx       # Counter Bar (14+ Projects, 98% CSAT)
│   │   │   ├── ServicesOverviewSection.tsx # 4 Service Pillar Cards
│   │   │   ├── WhyChooseUsSection.tsx    # Why Choose Us Feature Cards
│   │   │   ├── FeaturedWorkSection.tsx   # Project Portfolio Preview Cards
│   │   │   ├── LatestArticlesSection.tsx # Testimonial Carousel & Blog Teasers
│   │   │   └── HomeCtaBanner.tsx         # Bottom Conversion Callout
│   │   ├── portfolio/                    # Portfolio Page Components
│   │   │   ├── PortfolioHero.tsx         # Portfolio Hero Section
│   │   │   ├── CategoryFilterGrid.tsx    # Category & Industry Filterable Grid
│   │   │   └── PortfolioCta.tsx          # Portfolio Call to Action
│   │   ├── resources/                    # Resources Page Components
│   │   │   ├── ResourcesHero.tsx         # Resources Hero Section
│   │   │   ├── CategoryExplorer.tsx      # Resource Category Navigation
│   │   │   ├── FeaturedCaseStudies.tsx   # Featured Case Studies List
│   │   │   ├── LatestBlogPosts.tsx       # Latest Blog Articles Grid
│   │   │   └── ResourcesCta.tsx          # Newsletter & Resource CTA
│   │   └── services/                     # Services Page Components
│   │       ├── ServicesHero.tsx          # Services Hero Section
│   │       ├── ServiceCards.tsx          # Detailed Service Offerings Grid
│   │       └── DevelopmentProcess.tsx    # 6-Step Development Process
│   ├── globals.css                       # Global Tailwind CSS & Custom Styles
│   ├── layout.tsx                        # Root HTML Layout & Font Setup
│   └── page.tsx                          # Homepage Landing Route (/)
├── public/                               # Public Static Assets
│   ├── favicon.ico                       # Website Favicon Icon
│   ├── images/                           # Generated 3D Mockups & Headshots (14 PNGs)
│   └── logo/                             # JitSeeTec Brand Logo Files
├── .gitignore                            # Git Exclusion Rules
├── AGENTS.md                             # Agent Behavioral Rules & Directives
├── eslint.config.mjs                     # ESLint Linter Rules Configuration
├── next.config.ts                        # Next.js Server & Build Settings
├── package.json                          # Node.js Dependencies & Scripts
├── postcss.config.mjs                    # PostCSS Plugins Configuration
├── README.md                             # Repository Setup Documentation
└── tsconfig.json                         # TypeScript Compiler Configuration
```

---

## 🛠️ 2. Proposed Full-Stack Architecture

To enable **dynamic content management**, **database persistence**, and an **admin dashboard** without adding a separate backend server or extra infrastructure cost, we propose extending the existing Next.js codebase into a **Full-Stack Application**.

### Proposed Folder & File Hierarchy

```text
jitseetec/
├── app/
│   ├── (public)/                         # Public Website Routes (Existing Pages)
│   │   ├── page.tsx                      # Homepage (Fetches DB / Revalidated)
│   │   ├── about/page.tsx                # About Page (Fetches DB Team & Stats)
│   │   ├── blog/
│   │   │   ├── page.tsx                  # Blog Feed Page
│   │   │   └── [slug]/page.tsx           # Dynamic Blog Article (Queries DB)
│   │   ├── case-studies/
│   │   │   ├── page.tsx                  # Case Studies Feed Page
│   │   │   └── [slug]/page.tsx           # Dynamic Case Study (Queries DB)
│   │   ├── contact/page.tsx              # Contact Page (POSTs lead to API)
│   │   ├── portfolio/page.tsx            # Portfolio Page (Fetches DB Projects)
│   │   ├── resources/page.tsx            # Resources Page
│   │   └── services/page.tsx             # Services Page
│   │
│   ├── admin/                            # 🔐 Protected Admin Panel (NEW)
│   │   ├── layout.tsx                    # Admin Sidebar Navigation Layout
│   │   ├── page.tsx                      # Admin Dashboard Overview & Analytics
│   │   ├── login/page.tsx                # Admin Authentication Login Page
│   │   ├── blogs/
│   │   │   ├── page.tsx                  # Blog Posts Data Table
│   │   │   ├── new/page.tsx              # Rich Text Editor for New Blog
│   │   │   └── [id]/edit/page.tsx        # Edit Existing Blog Post
│   │   ├── case-studies/
│   │   │   ├── page.tsx                  # Case Studies Data Table
│   │   │   ├── new/page.tsx              # Create Case Study Form
│   │   │   └── [id]/edit/page.tsx        # Edit Case Study Form
│   │   ├── team/
│   │   │   └── page.tsx                  # Team Profiles Manager
│   │   ├── portfolio/
│   │   │   └── page.tsx                  # Portfolio Projects Manager
│   │   └── leads/
│   │       └── page.tsx                  # Contact Form Inquiries & Submissions
│   │
│   ├── api/                              # ⚙️ Serverless API Route Handlers (NEW)
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts    # NextAuth.js Authentication Handler
│   │   ├── blogs/
│   │   │   ├── route.ts                  # GET /api/blogs, POST /api/blogs
│   │   │   └── [id]/route.ts             # GET, PUT, DELETE /api/blogs/:id
│   │   ├── case-studies/
│   │   │   ├── route.ts                  # GET /api/case-studies, POST /api/case-studies
│   │   │   └── [id]/route.ts             # GET, PUT, DELETE /api/case-studies/:id
│   │   ├── team/
│   │   │   └── route.ts                  # GET, POST, PUT, DELETE /api/team
│   │   ├── portfolio/
│   │   │   └── route.ts                  # GET, POST, PUT, DELETE /api/portfolio
│   │   ├── leads/
│   │   │   └── route.ts                  # POST /api/leads (Contact Form)
│   │   └── upload/
│   │       └── route.ts                  # Cloudinary Media Upload Handler
│   │
│   ├── components/                       # UI Components (Existing + Admin UI)
│   │   ├── admin/                        # 🆕 Admin Specific UI Components
│   │   │   ├── RichTextEditor.tsx        # TipTap / Slate WYSIWYG Editor
│   │   │   ├── ImageUploader.tsx         # Drag & Drop Image Upload Widget
│   │   │   ├── DataTable.tsx             # Reusable Data Table with Sorting
│   │   │   └── AdminSidebar.tsx          # Admin Navigation Sidebar
│   │   ├── about/                        # About Section Components
│   │   ├── blog/                         # Blog Components
│   │   ├── casestudy/                    # Case Study Components
│   │   ├── contact/                      # Contact Components
│   │   ├── home/                         # Home Components
│   │   ├── portfolio/                    # Portfolio Components
│   │   ├── resources/                    # Resource Components
│   │   ├── services/                     # Service Components
│   │   ├── Navbar.tsx                    # Global Header
│   │   ├── Footer.tsx                    # Global Footer
│   │   └── ConsultationModal.tsx         # Consultation Modal
│   ├── globals.css
│   └── layout.tsx
│
├── lib/                                  # 🔌 Core Backend Services & Drivers (NEW)
│   ├── db.ts                             # MongoDB Singleton Connection Manager
│   ├── cloudinary.ts                     # Cloudinary SDK Configuration
│   ├── auth.ts                           # Authentication & Session Helpers
│   └── email.ts                          # Resend / Nodemailer Email Service
│
├── models/                               # 🗄️ Database Mongoose Schemas (NEW)
│   ├── User.ts                           # Admin User Schema (Email, Hashed Password)
│   ├── Blog.ts                           # Blog Post Schema
│   ├── CaseStudy.ts                      # Case Study Schema
│   ├── Project.ts                        # Portfolio Project Schema
│   ├── TeamMember.ts                     # Team Member Profile Schema
│   ├── Testimonial.ts                    # Client Testimonial Schema
│   ├── Stat.ts                           # Website Statistics Schema
│   └── Lead.ts                           # Contact Form Submission Schema
│
├── middleware.ts                         # 🛡️ Route Protection Middleware (NEW)
├── public/                               # Static Public Assets
└── package.json                          # Dependencies (`mongoose`, `next-auth`, `cloudinary`)
```

---

## 🔄 3. Detailed Component & Module Breakdown

### A. Database Layer (`lib/db.ts` & `models/`)
- **`lib/db.ts`**: Implements a cached connection pool to MongoDB Atlas using `mongoose`. Ensures serverless functions reuse database connections across requests without exceeding Atlas limits.
- **`models/*.ts`**: Strongly typed data schemas defining fields, validation rules, indexes, and default values.

### B. Serverless API Layer (`app/api/`)
- **`app/api/blogs/route.ts`**: Replaces hardcoded arrays. Returns JSON data on `GET` and validates JWT session before allowing `POST`, `PUT`, or `DELETE`.
- **`app/api/upload/route.ts`**: Receives media uploads from the admin panel and uploads them to Cloudinary CDN, returning secure URLs.

### C. Admin Portal (`app/admin/`)
- **`app/admin/login/page.tsx`**: Secure authentication form for content managers.
- **`app/admin/blogs/new/page.tsx`**: WYSIWYG editor for drafting, previewing, and publishing blog posts.
- **`app/admin/leads/page.tsx`**: Dashboard displaying contact form submissions from prospective clients.

### D. Security Middleware (`middleware.ts`)
- Inspects incoming requests to `/admin/*` and `/api/*`. Redirects unauthenticated users to `/admin/login` and prevents unauthorized API mutations.

---

## 📊 4. Structural Comparison Summary

| Module / Layer | Current Architecture | Proposed Full-Stack Architecture |
| :--- | :--- | :--- |
| **Data Layer** | Static TypeScript arrays | MongoDB Atlas + Mongoose Schemas |
| **Backend API** | None (Pure client components) | Next.js Serverless Route Handlers (`app/api/`) |
| **Authentication** | None | NextAuth.js / HTTP-Only JWT Cookies |
| **Media Pipeline** | Local files in `public/images/` | Cloudinary CDN Integration |
| **Admin Portal** | None | Dedicated `/admin` Dashboard |
| **Deployment** | Vercel ($0/mo) | Vercel + MongoDB Atlas ($0/mo) |
| **Content Updates** | Developer modifies code & pushes Git commit | Non-technical user edits via `/admin` dashboard |

---

## 🚀 5. Implementation Roadmap

When you are ready to transition to the full-stack architecture:

1. **Step 1: Install Dependencies**:
   ```bash
   npm install mongoose next-auth cloudinary
   ```
2. **Step 2: Connect MongoDB Atlas**:
   Add `MONGODB_URI` and `CLOUDINARY_URL` to `.env.local`.
3. **Step 3: Add Database Singleton & Schemas**:
   Create `lib/db.ts` and define models in `models/`.
4. **Step 4: Create API Routes & Admin Panel**:
   Build `app/api/` handlers and the `/admin/` management dashboard.
