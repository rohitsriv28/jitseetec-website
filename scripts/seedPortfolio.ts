import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// Load .env file natively if present
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  for (const line of envConfig.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts.join("=").trim();
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = value;
      }
    }
  }
}

let MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jitseetec";

if (MONGODB_URI.includes("mongodb://") && MONGODB_URI.includes("mongodb.net")) {
  const match = MONGODB_URI.match(
    /^mongodb:\/\/([^:]+):([^@]+)@(?:[^\.]+\.)+([^\/]+)\/([^?]+)/,
  );
  if (match) {
    const [, user, pass, domain, dbName] = match;
    MONGODB_URI = `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${domain}/${dbName}?retryWrites=true&w=majority`;
  }
}

async function seedPortfolio() {
  console.log("🌱 Starting JitSeeTec Portfolio Page Seeding...");
  console.log("Connecting via Mongoose...");

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log("✅ Successfully connected to MongoDB database.");
  } catch (connErr: any) {
    console.error("\n❌ Connection Diagnostic:", connErr.message);
    process.exit(1);
  }

  const SiteContent =
    mongoose.models.SiteContent ||
    (await import("../models/SiteContent")).default;
  const Project =
    mongoose.models.Project || (await import("../models/Project")).default;
  const Testimonial =
    mongoose.models.Testimonial ||
    (await import("../models/Testimonial")).default;

  // ─── 1. Portfolio Hero ────────────────────────────────────────────────────
  console.log("\n📄 Seeding portfolio_hero...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "portfolio_hero" },
    {
      data: {
        subtitle: "PORTFOLIO",
        title: "Our Work. Real Impact.",
        description:
          "Explore a selection of digital products we've designed and developed for startups, SMEs, and enterprises across the globe.",
        heroImage: "/images/portfolio_hero_3d.png",
      },
    },
    { upsert: true, returnDocument: "after" },
  );
  console.log("  ✅ portfolio_hero done.");

  // ─── 2. Brand Logo Strip ──────────────────────────────────────────────────
  console.log("\n🏷️  Seeding portfolio_brands...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "portfolio_brands" },
    {
      data: {
        heading: "TRUSTED BY BUSINESSES WORLDWIDE",
        brands: [
          "NOVATECH",
          "MEDIFLOW",
          "EduSphere",
          "Finova",
          "Travelo",
          "HealthPlus",
          "Payrix",
        ],
      },
    },
    { upsert: true, returnDocument: "after" },
  );
  console.log("  ✅ portfolio_brands done.");

  // ─── 3. Portfolio CTA ─────────────────────────────────────────────────────
  console.log("\n📣 Seeding portfolio_cta...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "portfolio_cta" },
    {
      data: {
        title: "Have a Similar Project in Mind?",
        description:
          "Let's discuss how we can help you build your next digital success story.",
        buttonLabel: "Start a Project",
      },
    },
    { upsert: true, returnDocument: "after" },
  );
  console.log("  ✅ portfolio_cta done.");

  // ─── 4. Projects (Portfolio Grid) ────────────────────────────────────────
  console.log("\n🗂️  Seeding Projects collection...");

  const projectsToSeed = [
    {
      title: "Finova Dashboard",
      category: "Web Development",
      industry: "Fintech",
      desc: "A comprehensive financial management platform for businesses with real-time analytics, budget tracking, and automated reporting.",
      tags: ["React", "Node.js", "MongoDB"],
      image: "/images/finova_dashboard.png",
      clientName: "Finova",
      caseStudySlug: "finova",
      featured: true,
      order: 1,
    },
    {
      title: "MediFlow App",
      category: "Mobile Apps",
      industry: "Healthcare",
      desc: "Telemedicine mobile app connecting doctors and patients seamlessly with appointments, video consultations, and e-prescriptions.",
      tags: ["Flutter", "Firebase", "Node.js"],
      image: "/images/mediflow_app.png",
      clientName: "MediFlow",
      caseStudySlug: "mediflow",
      featured: true,
      order: 2,
    },
    {
      title: "ShopHub Platform",
      category: "Web Development",
      industry: "E-commerce",
      desc: "Feature-rich e-commerce platform with advanced search, recommendation engine, secure payments, and order management system.",
      tags: ["Next.js", "Tailwind CSS", "Stripe"],
      image: "/images/shophub_platform.png",
      clientName: "ShopHub",
      caseStudySlug: "shophub",
      featured: true,
      order: 3,
    },
    {
      title: "UrbanNest Website",
      category: "UI/UX Design",
      industry: "Real Estate",
      desc: "Modern real estate platform for property listings, virtual tours, lead management, and advanced search for buyers and agents.",
      tags: ["Vue.js", "Laravel", "MySQL"],
      image: "/images/urban_nest.png",
      clientName: "UrbanNest",
      caseStudySlug: "urbannest",
      featured: false,
      order: 4,
    },
    {
      title: "EduSphere LMS",
      category: "Custom Software",
      industry: "Education",
      desc: "Learning management system with course management, live classes, assessments, and progress tracking for students.",
      tags: ["React", "Node.js", "PostgreSQL"],
      image: "/images/edusphere_lms.png",
      clientName: "EduSphere",
      caseStudySlug: "edusphere",
      featured: false,
      order: 5,
    },
    {
      title: "TranspoTrack System",
      category: "Custom Software",
      industry: "Logistics",
      desc: "Logistics and fleet management system with real-time tracking, route optimization, and maintenance management.",
      tags: ["Angular", ".NET Core", "SQL Server"],
      image: "/images/transpotrack.png",
      clientName: "TranspoTrack",
      caseStudySlug: "transpotrack",
      featured: false,
      order: 6,
    },
  ];

  for (const proj of projectsToSeed) {
    await Project.findOneAndUpdate({ title: proj.title }, proj, {
      upsert: true,
      returnDocument: "after",
    });
    console.log(`  ✅ Project: ${proj.title}`);
  }

  // ─── 5. Testimonials (Client Success Stories) ────────────────────────────
  console.log("\n💬 Seeding Testimonials collection...");

  const testimonialsToSeed = [
    {
      author: "Rohit Sharma",
      role: "CEO",
      company: "Finova",
      quote:
        "JitSeeTec delivered an exceptional product that exceeded our expectations. Their team was professional, responsive, and truly understood our vision.",
      avatar: "",
      rating: 5,
      featured: true,
      order: 1,
    },
    {
      author: "Priya Nair",
      role: "Product Manager",
      company: "MediFlow",
      quote:
        "The communication and project management were outstanding. We're impressed with their technical expertise and attention to detail.",
      avatar: "",
      rating: 5,
      featured: true,
      order: 2,
    },
    {
      author: "James Carter",
      role: "Founder",
      company: "ShopHub",
      quote:
        "Our e-commerce platform saw a 40% increase in conversions after launch. Great team, great results!",
      avatar: "",
      rating: 5,
      featured: true,
      order: 3,
    },
    {
      author: "Ananya Singh",
      role: "CTO",
      company: "EduSphere",
      quote:
        "Working with JitSeeTec was a seamless experience. They built a robust LMS that handles thousands of concurrent learners without a hitch.",
      avatar: "",
      rating: 5,
      featured: false,
      order: 4,
    },
    {
      author: "Lucas Fernandez",
      role: "Operations Head",
      company: "TranspoTrack",
      quote:
        "The fleet tracking system they built reduced our operational costs by 30%. Highly recommend their engineering team.",
      avatar: "",
      rating: 5,
      featured: false,
      order: 5,
    },
  ];

  for (const t of testimonialsToSeed) {
    await Testimonial.findOneAndUpdate(
      { author: t.author, company: t.company },
      t,
      { upsert: true, returnDocument: "after" },
    );
    console.log(`  ✅ Testimonial: ${t.author} — ${t.company}`);
  }

  console.log("\n🎉 Portfolio page seeding completed successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

seedPortfolio().catch((err) => {
  console.error("❌ Error seeding portfolio database:", err);
  process.exit(1);
});
