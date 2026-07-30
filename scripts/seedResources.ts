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

async function seedResources() {
  console.log("🌱 Starting JitSeeTec Resources Page Seeding...");
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
  const Blog =
    mongoose.models.Blog ||
    (await import("../models/Blog")).default;
  const CaseStudy =
    mongoose.models.CaseStudy ||
    (await import("../models/CaseStudy")).default;

  // ─── 1. Resources Hero ────────────────────────────────────────────────────
  console.log("\n📄 Seeding resources_hero...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "resources_hero" },
    {
      data: {
        subtitle: "RESOURCES & INSIGHTS",
        title: "Insights, Knowledge & Tools to Help You Grow",
        description:
          "Explore our blogs, case studies, FAQs, and tech stack to stay informed and empowered with the right information for your business.",
        heroImage: "/images/resources_hero_3d.png",
        popularTags: ["Next.js", "React", "Cloud", "UI/UX", "DevOps"],
      },
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log("  ✅ resources_hero done.");

  // ─── 2. FAQs ─────────────────────────────────────────────────────────────
  console.log("\n❓ Seeding resources_faqs...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "resources_faqs" },
    {
      data: {
        subtitle: "FREQUENTLY ASKED QUESTIONS",
        title: "Got Questions? We Have Answers.",
        faqs: [
          {
            q: "What is your typical project timeline?",
            a: "Timelines vary based on project complexity and requirements. A simple website might take 3–6 weeks, while a complex web or mobile application can take 3–6 months. We follow an agile approach and provide a detailed timeline after the discovery phase.",
          },
          {
            q: "How do you ensure project security?",
            a: "We adhere to strict industry-standard security protocols including end-to-end data encryption, OWASP guidelines, secure API authentication, regular automated security audits, and NDA compliance.",
          },
          {
            q: "What engagement models do you offer?",
            a: "We offer flexible engagement models tailored to your needs: Dedicated Engineering Teams, Time & Materials (T&M), and Fixed-Price Project Delivery.",
          },
          {
            q: "Do you provide post-launch support?",
            a: "Yes! We offer comprehensive post-launch support and maintenance SLAs, including bug fixes, security updates, server monitoring, and continuous feature enhancements.",
          },
          {
            q: "Can you work with our existing team?",
            a: "Absolutely. Our engineers and designers can seamlessly integrate as team extensions, adopting your tools, workflows, and communication channels.",
          },
        ],
      },
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log("  ✅ resources_faqs done.");

  // ─── 3. Tech Stack ────────────────────────────────────────────────────────
  console.log("\n⚙️  Seeding resources_tech_stack...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "resources_tech_stack" },
    {
      data: {
        subtitle: "TECHNOLOGY STACK",
        title: "Built with Industry-Leading Technologies",
        technologies: [
          { name: "React", iconKey: "FaReact", color: "#61DAFB" },
          { name: "Next.js", iconKey: "SiNextdotjs", color: "#000000" },
          { name: "Node.js", iconKey: "FaNodeJs", color: "#339933" },
          { name: "TypeScript", iconKey: "SiTypescript", color: "#3178C6" },
          { name: "Python", iconKey: "FaPython", color: "#3776AB" },
          { name: "AWS", iconKey: "FaAws", color: "#FF9900" },
          { name: "Docker", iconKey: "FaDocker", color: "#2496ED" },
          { name: "PostgreSQL", iconKey: "SiPostgresql", color: "#4169E1" },
          { name: "MongoDB", iconKey: "SiMongodb", color: "#47A248" },
          { name: "Tailwind CSS", iconKey: "SiTailwindcss", color: "#06B6D4" },
        ],
      },
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log("  ✅ resources_tech_stack done.");

  // ─── 4. Resources CTA ─────────────────────────────────────────────────────
  console.log("\n📣 Seeding resources_cta...");
  await SiteContent.findOneAndUpdate(
    { sectionKey: "resources_cta" },
    {
      data: {
        title: "Ready to Build Something Great?",
        description:
          "Let's turn your ideas into a digital product that drives real business results.",
        buttonLabel: "Start a Project",
      },
    },
    { upsert: true, returnDocument: "after" }
  );
  console.log("  ✅ resources_cta done.");

  // ─── 5. Blog Posts ────────────────────────────────────────────────────────
  console.log("\n📝 Seeding Blog Posts...");

  const blogs = [
    {
      title: "Top 10 Web Development Trends to Watch in 2024",
      slug: "top-10-web-development-trends-2024",
      category: "Web Development",
      coverImage: "/images/finova_dashboard.png",
      excerpt: "Explore the latest trends shaping the future of web development.",
      content: "Web development continues to evolve rapidly. From AI-assisted coding to edge computing and WebAssembly, 2024 brings exciting changes. Teams must adopt modern frameworks, prioritize performance, and embrace new architectural patterns to stay competitive.",
      readTime: "6 min read",
      author: {
        name: "Rohit Srivastava",
        role: "UI/UX Designer & Frontend Developer",
        avatar: "/images/rohit_kumar_author.png",
        linkedin: "https://www.linkedin.com/in/rohitsriv28/",
      },
      tags: ["React", "Next.js", "Web Development", "Trends"],
      status: "published",
      publishedAt: new Date("2024-05-15"),
    },
    {
      title: "Why Cloud Migration Is Essential for Your Business",
      slug: "why-cloud-migration-essential-business",
      category: "Cloud",
      coverImage: "/images/services_hero_3d.png",
      excerpt: "Learn how cloud migration can improve agility, security, and reduce costs.",
      content: "Moving to the cloud is no longer optional. Businesses that migrate can reduce infrastructure costs by up to 40%, improve disaster recovery, and scale on demand. AWS, Azure, and GCP offer enterprise-grade tools that make migration smoother than ever.",
      readTime: "7 min read",
      author: {
        name: "Mandip Shah",
        role: "Co-Founder & CTO",
        avatar: "/images/leader_mandip.png",
        linkedin: "https://www.linkedin.com/in/mandip-kanu-589790168/",
      },
      tags: ["Cloud", "AWS", "DevOps", "Infrastructure"],
      status: "published",
      publishedAt: new Date("2024-05-08"),
    },
    {
      title: "Cross-Platform vs Native App Development: Which to Choose?",
      slug: "cross-platform-vs-native-app-development",
      category: "Mobile Development",
      coverImage: "/images/mediflow_app.png",
      excerpt: "A detailed comparison to help you choose the right approach for your app.",
      content: "Flutter and React Native have closed the gap with native iOS and Android apps. For most business use cases, cross-platform is the right choice — faster time to market, lower cost, and single codebase. Native remains best for performance-critical or platform-specific features.",
      readTime: "5 min read",
      author: {
        name: "Aayush Gupta",
        role: "Co-Founder & CEO",
        avatar: "/images/leader_aayush.png",
        linkedin: "https://www.linkedin.com/in/ayush-gupta-5ba1ba220/",
      },
      tags: ["Flutter", "React Native", "Mobile", "iOS", "Android"],
      status: "published",
      publishedAt: new Date("2024-04-28"),
    },
    {
      title: "CI/CD Best Practices for Faster and Reliable Deployments",
      slug: "cicd-best-practices-faster-reliable-deployments",
      category: "DevOps",
      coverImage: "/images/shophub_platform.png",
      excerpt: "Implement these DevOps practices to streamline your deployment pipeline.",
      content: "A strong CI/CD pipeline reduces deployment failures by 80%. Key practices include automated testing at every stage, feature flags for safe rollouts, containerization with Docker, infrastructure as code with Terraform, and monitoring with tools like Datadog or Grafana.",
      readTime: "4 min read",
      author: {
        name: "Deepak Karn",
        role: "DevOps Engineer",
        avatar: "",
        linkedin: "https://www.linkedin.com/in/dipak-karn-b760202b7/",
      },
      tags: ["DevOps", "CI/CD", "Docker", "Deployment"],
      status: "published",
      publishedAt: new Date("2024-04-20"),
    },
  ];

  for (const blog of blogs) {
    await Blog.findOneAndUpdate(
      { slug: blog.slug },
      blog,
      { upsert: true, returnDocument: "after" }
    );
    console.log(`  ✅ Blog: ${blog.title}`);
  }

  // ─── 6. Case Studies ──────────────────────────────────────────────────────
  console.log("\n📋 Seeding Case Studies...");

  const caseStudies = [
    {
      title: "Finova Dashboard",
      slug: "finova",
      client: "Finova",
      industry: "Fintech",
      services: "Web Development, UI/UX Design",
      duration: "4 Months",
      year: "2024",
      coverImage: "/images/finova_dashboard.png",
      metrics: [
        { val: "40%", label: "Time Saved" },
        { val: "60%", label: "Faster Reporting" },
        { val: "100K+", label: "Users Impacted" },
      ],
      challenge:
        "Finova needed a comprehensive financial management platform to help businesses track, analyze, and optimize their finances in real-time with automated reporting.",
      objectives: [
        "Real-time financial analytics dashboard",
        "Automated budget tracking and alerts",
        "Integrated reporting and export tools",
      ],
      researchText: "We conducted stakeholder interviews and competitive analysis across 5 leading fintech platforms to identify key UX and feature gaps.",
      strategyPoints: ["Agile 2-week sprints", "Design system first approach", "API-first architecture"],
      designPoints: ["Dark mode financial dashboard", "Mobile-responsive layouts", "Data visualization with charts"],
      devPoints: ["React + TypeScript frontend", "Node.js REST API backend", "MongoDB for flexible data models"],
      keyFeatures: ["Real-time analytics", "Budget forecasting", "Automated PDF reports", "Multi-user roles"],
      techStack: [
        { name: "React", iconKey: "FaReact" },
        { name: "Node.js", iconKey: "FaNodeJs" },
        { name: "MongoDB", iconKey: "SiMongodb" },
      ],
      timeline: [
        { step: "Discovery", time: "Week 1–2" },
        { step: "Design", time: "Week 3–5" },
        { step: "Development", time: "Week 6–14" },
        { step: "QA & Launch", time: "Week 15–16" },
      ],
      screenshots: [
        { title: "Dashboard Overview", img: "/images/finova_dashboard.png" },
      ],
      beforeAfter: {
        beforeTitle: "Before (Manual Processes)",
        beforePoints: ["Excel-based reporting", "Manual data entry", "Delayed financial insights"],
        afterTitle: "After (Finova Platform)",
        afterPoints: ["Real-time dashboards", "Automated reporting", "Instant financial insights"],
      },
      resultsText: "Finova reduced manual reporting time by 60% and improved team productivity across finance operations.",
      testimonial: {
        quote: "JitSeeTec delivered an exceptional product that exceeded our expectations.",
        author: "Rohit Sharma",
        role: "CEO, Finova",
        avatar: "",
      },
      lessonsLearned: ["Early stakeholder alignment saves rework", "Performance budgets must be defined upfront"],
      status: "published",
    },
    {
      title: "MediFlow App",
      slug: "mediflow",
      client: "MediFlow",
      industry: "Healthcare",
      services: "Mobile App Development",
      duration: "5 Months",
      year: "2024",
      coverImage: "/images/mediflow_app.png",
      metrics: [
        { val: "70%", label: "Increase in Appointments" },
        { val: "4.8★", label: "User Rating" },
        { val: "50K+", label: "Downloads" },
      ],
      challenge:
        "MediFlow needed a telemedicine app connecting doctors and patients with secure video consultations, appointments, and e-prescriptions.",
      objectives: [
        "HIPAA-compliant telemedicine platform",
        "Seamless appointment booking flow",
        "Integrated e-prescription system",
      ],
      researchText: "Patient journey mapping revealed 3 key friction points in existing telehealth solutions we resolved in our design.",
      strategyPoints: ["Security-first architecture", "Offline-first mobile design", "Iterative usability testing"],
      designPoints: ["Calming healthcare color palette", "One-tap appointment booking", "Video call UI with minimal distractions"],
      devPoints: ["Flutter cross-platform app", "Firebase real-time backend", "WebRTC for video calls"],
      keyFeatures: ["Video consultations", "Appointment management", "E-prescriptions", "Medical history records"],
      techStack: [
        { name: "Flutter", iconKey: "SiFlutter" },
        { name: "Firebase", iconKey: "SiFirebase" },
        { name: "Node.js", iconKey: "FaNodeJs" },
      ],
      timeline: [
        { step: "Discovery", time: "Week 1–2" },
        { step: "Design", time: "Week 3–6" },
        { step: "Development", time: "Week 7–18" },
        { step: "QA & Launch", time: "Week 19–20" },
      ],
      screenshots: [
        { title: "Patient App Dashboard", img: "/images/mediflow_app.png" },
      ],
      beforeAfter: {
        beforeTitle: "Before (Phone-only Booking)",
        beforePoints: ["Long hold times", "Paper prescriptions", "No appointment reminders"],
        afterTitle: "After (MediFlow App)",
        afterPoints: ["Instant online booking", "Digital e-prescriptions", "Automated SMS reminders"],
      },
      resultsText: "MediFlow achieved 70% increase in appointment bookings and 4.8★ rating within 3 months of launch.",
      testimonial: {
        quote: "The communication and project management were outstanding.",
        author: "Priya Nair",
        role: "Product Manager, MediFlow",
        avatar: "",
      },
      lessonsLearned: ["Healthcare compliance needs dedicated QA sprints", "Onboarding flow is critical for medical apps"],
      status: "published",
    },
    {
      title: "ShopHub Platform",
      slug: "shophub",
      client: "ShopHub",
      industry: "E-commerce",
      services: "Web Development, UI/UX Design",
      duration: "6 Months",
      year: "2024",
      coverImage: "/images/shophub_platform.png",
      metrics: [
        { val: "35%", label: "More Conversions" },
        { val: "25%", label: "Higher AOV" },
        { val: "200K+", label: "Orders Processed" },
      ],
      challenge:
        "ShopHub needed a feature-rich e-commerce platform with AI recommendations, secure payments, and streamlined order management.",
      objectives: [
        "AI-powered product recommendations",
        "Multi-gateway secure payment processing",
        "Real-time inventory and order management",
      ],
      researchText: "Cart abandonment analysis showed 68% drop-off at checkout — we redesigned the entire checkout funnel.",
      strategyPoints: ["Conversion-focused design", "Performance optimization (Core Web Vitals)", "Headless commerce architecture"],
      designPoints: ["Clean product discovery UI", "One-page checkout", "Mobile-first shopping experience"],
      devPoints: ["Next.js for SSR/ISR", "Stripe + Razorpay integration", "Redis caching for performance"],
      keyFeatures: ["AI recommendation engine", "Multi-currency support", "Smart search", "Admin analytics dashboard"],
      techStack: [
        { name: "Next.js", iconKey: "SiNextdotjs" },
        { name: "Tailwind CSS", iconKey: "SiTailwindcss" },
        { name: "Stripe", iconKey: "SiStripe" },
      ],
      timeline: [
        { step: "Discovery", time: "Week 1–2" },
        { step: "Design", time: "Week 3–7" },
        { step: "Development", time: "Week 8–22" },
        { step: "QA & Launch", time: "Week 23–24" },
      ],
      screenshots: [
        { title: "Homepage & Product Listing", img: "/images/shophub_platform.png" },
      ],
      beforeAfter: {
        beforeTitle: "Before (Legacy Platform)",
        beforePoints: ["High cart abandonment", "No personalization", "Slow page loads"],
        afterTitle: "After (ShopHub)",
        afterPoints: ["Streamlined checkout", "AI-personalized feeds", "Sub-2s load times"],
      },
      resultsText: "ShopHub saw 35% increase in conversions and 25% higher average order value within 60 days of launch.",
      testimonial: {
        quote: "Our e-commerce platform saw a 40% increase in conversions after launch. Great team, great results!",
        author: "James Carter",
        role: "Founder, ShopHub",
        avatar: "",
      },
      lessonsLearned: ["Payment UX is as important as payment security", "A/B testing checkout flow doubled conversions"],
      status: "published",
    },
  ];

  for (const cs of caseStudies) {
    await CaseStudy.findOneAndUpdate(
      { slug: cs.slug },
      cs,
      { upsert: true, returnDocument: "after" }
    );
    console.log(`  ✅ Case Study: ${cs.title}`);
  }

  console.log("\n🎉 Resources page seeding completed successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

seedResources().catch((err) => {
  console.error("❌ Error seeding Resources database:", err);
  process.exit(1);
});
