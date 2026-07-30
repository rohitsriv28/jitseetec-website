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

async function seedAbout() {
  console.log("🌱 Starting JitSeeTec About Page Seeding...");
  console.log("Connecting via Mongoose...");

  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
    console.log("✅ Successfully connected to MongoDB database.");
  } catch (connErr: any) {
    console.error("\n❌ Connection Diagnostic:", connErr.message);
    process.exit(1);
  }

  const SiteContent =
    mongoose.models.SiteContent ||
    (await import("../models/SiteContent")).default;
  const TeamMember =
    mongoose.models.TeamMember ||
    (await import("../models/TeamMember")).default;

  // ─── 1. About Hero ────────────────────────────────────────────────────────
  console.log("\n📄 Seeding about_hero...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "about_hero" },
    {
      data: {
        subtitle: "ABOUT US",
        title: "Building Digital Solutions. Empowering Growth.",
        description:
          "JitSeeTec is a technology company that helps startups, SMEs, and enterprises turn ideas into powerful digital products. We combine modern technologies, agile processes, and a user-first mindset to deliver solutions that drive real business impact.",
        officeImage: "/images/about_office_hero.png",
        quickStats: [
          { label: "Founded", value: "2022" },
          { label: "Projects Delivered", value: "14+" },
          { label: "Happy Clients", value: "10+" },
          { label: "Technologies", value: "4+" },
        ],
      },
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log("  ✅ about_hero done.");

  // ─── 2. Mission, Vision & Values ─────────────────────────────────────────
  console.log("\n🎯 Seeding about_mission_vision...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "about_mission_vision" },
    {
      data: {
        mission: {
          title: "Our Mission",
          text: "To deliver innovative, reliable, and scalable digital solutions that help businesses operate smarter, move faster, and grow beyond limits.",
        },
        vision: {
          title: "Our Vision",
          text: "To be a globally trusted technology partner recognized for building software that creates meaningful impact.",
        },
        values: {
          title: "Our Values",
          list: [
            "Client Success First",
            "Quality Without Compromise",
            "Integrity & Transparency",
            "Collaboration & Respect",
            "Innovation in Everything We Do",
            "Continuous Learning",
          ],
        },
      },
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log("  ✅ about_mission_vision done.");

  // ─── 3. Journey Milestones ────────────────────────────────────────────────
  console.log("\n🗺️  Seeding about_milestones...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "about_milestones" },
    {
      data: {
        subtitle: "OUR JOURNEY",
        title: "Milestones That Define Our Growth",
        milestones: [
          {
            year: "2022",
            title: "Founded",
            desc: "JitSeeTec was founded with a mission to help businesses transform through technology.",
          },
          {
            year: "2023",
            title: "First Projects",
            desc: "Delivered our first set of successful projects for startups and SMEs.",
          },
          {
            year: "2024",
            title: "Team Growth",
            desc: "Expanded our team and strengthened our development and delivery capabilities.",
          },
          {
            year: "2025",
            title: "Global Reach",
            desc: "Started working with clients across different regions and industries.",
          },
          {
            year: "Future",
            title: "What's Next",
            desc: "Continuing to innovate, collaborate, and build impactful products.",
          },
        ],
      },
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log("  ✅ about_milestones done.");

  // ─── 4. About CTA ─────────────────────────────────────────────────────────
  console.log("\n📣 Seeding about_cta...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "about_cta" },
    {
      data: {
        title: "Join Our Mission to Build the Future",
        description:
          "We're always looking for passionate, curious, and collaborative people to join our growing team.",
        buttonLabel: "View Open Positions",
      },
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log("  ✅ about_cta done.");

  // ─── 5. Team Members (Leadership + Core Team) ────────────────────────────
  console.log("\n👥 Seeding TeamMember collection...");

  const teamMembers = [
    // ── Leadership ──
    {
      name: "Aayush Gupta",
      role: "Co-Founder & CEO",
      initials: "AG",
      avatar: "/images/leader_aayush.png",
      bio: "Visionary leader with a passion for building products and teams that create lasting impact. Aayush drives strategy, innovation, and client success at JitSeeTec.",
      linkedin: "https://www.linkedin.com/in/ayush-gupta-5ba1ba220/",
      isLeadership: true,
      order: 1,
    },
    {
      name: "Mandip Shah",
      role: "Co-Founder & CTO",
      initials: "MS",
      avatar: "/images/leader_mandip.png",
      bio: "Technology enthusiast and problem solver who leads our engineering team and ensures we deliver scalable, secure, and high-quality software solutions.",
      linkedin: "https://www.linkedin.com/in/mandip-kanu-589790168/",
      isLeadership: true,
      order: 2,
    },
    // ── Core Team ──
    {
      name: "Aayush Gupta",
      role: "Project Manager",
      initials: "AG",
      avatar: "",
      bio: "",
      linkedin: "https://www.linkedin.com/in/ayush-gupta-5ba1ba220/",
      isLeadership: false,
      order: 3,
    },
    {
      name: "Mandip Shah",
      role: "Senior Developer",
      initials: "MS",
      avatar: "",
      bio: "",
      linkedin: "https://www.linkedin.com/in/mandip-kanu-589790168/",
      isLeadership: false,
      order: 4,
    },
    {
      name: "Rohit Srivastava",
      role: "UI/UX Designer & Frontend Developer",
      initials: "RS",
      avatar: "",
      bio: "",
      linkedin: "https://www.linkedin.com/in/rohitsriv28/",
      isLeadership: false,
      order: 5,
    },
    {
      name: "Deepak Karn",
      role: "DevOps Engineer",
      initials: "DK",
      avatar: "",
      bio: "",
      linkedin: "https://www.linkedin.com/in/dipak-karn-b760202b7/",
      isLeadership: false,
      order: 6,
    },
    {
      name: "Prakash Kushwaha",
      role: "QA Engineer",
      initials: "PK",
      avatar: "",
      bio: "",
      linkedin: "https://www.linkedin.com/in/prakash-kushwaha-b97809325/",
      isLeadership: false,
      order: 7,
    },
    {
      name: "ChhupaRustam Kushwaha",
      role: "Business Analyst",
      initials: "CRK",
      avatar: "",
      bio: "",
      linkedin: "https://www.linkedin.com/in/chhuparustam-kushwaha/",
      isLeadership: false,
      order: 8,
    },
  ];

  for (const member of teamMembers) {
    await TeamMember.findOneAndUpdate(
      { name: member.name, isLeadership: member.isLeadership, order: member.order },
      member,
      { upsert: true, returnDocument: "after" }
    );
    const tag = member.isLeadership ? "👑 Leader" : "👤 Team";
    console.log(`  ✅ ${tag}: ${member.name} — ${member.role}`);
  }

  // ─── 5. Remote Culture ────────────────────────────────────────────────────
  console.log("\n🌍 Seeding about_culture...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "about_culture" },
    {
      data: {
        subtitle: "REMOTE CULTURE",
        title: "Remote-First. People-First.",
        description:
          "We believe great work happens when people feel trusted, supported, and empowered to do their best work—wherever they are.",
        perks: [
          { title: "Work From Anywhere", desc: "Flexibility across timezones", icon: "Globe" },
          { title: "Strong Collaboration", desc: "Connected & aligned", icon: "Users" },
          { title: "Flexible Hours", desc: "Focus on outcomes", icon: "Clock" },
          { title: "Wellness First", desc: "Mental health & balance", icon: "Heart" },
          { title: "Learning Culture", desc: "Continuous growth & skills", icon: "Zap" },
          { title: "Open Communication", desc: "Transparency & feedback", icon: "ShieldCheck" },
        ],
        buttonLabel: "Life at JitSeeTec",
      },
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log("  ✅ about_culture done.");

  console.log("\n🎉 About page seeding completed successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

seedAbout().catch((err) => {
  console.error("❌ Error seeding About database:", err);
  process.exit(1);
});
