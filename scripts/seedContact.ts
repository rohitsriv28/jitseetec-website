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
    /^mongodb:\/\/([^:]+):([^@]+)@(?:[^\.]+\.)+([^\/]+)\/([^?]+)/
  );
  if (match) {
    const [, user, pass, domain, dbName] = match;
    MONGODB_URI = `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${domain}/${dbName}?retryWrites=true&w=majority`;
  }
}

async function seedContact() {
  console.log("🌱 Starting JitSeeTec Contact Page Seeding...");
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

  // ─── 1. Contact Hero ──────────────────────────────────────────────────────
  console.log("\n📄 Seeding contact_hero...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "contact_hero" },
    {
      data: {
        subtitle: "CONTACT US",
        title: "Let's Build Something Great Together",
        description:
          "Have a project in mind, a question about our services, or want to explore how we can work together? Reach out to us today.",
        heroImage: "/images/contact_hero_3d.png",
        trustBadges: [
          {
            label: "Quick Response",
            sub: "We reply within 24 hours",
          },
          {
            label: "Expert Consultation",
            sub: "Get the right solution",
          },
          {
            label: "100% Confidential",
            sub: "Your idea is safe with us",
          },
        ],
      },
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log("  ✅ contact_hero done.");

  // ─── 2. Contact Info (Get in Touch + Map + Social) ────────────────────────
  console.log("\n📬 Seeding contact_info...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "contact_info" },
    {
      data: {
        location: "Imadol, Lalitpur, Bagmati Province, Nepal",
        phone: "+977 98111 95091",
        email: "hello@jitseetec.com",
        hours: "Sunday - Friday: 9:00 AM - 6:00 PM (Nepal Time)",
        googleMapsEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d563.7535892769768!2d85.34472344216444!3d27.66557656021389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19fb545a7a6b%3A0x75ff9b4afb2d999d!2sM88V%2B6W9%2C%2044600%2C%20Nepal!5e1!3m2!1sen!2sin!4v1785314987417!5m2!1sen!2sin",
        googleMapsDirectionsUrl: "https://maps.app.goo.gl/fa84PRvN3VryUcnh7",
        linkedinUrl: "https://www.linkedin.com/company/jitseetec",
        twitterUrl: "https://twitter.com/jitseetec",
        githubUrl: "https://github.com/jitseetec",
        instagramUrl: "https://instagram.com/jitseetec",
        facebookUrl: "https://facebook.com/jitseetec",
      },
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log("  ✅ contact_info done.");

  // ─── 3. Office Locations ──────────────────────────────────────────────────
  console.log("\n📍 Seeding contact_offices...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "contact_offices" },
    {
      data: {
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
      },
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log("  ✅ contact_offices done.");

  // ─── 4. Contact FAQs ──────────────────────────────────────────────────────
  console.log("\n❓ Seeding contact_faqs...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "contact_faqs" },
    {
      data: {
        title: "Frequently Asked Questions",
        faqs: [
          {
            q: "How long does it take to get a response?",
            a: "We guarantee a response within 24 business hours. Our team reviews every inquiry thoroughly to provide expert recommendations.",
          },
          {
            q: "Do you work with startups?",
            a: "Yes! We specialize in helping early-stage startups build MVPs, scale digital infrastructure, and launch fast.",
          },
          {
            q: "Can you sign an NDA?",
            a: "Absolutely. We are 100% committed to intellectual property protection and happy to sign a Non-Disclosure Agreement before discussing project details.",
          },
          {
            q: "What is your typical project timeline?",
            a: "Project timelines depend on scope. Simple web apps take 3–6 weeks, while comprehensive mobile or enterprise software takes 3–6 months.",
          },
          {
            q: "What if I'm not sure about my requirements?",
            a: "No problem at all! Our solution architects will conduct a free discovery consultation to help define your technical scope, architecture, and roadmap.",
          },
        ],
      },
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log("  ✅ contact_faqs done.");

  // ─── 5. Contact CTA ───────────────────────────────────────────────────────
  console.log("\n📣 Seeding contact_cta...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "contact_cta" },
    {
      data: {
        title: "Ready to Start Your Project?",
        description:
          "Let's turn your ideas into powerful digital solutions.",
        buttonLabel: "Book a Free Consultation",
      },
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log("  ✅ contact_cta done.");

  console.log("\n🎉 Contact page seeding completed successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

seedContact().catch((err) => {
  console.error("❌ Error seeding Contact database:", err);
  process.exit(1);
});
