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
  const match = MONGODB_URI.match(/^mongodb:\/\/([^:]+):([^@]+)@(?:[^\.]+\.)+([^\/]+)\/([^?]+)/);
  if (match) {
    const [, user, pass, domain, dbName] = match;
    MONGODB_URI = `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${domain}/${dbName}?retryWrites=true&w=majority`;
  }
}

async function seedServices() {
  console.log("🌱 Starting Dedicated JitSeeTec Services Page Database Seeding...");
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
    mongoose.models.SiteContent || (await import("../models/SiteContent")).default;

  console.log("🌐 Seeding Services Page Content Sections...");

  const servicesSections = [
    {
      sectionKey: "services_hero",
      data: {
        title: "Services That Drive Real Business Impact",
        subtitle: "OUR SERVICES",
        description:
          "We design, build and scale digital solutions that help startups, SMEs and enterprises innovate faster, operate smarter and grow beyond limits.",
        heroImage: "/images/services_hero_3d.png",
      },
    },
    {
      sectionKey: "services_offerings",
      data: {
        subtitle: "WHAT WE OFFER",
        title: "End-to-End Digital Solutions Tailored to Your Needs",
        description:
          "From strategy and design to development and support, we offer a wide range of services to turn your ideas into powerful digital products.",
      },
    },
    {
      sectionKey: "services_process",
      data: {
        subtitle: "OUR PROCESS",
        heading: "A Collaborative Process That Delivers Results",
        steps: [
          { stepNumber: 1, step: "01", title: "Discover", desc: "We understand your business, goals and challenges." },
          { stepNumber: 2, step: "02", title: "Plan", desc: "We define the strategy, roadmap and technical approach." },
          { stepNumber: 3, step: "03", title: "Design", desc: "We create intuitive designs that users love." },
          { stepNumber: 4, step: "04", title: "Develop", desc: "We build robust, scalable and secure solutions." },
          { stepNumber: 5, step: "05", title: "Deliver", desc: "We test, deploy and deliver great software on time." },
          { stepNumber: 6, step: "06", title: "Support", desc: "We provide ongoing support and continuous improvement." },
        ],
      },
    },
    {
      sectionKey: "services_why",
      data: {
        subtitle: "WHY CHOOSE US",
        title: "Your Success Is Our Commitment",
        pillars: [
          {
            title: "Experienced Team",
            desc: "Skilled professionals with years of experience in modern technologies.",
          },
          {
            title: "Agile & Transparent",
            desc: "We work in agile sprints and keep you updated at every step.",
          },
          {
            title: "Quality First",
            desc: "We follow best practices to deliver reliable and high-quality solutions.",
          },
          {
            title: "On-Time Delivery",
            desc: "We respect deadlines and deliver your projects on time, every time.",
          },
          {
            title: "Long-Term Partner",
            desc: "We build lasting relationships and support your growth beyond delivery.",
          },
        ],
      },
    },
  ];

  for (const item of servicesSections) {
    await SiteContent.findOneAndUpdate(
      { sectionKey: item.sectionKey },
      { data: item.data },
      { upsert: true, new: true }
    );
  }

  console.log("✅ Services page content sections seeded successfully.");
  console.log("\n🎉 Services page seeding completed successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

seedServices().catch((err) => {
  console.error("❌ Error seeding services database:", err);
  process.exit(1);
});
