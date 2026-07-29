# 🚀 JitSeeTec Pvt. Ltd. — Digital Acceleration & Software Development

Official website for **JitSeeTec Pvt. Ltd.**, a modern software development company dedicated to helping startups, SMEs, and enterprises transform ideas into scalable, high-performance digital products.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library & Styling**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [Inter](https://fonts.google.com/specimen/Inter)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

---

## 🎨 Design System & Color Palette

- **Corporate Dark Navy**: `#0B1623` (Main Background & Hero Container Theme)
- **Primary Brand Teal**: `#0E7C86` (Primary Buttons, Highlights & Badges)
- **Cyan Accent**: `#2CCFD3` (Gradients, Highlights & Interactive Hover States)
- **Light Backdrop**: `#F7F9FB` / `#EEF4F8` (Clean Contrast Section Strips)

---

## 📁 Project Architecture & Directory Structure

The project follows a clean, modular component architecture:

```text
jitseetec/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx             # Sticky top header navigation
│   │   ├── Footer.tsx             # Corporate footer with quick links
│   │   ├── ConsultationModal.tsx  # User-triggered consultation dialog
│   │   │
│   │   ├── home/                  # Home page modular section components
│   │   │   ├── HomeHero.tsx
│   │   │   ├── WhatWeDoSection.tsx
│   │   │   ├── StatsCounterBar.tsx
│   │   │   ├── FeaturedWorkSection.tsx
│   │   │   ├── WhyChooseUsSection.tsx
│   │   │   ├── LatestArticlesSection.tsx
│   │   │   └── HomeCta.tsx
│   │   │
│   │   ├── services/              # Services page modular section components
│   │   │   ├── ServicesHero.tsx
│   │   │   ├── ServiceCards.tsx
│   │   │   ├── DevelopmentProcess.tsx
│   │   │   ├── WhyChooseUsServices.tsx
│   │   │   └── ServicesCta.tsx
│   │   │
│   │   ├── portfolio/             # Portfolio page modular section components
│   │   │   ├── PortfolioHero.tsx
│   │   │   ├── CategoryFilterGrid.tsx
│   │   │   ├── BrandLogoStrip.tsx
│   │   │   ├── ClientTestimonials.tsx
│   │   │   └── PortfolioCta.tsx
│   │   │
│   │   ├── about/                 # About page modular section components
│   │   │   ├── AboutHero.tsx
│   │   │   ├── MissionVisionValues.tsx
│   │   │   ├── MilestonesTimeline.tsx
│   │   │   ├── LeadershipTeam.tsx
│   │   │   └── AboutCta.tsx
│   │   │
│   │   ├── resources/             # Resources hub modular section components
│   │   │   ├── ResourcesHero.tsx
│   │   │   ├── CategoryExplorer.tsx
│   │   │   ├── LatestBlogPosts.tsx
│   │   │   ├── FeaturedCaseStudies.tsx
│   │   │   ├── InteractiveFaq.tsx
│   │   │   ├── TechStackSection.tsx
│   │   │   └── GuidesDownloads.tsx
│   │   │
│   │   └── contact/               # Contact page modular section components
│   │       ├── ContactHero.tsx
│   │       ├── ContactFormSection.tsx
│   │       ├── InteractiveMapSection.tsx
│   │       ├── OfficeCardsSection.tsx
│   │       ├── ContactFaqSection.tsx
│   │       └── ContactCtaSection.tsx
│   │
│   ├── page.tsx                   # Home Route (/)
│   ├── services/page.tsx          # Services Route (/services)
│   ├── portfolio/page.tsx         # Portfolio Route (/portfolio)
│   ├── about/page.tsx             # About Us Route (/about)
│   ├── resources/page.tsx         # Resources Hub Route (/resources)
│   ├── contact/page.tsx           # Contact Us Route (/contact)
│   ├── layout.tsx                 # Root Layout & Metadata Setup
│   └── globals.css                # Global CSS & Tailwind Directives
│
└── public/
    ├── logo/                      # Standardized Brand Logo Assets
    │   ├── logo.png               # Primary 3D Brand Mark (Transparent)
    │   ├── logo-512x512.png       # High-Resolution 512x512 PNG
    │   └── README.md              # Logo Asset Guidelines
    │
    ├── favicon.ico                # Multi-resolution favicon ico
    ├── favicon-96x96.png          # High-DPI browser tab icon
    ├── apple-touch-icon.png       # iOS App Icon (180x180)
    └── site.webmanifest           # PWA Web App Manifest
```

---

## 🌟 Key Features & Pages

1. **Home Page (`/`)**:
   - Hero banner with 3D isometric graphic and "Book a Consultation" modal trigger.
   - 5-column "What We Do" service cards grid.
   - Tinted Stats Counter Bar (`#EEF4F8`).
   - Featured Work cards, Why Choose Us grid, Client Testimonials slider, and conversion CTA.

2. **Services Page (`/services`)**:
   - Detailed breakdown of Web Development, Mobile Apps, UI/UX Design, Cloud & DevOps, API Development, and Custom Software.
   - 6-step horizontal collaborative process timeline (`01 Discover` → `06 Support`).

3. **Portfolio Showcase (`/portfolio`)**:
   - Interactive category filter tabs (Web, Mobile, UI/UX, Cloud, Custom Software) and Industry dropdown selector.
   - Client brand logo strip & success stories testimonial cards.

4. **About Us (`/about`)**:
   - Mission, Vision, and Core Values cards.
   - Milestones journey timeline (`2022 Founded` → `Future What's Next`).
   - Leadership profiles (Co-Founders Ronit Kumar & Abhishek Kumar) and Core Team members.
   - Remote-first culture features.

5. **Resources Hub (`/resources`)**:
   - Searchable resources hero banner.
   - Categorized technical articles, featured case study metrics, interactive FAQ accordion, tech stack icon grid, and downloadable whitepaper checklists.

6. **Contact Us (`/contact`)**:
   - Interactive message form with validation & success state.
   - Direct location sidebar, embedded interactive Google Map with exact dropped pin location overlay (`Imadol, Lalitpur`), office location cards, and FAQs.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.x or later) installed on your system.

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production

```bash
npm run build
```

To run the production server locally after building:

```bash
npm run start
```

---

## 🏢 Corporate Headquarters & Contact

- **Company**: JitSeeTec Pvt. Ltd.
- **Location**: Imadol, Lalitpur, Bagmati Province, Nepal
- **Email**: hello@jitseetec.com
- **Phone**: +977 98111 95091
- **Website**: [jitseetec.com](https://jitseetec.com)
