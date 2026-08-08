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

async function seed() {
  console.log("🌱 Starting Master JitSeeTec Database Seeding...");
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

  // Import Schemas
  const User = mongoose.models.User || (await import("../models/User")).default;
  const TeamMember =
    mongoose.models.TeamMember ||
    (await import("../models/TeamMember")).default;
  const Stat = mongoose.models.Stat || (await import("../models/Stat")).default;
  const Testimonial =
    mongoose.models.Testimonial ||
    (await import("../models/Testimonial")).default;
  const Blog = mongoose.models.Blog || (await import("../models/Blog")).default;
  const CaseStudy =
    mongoose.models.CaseStudy || (await import("../models/CaseStudy")).default;
  const Project =
    mongoose.models.Project || (await import("../models/Project")).default;
  const SiteContent =
    mongoose.models.SiteContent ||
    (await import("../models/SiteContent")).default;

  const bcrypt = await import("bcryptjs");

  // ─── 1. Seed Admin User ───────────────────────────────────────────────────
  console.log("\n👤 Seeding Admin Account...");
  const adminEmail = (
    process.env.ADMIN_EMAIL || "admin@jitseetec.com"
  ).toLowerCase();
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    if (!process.env.ADMIN_PASSWORD) {
      console.error(
        "❌ Error: ADMIN_PASSWORD environment variable is required to create initial admin user.",
      );
      process.exit(1);
    }
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await User.create({
      name: "JitSeeTec Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      avatar: "/images/rohit_kumar_author.png",
    });
    console.log(`  ✅ Admin user created: ${adminEmail}`);
  } else {
    console.log(`  ℹ️  Admin user already exists: ${adminEmail}`);
  }

  // ─── 2. Seed Counter Statistics ──────────────────────────────────────────
  console.log("\n📊 Seeding Counter Statistics...");
  await Stat.deleteMany({});
  await Stat.insertMany([
    { label: "Projects Delivered", val: "14+", iconName: "Rocket", order: 1 },
    { label: "Client Satisfaction", val: "95%", iconName: "Smile", order: 2 },
    { label: "Years of Experience", val: "4+", iconName: "Calendar", order: 3 },
    { label: "Technologies", val: "10+", iconName: "Code2", order: 4 },
    { label: "Countries Served", val: "8", iconName: "Globe", order: 5 },
  ]);
  console.log("  ✅ Counter statistics seeded.");

  // ─── 3. Seed Team Members & Leadership ───────────────────────────────────
  console.log("\n👥 Seeding Team Members & Leadership...");
  const teamMembers = [
    {
      name: "Aayush Gupta",
      role: "Co-Founder & CEO",
      initials: "AG",
      avatar: "/images/leader_aayush.png",
      bio: "Visionary leader with a passion for building products and teams that create lasting impact. Aayush drives strategy, innovation, and client success at JitSeeTec.",
      linkedin: "https://www.linkedin.com/in/ayush-gupta-5ba1ba220/",
      order: 1,
      isLeadership: true,
    },
    {
      name: "Mandip Shah",
      role: "Co-Founder & CTO",
      initials: "MS",
      avatar: "/images/leader_mandip.png",
      bio: "Technology enthusiast and problem solver who leads our engineering team and ensures we deliver scalable, secure, and high-quality software solutions.",
      linkedin: "https://www.linkedin.com/in/mandip-kanu-589790168/",
      order: 2,
      isLeadership: true,
    },
    {
      name: "Rohit Srivastava",
      role: "UI/UX Designer & Frontend Developer",
      initials: "RS",
      avatar: "/images/rohit_kumar_author.png",
      bio: "Designing elegant digital user experiences and building performant web apps.",
      linkedin: "https://www.linkedin.com/in/rohitsriv28/",
      order: 3,
      isLeadership: false,
    },
    {
      name: "Deepak Karn",
      role: "DevOps Engineer",
      initials: "DK",
      avatar: "/images/rohit_kumar_author.png",
      bio: "Automating cloud infrastructure, serverless deployments, and CI/CD pipelines.",
      linkedin: "https://www.linkedin.com/in/dipak-karn-b760202b7/",
      order: 4,
      isLeadership: false,
    },
    {
      name: "Prakash Kushwaha",
      role: "QA Engineer",
      initials: "PK",
      avatar: "/images/rohit_kumar_author.png",
      bio: "Ensuring software quality, test automation, reliability, and security standards.",
      linkedin: "https://www.linkedin.com/in/prakash-kushwaha-b97809325/",
      order: 5,
      isLeadership: false,
    },
    {
      name: "ChhupaRustam Kushwaha",
      role: "Business Analyst",
      initials: "CRK",
      avatar: "/images/rohit_kumar_author.png",
      bio: "Analyzing client business processes, market trends, and technical specifications.",
      linkedin: "https://www.linkedin.com/in/chhuparustam-kushwaha/",
      order: 6,
      isLeadership: false,
    },
  ];

  for (const member of teamMembers) {
    await TeamMember.findOneAndUpdate(
      {
        name: member.name,
        isLeadership: member.isLeadership,
        order: member.order,
      },
      member,
      { upsert: true, returnDocument: "after" },
    );
  }
  console.log("  ✅ Team members and leadership roster seeded.");

  // ─── 4. Seed Portfolio Projects ──────────────────────────────────────────
  console.log("\n💼 Seeding Portfolio Projects...");
  const projects = [
    {
      title: "Finova Dashboard",
      category: "Web Development",
      industry: "Fintech",
      image: "/images/finova_dashboard.png",
      desc: "A comprehensive financial management platform for businesses with real-time analytics, budget tracking, and automated reporting.",
      tags: ["React", "Node.js", "MongoDB"],
      clientName: "Finova Inc",
      projectUrl: "https://finova.com",
      caseStudySlug: "finova-financial-dashboard",
      featured: true,
      order: 1,
    },
    {
      title: "MediFlow App",
      category: "Mobile Apps",
      industry: "Healthcare",
      image: "/images/mediflow_app.png",
      desc: "Telemedicine mobile app connecting doctors and patients seamlessly with appointments, video consultations, and e-prescriptions.",
      tags: ["Flutter", "Firebase", "Node.js"],
      clientName: "MediFlow Health",
      projectUrl: "https://mediflow.com",
      caseStudySlug: "swiftcare-telehealth-platform",
      featured: true,
      order: 2,
    },
    {
      title: "ShopHub Platform",
      category: "Web Development",
      industry: "E-commerce",
      image: "/images/shophub_platform.png",
      desc: "Feature-rich e-commerce platform with advanced search, recommendation engine, secure payments, and order management system.",
      tags: ["Next.js", "Tailwind CSS", "Stripe"],
      clientName: "ShopHub Global",
      projectUrl: "https://shophub.com",
      featured: true,
      order: 3,
    },
    {
      title: "UrbanNest Website",
      category: "UI/UX Design",
      industry: "Real Estate",
      image: "/images/urban_nest.png",
      desc: "Modern real estate platform for property search, virtual tours, and connecting buyers and sellers with real estate agents.",
      tags: ["Figma", "Laravel", "MySQL"],
      clientName: "UrbanNest",
      projectUrl: "https://urbannest.com",
      featured: false,
      order: 4,
    },
    {
      title: "EduSphere LMS",
      category: "Custom Software",
      industry: "Education",
      image: "/images/edusphere_lms.png",
      desc: "Learning management system with course management, live classes, assessment tools, and progress tracking for institutions.",
      tags: ["Python", "Django", "PostgreSQL"],
      clientName: "EduSphere",
      projectUrl: "https://edusphere.com",
      featured: false,
      order: 5,
    },
    {
      title: "TranspoTrack System",
      category: "Custom Software",
      industry: "Logistics",
      image: "/images/transpotrack.png",
      desc: "Seamless fleet and logistics management plan with real-time tracking, driver assignment, and maintenance management system.",
      tags: ["Angular", "AWS Cloud", "Node.js"],
      clientName: "TranspoTrack",
      projectUrl: "https://transpotrack.com",
      featured: false,
      order: 6,
    },
  ];

  for (const proj of projects) {
    await Project.findOneAndUpdate({ title: proj.title }, proj, {
      upsert: true,
      returnDocument: "after",
    });
  }
  console.log("  ✅ Portfolio projects seeded.");

  // ─── 5. Seed Testimonials ────────────────────────────────────────────────
  console.log("\n💬 Seeding Testimonials...");
  const testimonials = [
    {
      author: "Rohit Sharma",
      role: "CEO, Finova",
      company: "Finova",
      quote:
        "JitSeeTec delivered an exceptional product that exceeded our expectations. Their team was professional, responsive, and truly understood our vision.",
      avatar: "RS",
      rating: 5,
      order: 1,
      featured: true,
    },
    {
      author: "Priya Nair",
      role: "Product Manager, MediFlow",
      company: "MediFlow",
      quote:
        "The communication and project management were outstanding. We're impressed with their technical expertise and attention to detail.",
      avatar: "PN",
      rating: 5,
      order: 2,
      featured: true,
    },
    {
      author: "James Carter",
      role: "Founder, ShopHub",
      company: "ShopHub",
      quote:
        "Our e-commerce platform saw a 40% increase in conversions after launch. Great team, great results!",
      avatar: "JC",
      rating: 5,
      order: 3,
      featured: true,
    },
    {
      author: "Ananya Singh",
      role: "CTO, EduSphere",
      company: "EduSphere",
      quote:
        "Working with JitSeeTec was a seamless experience. They built a robust LMS that handles thousands of concurrent learners without a hitch.",
      avatar: "AS",
      rating: 5,
      order: 4,
      featured: true,
    },
    {
      author: "Lucas Fernandez",
      role: "Operations Head, TranspoTrack",
      company: "TranspoTrack",
      quote:
        "The fleet tracking system they built reduced our operational costs by 30%. Highly recommend their engineering team.",
      avatar: "LF",
      rating: 5,
      order: 5,
      featured: true,
    },
  ];

  for (const t of testimonials) {
    await Testimonial.findOneAndUpdate(
      { author: t.author, company: t.company },
      t,
      { upsert: true, returnDocument: "after" },
    );
  }
  console.log("  ✅ Client testimonials seeded.");

  // ─── 6. Seed Blogs ────────────────────────────────────────────────────────
  console.log("\n📝 Seeding Blog Articles...");
  const blogs = [
    {
      title: "Top 10 Web Development Trends in 2024",
      slug: "top-10-web-development-trends-2024",
      category: "Web Development",
      coverImage: "/images/finova_dashboard.png",
      excerpt:
        "Explore the latest trends shaping the future of web development.",
      content:
        "Web development continues to evolve rapidly. From AI-assisted coding to edge computing and WebAssembly, 2024 brings exciting changes. Teams must adopt modern frameworks, prioritize performance, and embrace new architectural patterns to stay competitive.",
      readTime: "6 min read",
      author: {
        name: "Rohit Srivastava",
        role: "UI/UX Designer & Frontend Developer",
        avatar: "/images/rohit_kumar_author.png",
        bio: "Designing elegant digital user experiences and building performant web apps.",
      },
      tags: ["Web Development", "React", "Next.js", "AI"],
      status: "published",
      publishedAt: new Date("2024-05-12"),
    },
    {
      title: "Why Cloud Migration is Essential for Modern Businesses",
      slug: "why-cloud-migration-essential-business",
      category: "Cloud",
      coverImage: "/images/services_hero_3d.png",
      excerpt:
        "Learn how cloud migration can improve agility, security, and reduce costs.",
      content:
        "Moving to the cloud is no longer optional. Businesses that migrate can reduce infrastructure costs by up to 40%, improve disaster recovery, and scale on demand. AWS, Azure, and GCP offer enterprise-grade tools that make migration smoother than ever.",
      readTime: "7 min read",
      author: {
        name: "Mandip Shah",
        role: "Co-Founder & CTO",
        avatar: "/images/leader_mandip.png",
        bio: "Technology enthusiast and problem solver.",
      },
      tags: ["Cloud", "AWS", "DevOps", "Security"],
      status: "published",
      publishedAt: new Date("2024-04-30"),
    },
    {
      title: "Cross-Platform vs. Native App Development",
      slug: "cross-platform-vs-native-app-development",
      category: "Mobile Development",
      coverImage: "/images/mediflow_app.png",
      excerpt:
        "A detailed comparison to help you choose the right approach for your app.",
      content:
        "Flutter and React Native have closed the gap with native iOS and Android apps. For most business use cases, cross-platform is the right choice — faster time to market, lower cost, and single codebase. Native remains best for performance-critical or platform-specific features.",
      readTime: "5 min read",
      author: {
        name: "Aayush Gupta",
        role: "Co-Founder & CEO",
        avatar: "/images/leader_aayush.png",
        bio: "Visionary leader driving strategy and innovation.",
      },
      tags: ["Mobile", "Flutter", "React Native", "iOS", "Android"],
      status: "published",
      publishedAt: new Date("2024-04-15"),
    },
    {
      title: "CI/CD Best Practices for Faster and More Reliable Deployments",
      slug: "cicd-best-practices-faster-reliable-deployments",
      category: "DevOps",
      coverImage: "/images/shophub_platform.png",
      excerpt:
        "Implement these DevOps practices to streamline your deployment pipeline.",
      content:
        "A strong CI/CD pipeline reduces deployment failures by 80%. Key practices include automated testing at every stage, feature flags for safe rollouts, containerization with Docker, infrastructure as code with Terraform, and monitoring with tools like Datadog or Grafana.",
      readTime: "4 min read",
      author: {
        name: "Deepak Karn",
        role: "DevOps Engineer",
        avatar: "/images/rohit_kumar_author.png",
        bio: "DevOps specialist automating cloud infrastructure.",
      },
      tags: ["DevOps", "CI/CD", "Docker", "Automation"],
      status: "published",
      publishedAt: new Date("2024-03-28"),
    },
  ];

  for (const blog of blogs) {
    await Blog.findOneAndUpdate({ slug: blog.slug }, blog, {
      upsert: true,
      returnDocument: "after",
    });
  }
  console.log("  ✅ Blog articles seeded.");

  // ─── 7. Seed Case Studies ─────────────────────────────────────────────────
  console.log("\n🏥 Seeding Case Studies...");
  const caseStudies = [
    {
      title: "Finova Financial Management Platform",
      slug: "finova-financial-dashboard",
      client: "Finova Inc.",
      industry: "Fintech",
      services: "Web Development, UI/UX Design",
      duration: "3 Months",
      year: "2024",
      coverImage: "/images/finova_dashboard.png",
      liveUrl: "https://finova.com",
      metrics: [
        { val: "60%", label: "Faster Financial Reporting" },
        { val: "99.9%", label: "System Uptime" },
        { val: "3x", label: "Increase in Daily Active Users" },
      ],
      challenge:
        "Finova needed a modern, real-time dashboard to replace legacy spreadsheets and provide actionable financial insights for enterprise clients.",
      objectives: [
        "Real-time data visualization",
        "Automated budget tracking and alerts",
        "Integrated reporting and export tools",
      ],
      researchText:
        "We conducted stakeholder interviews and competitive analysis across 5 leading fintech platforms to identify key UX and feature gaps.",
      strategyPoints: [
        "Agile 2-week sprints",
        "Design system first approach",
        "API-first architecture",
      ],
      designPoints: [
        "Dark mode financial dashboard",
        "Mobile-responsive layouts",
        "Data visualization with charts",
      ],
      devPoints: [
        "React + TypeScript frontend",
        "Node.js REST API backend",
        "MongoDB for flexible data models",
      ],
      keyFeatures: [
        "Real-time analytics",
        "Budget forecasting",
        "Automated PDF reports",
        "Multi-user roles",
      ],
      techStack: [
        { name: "React", iconKey: "FaReact" },
        { name: "Node.js", iconKey: "FaNodeJs" },
        { name: "MongoDB", iconKey: "SiMongodb" },
      ],
      timeline: [
        { step: "Discovery & UX", time: "Week 1–3" },
        { step: "UI Design & Prototypes", time: "Week 4–6" },
        { step: "Development & Integration", time: "Week 7–10" },
        { step: "Testing & Launch", time: "Week 11–12" },
      ],
      screenshots: [
        { title: "Finova Dashboard View", img: "/images/finova_dashboard.png" },
      ],
      beforeAfter: {
        beforeTitle: "Before (Manual Processes)",
        beforePoints: [
          "Excel-based reporting",
          "Manual data entry",
          "Delayed financial insights",
        ],
        afterTitle: "After (Finova Platform)",
        afterPoints: [
          "Real-time dashboards",
          "Automated reporting",
          "Instant financial insights",
        ],
      },
      resultsText:
        "Finova reduced manual reporting time by 60% and improved team productivity across finance operations.",
      testimonial: {
        quote:
          "JitSeeTec delivered an exceptional product that exceeded our expectations.",
        author: "Rohit Sharma",
        role: "CEO, Finova",
        avatar: "",
      },
      lessonsLearned: [
        "Early stakeholder alignment saves rework",
        "Performance budgets must be defined upfront",
      ],
      status: "published",
    },
    {
      title: "MediFlow Telemedicine App",
      slug: "swiftcare-telehealth-platform",
      client: "MediFlow Health",
      industry: "Healthcare",
      services: "Mobile Apps, Cloud",
      duration: "4 Months",
      year: "2024",
      coverImage: "/images/mediflow_app.png",
      liveUrl: "https://mediflow.com",
      metrics: [
        { val: "70%", label: "Increase in Online Bookings" },
        { val: "4.8★", label: "App Store Rating" },
        { val: "10k+", label: "Consultations Handled" },
      ],
      challenge:
        "MediFlow required a secure, HIPAA-compliant mobile app to connect doctors and patients for remote consultations during peak demand.",
      objectives: [
        "Secure video consultation engine",
        "Seamless appointment booking flow",
        "Integrated e-prescription system",
      ],
      researchText:
        "Patient journey mapping revealed 3 key friction points in existing telehealth solutions we resolved in our design.",
      strategyPoints: [
        "Security-first architecture",
        "Offline-first mobile design",
        "Iterative usability testing",
      ],
      designPoints: [
        "Calming healthcare color palette",
        "One-tap appointment booking",
        "Video call UI with minimal distractions",
      ],
      devPoints: [
        "Flutter cross-platform app",
        "Firebase real-time backend",
        "WebRTC for video calls",
      ],
      keyFeatures: [
        "Video consultations",
        "Appointment management",
        "E-prescriptions",
        "Medical history records",
      ],
      techStack: [
        { name: "Flutter", iconKey: "SiFlutter" },
        { name: "Firebase", iconKey: "SiFirebase" },
        { name: "Node.js", iconKey: "FaNodeJs" },
      ],
      timeline: [
        { step: "Discovery & Compliance", time: "Week 1–4" },
        { step: "Mobile UI/UX Design", time: "Week 5–8" },
        { step: "App Development & WebRTC", time: "Week 9–14" },
        { step: "QA, Security Audit & Launch", time: "Week 15–16" },
      ],
      screenshots: [
        { title: "MediFlow Mobile Interface", img: "/images/mediflow_app.png" },
      ],
      beforeAfter: {
        beforeTitle: "Before (Phone-only Booking)",
        beforePoints: [
          "Long hold times",
          "Paper prescriptions",
          "No appointment reminders",
        ],
        afterTitle: "After (MediFlow App)",
        afterPoints: [
          "Instant online booking",
          "Digital e-prescriptions",
          "Automated SMS reminders",
        ],
      },
      resultsText:
        "MediFlow achieved 70% increase in appointment bookings and 4.8★ rating within 3 months of launch.",
      testimonial: {
        quote: "The communication and project management were outstanding.",
        author: "Priya Nair",
        role: "Product Manager, MediFlow",
        avatar: "",
      },
      lessonsLearned: [
        "Healthcare compliance needs dedicated QA sprints",
        "Onboarding flow is critical for medical apps",
      ],
      status: "published",
    },
  ];

  for (const cs of caseStudies) {
    await CaseStudy.findOneAndUpdate({ slug: cs.slug }, cs, {
      upsert: true,
      returnDocument: "after",
    });
  }
  console.log("  ✅ Case studies seeded.");

  // ─── 8. Seed Page Content (SiteContent across all 6 pages) ───────────────
  console.log("\n🌐 Seeding All Page Content Sections (SiteContent)...");

  const siteSections = [
    // HOME PAGE
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
        title: "End-to-End Digital Solutions",
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

    // SERVICES PAGE
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
      sectionKey: "services_process",
      data: {
        subtitle: "OUR PROCESS",
        heading: "A Collaborative Process That Delivers Results",
        steps: [
          {
            stepNumber: 1,
            step: "01",
            title: "Discover",
            desc: "We understand your business, goals and challenges.",
          },
          {
            stepNumber: 2,
            step: "02",
            title: "Plan",
            desc: "We define the strategy, roadmap and technical approach.",
          },
          {
            stepNumber: 3,
            step: "03",
            title: "Design",
            desc: "We create intuitive designs that users love.",
          },
          {
            stepNumber: 4,
            step: "04",
            title: "Develop",
            desc: "We build robust, scalable and secure solutions.",
          },
          {
            stepNumber: 5,
            step: "05",
            title: "Deliver",
            desc: "We test, deploy and deliver great software on time.",
          },
          {
            stepNumber: 6,
            step: "06",
            title: "Support",
            desc: "We provide ongoing support and continuous improvement.",
          },
        ],
      },
    },

    // PORTFOLIO PAGE
    {
      sectionKey: "portfolio_hero",
      data: {
        title: "Our Work. Real Impact.",
        subtitle: "PORTFOLIO",
        description:
          "Explore a selection of digital products we've designed and developed for startups, SMEs, and enterprises across the globe.",
        heroImage: "/images/portfolio_hero_3d.png",
      },
    },
    {
      sectionKey: "portfolio_brands",
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
    {
      sectionKey: "portfolio_cta",
      data: {
        title: "Have a Similar Project in Mind?",
        description:
          "Let's turn your ideas into high-impact software products.",
        buttonLabel: "Start a Project",
      },
    },

    // ABOUT PAGE
    {
      sectionKey: "about_hero",
      data: {
        title: "Building Digital Solutions. Empowering Growth.",
        locationBadge: "ABOUT US",
        description:
          "JitSeeTec is a technology company that helps startups, SMEs, and enterprises turn ideas into powerful digital products. We combine modern technologies, agile processes, and a user-first mindset to deliver solutions that drive real business impact.",
        officeImage: "/images/about_office_hero_updated.png",
      },
    },
    {
      sectionKey: "about_mission_vision",
      data: {
        mission:
          "To build innovative, reliable, and scalable digital solutions that empower businesses to innovate faster and grow beyond limits.",
        vision:
          "To be a globally trusted technology partner recognized for engineering software that creates meaningful impact.",
        values: [
          "Client Success First",
          "Quality Without Compromise",
          "Integrity & Transparency",
          "Collaboration & Respect",
          "Innovation in Everything We Do",
          "Continuous Learning",
        ],
      },
    },
    {
      sectionKey: "about_milestones",
      data: {
        milestones: [
          {
            year: "2022",
            title: "Founded",
            desc: "Started with a vision to deliver top-notch software engineering.",
          },
          {
            year: "2023",
            title: "First Projects",
            desc: "Successfully delivered 5+ custom web & mobile apps.",
          },
          {
            year: "2024",
            title: "Team Growth",
            desc: "Expanded our team to 6+ core engineers and designers.",
          },
          {
            year: "2025",
            title: "Global Reach",
            desc: "Working with clients across different regions and industries.",
          },
          {
            year: "Future",
            title: "What's Next",
            desc: "Continuing to innovate, scale teams, and adopt cutting-edge tech.",
          },
        ],
      },
    },
    {
      sectionKey: "about_culture",
      data: {
        subtitle: "REMOTE-FIRST CULTURE",
        title: "Built for Flexibility, Focused on Impact",
        description:
          "We believe great work happens when people feel trusted, supported, and empowered to do their best work—wherever they are.",
        perks: [
          {
            title: "Work From Anywhere",
            desc: "Flexibility across timezones",
            icon: "Globe",
          },
          {
            title: "Strong Collaboration",
            desc: "Connected & aligned",
            icon: "Users",
          },
          { title: "Flexible Hours", desc: "Focus on outcomes", icon: "Clock" },
          {
            title: "Wellness First",
            desc: "Mental health & balance",
            icon: "Heart",
          },
          {
            title: "Learning Culture",
            desc: "Continuous growth & skills",
            icon: "Zap",
          },
          {
            title: "Open Communication",
            desc: "Transparency & feedback",
            icon: "ShieldCheck",
          },
        ],
        buttonLabel: "Life at JitSeeTec",
      },
    },
    {
      sectionKey: "about_cta",
      data: {
        title: "Ready to Build Something Great?",
        description:
          "Join hands with our expert team to bring your vision to life.",
        buttonLabel: "View Open Positions",
      },
    },

    // RESOURCES PAGE
    {
      sectionKey: "resources_hero",
      data: {
        title: "Insights, Knowledge & Tools to Help You Grow",
        subtitle: "RESOURCES & INSIGHTS",
        description:
          "Explore articles, engineering guides, case studies, and technical insights from our team.",
        heroImage: "/images/resources_hero_3d.png",
        popularTags: ["Next.js", "React", "Cloud", "UI/UX", "DevOps"],
      },
    },
    {
      sectionKey: "resources_faqs",
      data: {
        title: "Frequently Asked Questions",
        faqs: [
          {
            q: "How long does it take to get a response?",
            a: "We guarantee a response within 24 business hours. Our team reviews all incoming inquiries thoroughly.",
          },
          {
            q: "Do you work with startups?",
            a: "Yes! We specialize in MVP development and scaling early-stage startups.",
          },
          {
            q: "Can you sign an NDA?",
            a: "Absolutely. We sign Non-Disclosure Agreements prior to discussing project details.",
          },
          {
            q: "What is your typical project timeline?",
            a: "Timelines range from 3-6 weeks for simple web apps to 2-4 months for enterprise platforms.",
          },
          {
            q: "What if I'm not sure about my requirements?",
            a: "We offer discovery consultations to help define scope, architecture, and roadmaps.",
          },
        ],
      },
    },
    {
      sectionKey: "resources_tech_stack",
      data: {
        title: "Technologies We Master",
        description:
          "We use modern, battle-tested tools and frameworks to build performant products.",
        techList: [
          { name: "React", iconKey: "FaReact", color: "#61DAFB" },
          { name: "Next.js", iconKey: "SiNextdotjs", color: "#000000" },
          { name: "TypeScript", iconKey: "SiTypescript", color: "#3178C6" },
          { name: "Node.js", iconKey: "FaNodeJs", color: "#339933" },
          { name: "Python", iconKey: "FaPython", color: "#3776AB" },
          { name: "Flutter", iconKey: "SiFlutter", color: "#02569B" },
          { name: "AWS Cloud", iconKey: "FaAws", color: "#FF9900" },
          { name: "Docker", iconKey: "FaDocker", color: "#2496ED" },
          { name: "MongoDB", iconKey: "SiMongodb", color: "#47A248" },
          { name: "PostgreSQL", iconKey: "SiPostgresql", color: "#4169E1" },
        ],
      },
    },
    {
      sectionKey: "resources_cta",
      data: {
        title: "Have a Project in Mind?",
        description:
          "Let's discuss how we can turn your ideas into digital solutions.",
        buttonLabel: "Start a Project",
      },
    },

    // CONTACT PAGE
    {
      sectionKey: "contact_hero",
      data: {
        subtitle: "CONTACT US",
        title: "Let's Build Something Great Together",
        description:
          "Have a project in mind, a question about our services, or want to explore how we can work together? Reach out to us today.",
        heroImage: "/images/contact_hero_3d.png",
        trustBadges: [
          { label: "Quick Response", sub: "We reply within 24 hours" },
          { label: "Expert Consultation", sub: "Get the right solution" },
          { label: "100% Confidential", sub: "Your idea is safe with us" },
        ],
      },
    },
    {
      sectionKey: "contact_info",
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
    {
      sectionKey: "contact_offices",
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
    {
      sectionKey: "contact_faqs",
      data: {
        title: "Frequently Asked Questions",
        faqs: [
          {
            q: "How long does it take to get a response?",
            a: "We guarantee a response within 24 business hours.",
          },
          {
            q: "Do you work with startups?",
            a: "Yes! We specialize in helping early-stage startups build MVPs and scale fast.",
          },
          {
            q: "Can you sign an NDA?",
            a: "Absolutely. We are 100% committed to IP protection and sign NDAs upfront.",
          },
          {
            q: "What is your typical project timeline?",
            a: "Simple web apps take 3–6 weeks, while enterprise software takes 3–6 months.",
          },
          {
            q: "What if I'm not sure about my requirements?",
            a: "We conduct free discovery consultations to help define technical scope and roadmap.",
          },
        ],
      },
    },
    {
      sectionKey: "contact_cta",
      data: {
        title: "Ready to Start Your Project?",
        description: "Let's turn your ideas into powerful digital solutions.",
        buttonLabel: "Book a Free Consultation",
      },
    },
  ];

  for (const sec of siteSections) {
    await SiteContent.findOneAndUpdate(
      { sectionKey: sec.sectionKey },
      { data: sec.data },
      { upsert: true, returnDocument: "after" },
    );
  }
  console.log(
    `  ✅ All ${siteSections.length} SiteContent sections seeded across 6 pages.`,
  );

  console.log("\n🎉 Master JitSeeTec database seeding completed successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Error seeding database:", err);
  process.exit(1);
});
