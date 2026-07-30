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

async function seedHomepage() {
  console.log("🌱 Starting Dedicated JitSeeTec Homepage Database Seeding...");
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

  const Stat = mongoose.models.Stat || (await import("../models/Stat")).default;
  const SiteContent =
    mongoose.models.SiteContent ||
    (await import("../models/SiteContent")).default;

  // 1. Seed Homepage Stats Counter Bar
  console.log("📊 Seeding Homepage Counter Statistics...");
  await Stat.deleteMany({});
  await Stat.insertMany([
    { label: "Projects Delivered", val: "14+", iconName: "Rocket", order: 1 },
    { label: "Client Satisfaction", val: "95%", iconName: "Smile", order: 2 },
    { label: "Years of Experience", val: "4+", iconName: "Calendar", order: 3 },
    { label: "Technologies", val: "10+", iconName: "Code2", order: 4 },
    { label: "Countries Served", val: "8", iconName: "Globe", order: 5 },
  ]);
  console.log("✅ Homepage Stats seeded successfully.");

  // 2. Seed Homepage SiteContent Sections
  console.log(
    "🌐 Seeding Homepage Content Sections (home_hero, home_what_we_do, home_why)...",
  );

  const homeSections = [
    {
      sectionKey: "home_hero",
      data: {
        title: "Unlocking Strategic Digital Acceleration.",
        subtitle: "SOFTWARE SOLUTIONS THAT DRIVE GROWTH",
        description:
          "We design and build modern, scalable and high-performance digital solutions that help startups, SMEs and enterprises transform ideas into impactful products.",
        heroImage: "/images/hero_isometric_tech.png",
      },
    },
    {
      sectionKey: "home_what_we_do",
      data: {
        subtitle: "WHAT WE DO",
        title: "End-to-End Digital Solutions Built for the Future",
        description:
          "From ideation to deployment, we deliver tailored solutions that drive efficiency, growth and long-term success.",
        servicesList: [
          {
            title: "Web Development",
            desc: "We build fast, responsive and scalable web applications using modern technologies.",
            link: "/services#web-dev",
          },
          {
            title: "Mobile App Development",
            desc: "Native and cross-platform mobile apps that deliver seamless user experiences.",
            link: "/services#mobile-dev",
          },
          {
            title: "UI/UX Design",
            desc: "User-centered designs that are intuitive, engaging and aligned with your brand.",
            link: "/services#uiux-design",
          },
          {
            title: "Cloud & DevOps",
            desc: "Scalable cloud solutions and DevOps practices to ensure reliability and performance.",
            link: "/services#cloud-devops",
          },
          {
            title: "Custom Software",
            desc: "Robust software solutions tailored to your unique business requirements.",
            link: "/services#custom-software",
          },
        ],
      },
    },
    {
      sectionKey: "home_why",
      data: {
        subtitle: "WHY CHOOSE US",
        title: "Your Success Is Our Commitment",
        description:
          "We combine technology, creativity and strategy to deliver solutions that help you stay ahead in a competitive digital landscape.",
        pillars: [
          {
            title: "Client-Centric Approach",
            desc: "We listen, collaborate and align our solutions with your business goals.",
          },
          {
            title: "Transparent Process",
            desc: "We follow clear communication and transparent processes at every step.",
          },
          {
            title: "Agile & Scalable",
            desc: "Our agile approach ensures flexibility, scalability and faster time-to-market.",
          },
          {
            title: "Long-Term Partnership",
            desc: "We build lasting relationships and support your growth beyond delivery.",
          },
        ],
      },
    },
  ];

  for (const item of homeSections) {
    await SiteContent.findOneAndUpdate(
      { sectionKey: item.sectionKey },
      { data: item.data },
      { upsert: true, new: true },
    );
  }
  console.log("✅ Homepage content sections seeded successfully.");

  console.log("\n🎉 Homepage seeding completed successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

seedHomepage().catch((err) => {
  console.error("❌ Error seeding homepage database:", err);
  process.exit(1);
});
