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

// Convert direct shard connection strings to mongodb+srv:// if applicable
if (MONGODB_URI.includes("mongodb://") && MONGODB_URI.includes("mongodb.net")) {
  const match = MONGODB_URI.match(/^mongodb:\/\/([^:]+):([^@]+)@(?:[^\.]+\.)+([^\/]+)\/([^?]+)/);
  if (match) {
    const [, user, pass, domain, dbName] = match;
    MONGODB_URI = `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${domain}/${dbName}?retryWrites=true&w=majority`;
  }
}

async function seed() {
  console.log("🌱 Starting Comprehensive JitSeeTec Database Seeding...");
  console.log(`Connecting via Mongoose...`);

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
    mongoose.models.SiteContent || (await import("../models/SiteContent")).default;

  const bcrypt = await import("bcryptjs");

  // 1. Seed Admin User
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@jitseetec.com").toLowerCase();
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || "AdminSecurePassword123!",
      10,
    );
    await User.create({
      name: "JitSeeTec Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      avatar: "/images/rohit_kumar_author.png",
    });
    console.log(`👤 Admin user created successfully: ${adminEmail}`);
  } else {
    console.log(`👤 Admin user already exists in database: ${adminEmail}`);
  }

  // 2. Seed Counter Statistics
  await Stat.deleteMany({});
  await Stat.insertMany([
    { label: "Projects Delivered", val: "14+", iconName: "Rocket", order: 1 },
    { label: "Client Satisfaction", val: "95%", iconName: "Smile", order: 2 },
    { label: "Years of Experience", val: "4+", iconName: "Calendar", order: 3 },
    { label: "Technologies", val: "10+", iconName: "Code2", order: 4 },
    { label: "Countries Served", val: "8", iconName: "Globe", order: 5 },
  ]);
  console.log("📊 Counter statistics seeded.");

  // 3. Seed Team Members & Leadership Roster
  await TeamMember.deleteMany({});
  await TeamMember.insertMany([
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
  ]);
  console.log("👥 Team members and leaders seeded.");

  // 4. Seed Portfolio Projects
  await Project.deleteMany({});
  await Project.insertMany([
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
      category: "Cloud & DevOps",
      industry: "Logistics",
      image: "/images/transpotrack.png",
      desc: "Seamless fleet and logistics management plan with real-time tracking, driver assignment, and maintenance management system.",
      tags: ["Angular", "AWS Cloud", "Node.js"],
      clientName: "TranspoTrack",
      projectUrl: "https://transpotrack.com",
      featured: false,
      order: 6,
    },
  ]);
  console.log("💼 Portfolio projects seeded.");

  // 5. Seed Client Testimonials
  await Testimonial.deleteMany({});
  await Testimonial.insertMany([
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
  ]);
  console.log("💬 Client testimonials seeded.");

  // 6. Seed Blog Articles
  await Blog.deleteMany({});
  await Blog.insertMany([
    {
      title: "Optimizing Performance in React Applications",
      slug: "optimizing-performance-in-react-applications",
      category: "Web Development",
      coverImage: "/images/blog_hero_laptop.png",
      excerpt:
        "Practical tips and techniques to make your React apps faster, more efficient, and responsive for modern web users.",
      content: `
## Why React Performance Matters

In modern web development, page load speed and UI responsiveness directly impact user engagement, SEO rankings, and conversion rates. When React applications scale, unnecessary re-renders, bloated bundle sizes, and unoptimized assets can degrade performance.

### Key Strategies for React Optimization

1. **Component Memoization (\`useMemo\` & \`useCallback\`)**
   Prevent costly re-evaluations of heavy functions by caching calculated values across renders.

2. **Code Splitting & Dynamic Imports**
   Utilize Next.js dynamic imports (\`next/dynamic\`) to load heavy libraries only when required.

3. **Image & Media Optimization**
   Leverage modern WebP image formats, responsive \`srcset\`, and automated Cloudinary CDN transformations.

> "Fast web apps build user trust and double digital conversion rates." — Addy Osmani
      `,
      readTime: "6 min read",
      author: {
        name: "Rohit Kumar",
        role: "Senior Developer",
        avatar: "/images/rohit_kumar_author.png",
        bio: "Passionate full-stack developer and UI architect at JitSeeTec.",
      },
      tags: ["React", "Next.js", "Performance", "Frontend"],
      status: "published",
      publishedAt: new Date("2024-05-12"),
    },
    {
      title: "Cloud-Native Architecture: Why It Matters",
      slug: "cloud-native-architecture-why-it-matters",
      category: "Cloud & DevOps",
      coverImage: "/images/services_hero_3d.png",
      excerpt:
        "Explore how cloud-native principles enable scalable, resilient software systems in modern enterprise environments.",
      content: `
## Understanding Cloud-Native Architecture

Cloud-native architecture leverages microservices, containerization (Docker, Kubernetes), serverless functions, and automated CI/CD pipelines to build applications designed explicitly for cloud environments.

### Core Pillars of Cloud-Native Infrastructure

- **Microservices & Decoupled APIs**: Break monolithic applications into independent services.
- **Automated CI/CD**: Continuous delivery pipelines to deploy updates with zero downtime.
- **Serverless Scaling**: Elastic compute instances that scale dynamically based on traffic demands.
      `,
      readTime: "7 min read",
      author: {
        name: "Deepak Karn",
        role: "DevOps Engineer",
        avatar: "/images/rohit_kumar_author.png",
        bio: "DevOps specialist automating cloud infrastructure.",
      },
      tags: ["Cloud", "DevOps", "AWS", "Docker"],
      status: "published",
      publishedAt: new Date("2024-04-30"),
    },
  ]);
  console.log("📝 Blog articles seeded.");

  // 7. Seed Case Studies
  await CaseStudy.deleteMany({});
  await CaseStudy.insertMany([
    {
      title: "SwiftCare Telehealth Platform Transformation",
      slug: "swiftcare-telehealth-platform",
      client: "SwiftCare Health Pvt. Ltd.",
      industry: "Healthcare & Telemedicine",
      services: "Mobile App Development, UI/UX Design, Cloud Infrastructure",
      duration: "4 Months",
      year: "2024",
      coverImage: "/images/swiftcare_hero_mockup.png",
      liveUrl: "https://swiftcare.com",
      metrics: [
        { val: "65%", label: "Increase in Daily Patient Consultations" },
        { val: "40%", label: "Reduction in Patient Wait Times" },
        { val: "3.5x", label: "Faster Page & Video Load Speed" },
        { val: "98%", label: "Patient Satisfaction (CSAT) Score" },
      ],
      challenge:
        "SwiftCare needed to replace an inefficient legacy patient scheduling portal with a real-time, HIPAA-compliant mobile application that supports instant video consultations and digital prescription delivery.",
      objectives: [
        "Build seamless iOS & Android mobile apps for patients and doctors.",
        "Implement real-time HD video calling with encrypted health data transfer.",
        "Reduce patient booking drop-off rates and streamline clinical workflows.",
      ],
      researchText:
        "We conducted in-depth UX research sessions with 15 healthcare providers and 30 patients across Nepal to identify friction points in patient onboarding.",
      researchImage: "/images/research_discovery_team.png",
      keyFeatures: [
        "Instant Doctor Video Consultations",
        "Smart Appointment Scheduling",
        "Digital Medical Records & E-Prescriptions",
        "Automated Push Notifications & Payment Gateway Integration",
      ],
      techStack: [
        { name: "React Native", iconKey: "Mobile" },
        { name: "Next.js", iconKey: "Globe" },
        { name: "Node.js", iconKey: "Server" },
        { name: "AWS Cloud", iconKey: "Cloud" },
      ],
      timeline: [
        { step: "Discovery & UX Research", time: "Weeks 1-3" },
        { step: "UI Design & Prototyping", time: "Weeks 4-6" },
        { step: "Full-Stack Development", time: "Weeks 7-13" },
        { step: "QA & Cloud Launch", time: "Weeks 14-16" },
      ],
      resultsText:
        "The SwiftCare mobile platform launched successfully, handling over 10,000 monthly patient consultations with zero downtime and high clinical adoption.",
      testimonial: {
        quote:
          "JitSeeTec delivered a world-class telemedicine platform that completely revolutionized patient care for our clinics.",
        author: "Dr. Ananya Sharma",
        role: "CEO, SwiftCare Health",
        avatar: "/images/dr_ananya_sharma.png",
      },
      status: "published",
    },
  ]);
  console.log("🏥 Case studies seeded.");

  // 8. Seed Page Section Content Stores (Matching Original Frontend Content 100%)
  await SiteContent.deleteMany({});
  await SiteContent.insertMany([
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
        heading: "End-to-End Digital Solutions Built for the Future",
        subheading:
          "From ideation to deployment, we deliver tailored solutions that drive efficiency, growth and long-term success.",
        servicesList: [
          { title: "Web Development", desc: "We build fast, responsive and scalable web applications using modern technologies." },
          { title: "Mobile App Development", desc: "Native and cross-platform mobile apps that deliver seamless user experiences." },
          { title: "UI/UX Design", desc: "User-centered designs that are intuitive, engaging and aligned with your brand." },
          { title: "Cloud & DevOps", desc: "Scalable cloud solutions and DevOps practices to ensure reliability and performance." },
          { title: "Custom Software", desc: "Robust software solutions tailored to your unique business requirements." },
        ],
      },
    },
    {
      sectionKey: "home_why",
      data: {
        pillar1Title: "Client-Centric Approach",
        pillar1Desc: "We listen, collaborate and align our solutions with your business goals.",
        pillar2Title: "Transparent Process",
        pillar2Desc: "We follow clear communication and transparent processes at every step.",
        pillar3Title: "Agile & Scalable",
        pillar3Desc: "Our agile approach ensures flexibility, scalability and faster time-to-market.",
        pillar4Title: "Long-Term Partnership",
        pillar4Desc: "We build lasting relationships and support your growth beyond delivery.",
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
        heading: "A Collaborative Process That Delivers Results",
        steps: [
          { stepNumber: 1, title: "Discover", desc: "We understand your business, goals and challenges." },
          { stepNumber: 2, title: "Plan", desc: "We define the strategy, roadmap and technical approach." },
          { stepNumber: 3, title: "Design", desc: "We create intuitive designs that users love." },
          { stepNumber: 4, title: "Develop", desc: "We build robust, scalable and secure solutions." },
          { stepNumber: 5, title: "Deliver", desc: "We test, deploy and deliver great software on time." },
          { stepNumber: 6, title: "Support", desc: "We provide ongoing support and continuous improvement." },
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
          { year: "2022", title: "Founded", desc: "Started with a vision to deliver top-notch software engineering." },
          { year: "2023", title: "First Projects", desc: "Successfully delivered 5+ custom web & mobile apps." },
          { year: "2024", title: "Team Growth", desc: "Expanded our team to 6+ core engineers and designers." },
          { year: "2025", title: "Global Reach", desc: "Working with clients across different regions and industries." },
          { year: "Future", title: "What's Next", desc: "Continuing to innovate, scale teams, and adopt cutting-edge tech." },
        ],
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
      },
    },
    {
      sectionKey: "resources_faqs",
      data: {
        faqs: [
          {
            q: "How long does it take to get a response?",
            a: "We guarantee a response within 24 business hours. Our team reviews all incoming inquiries thoroughly to provide a clear and actionable response.",
          },
          {
            q: "Do you work with startups?",
            a: "Yes, we love working with startups! We help from MVP development to scaling products for long-term growth.",
          },
          {
            q: "Can you sign an NDA?",
            a: "Absolutely. We respect client confidentiality and sign NDAs prior to discussing any project details.",
          },
          {
            q: "What is your typical project timeline?",
            a: "Project timelines vary based on scope. Simple web apps take 3-6 weeks, while comprehensive platforms take 2-4 months.",
          },
          {
            q: "What if I'm not sure about my requirements?",
            a: "No problem! We offer discovery workshops to help clarify your vision, define feature priorities, and outline a technical roadmap.",
          },
        ],
      },
    },
    {
      sectionKey: "resources_tech_stack",
      data: {
        techList: ["AWS", "Python", "Docker", "TypeScript", "React", "Node.js", "Flutter", "PostgreSQL", "MongoDB", "Next.js"],
      },
    },

    // CONTACT PAGE
    {
      sectionKey: "contact_hero",
      data: {
        title: "Let's Build Something Great Together",
        subtitle: "CONTACT US",
        description:
          "Have a project in mind, a question about our services, or want to explore how we can work together? Reach out to us today.",
        heroImage: "/images/contact_hero_3d.png",
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
  ]);
  console.log("🌐 Complete section contents seeded across all 6 pages.");

  console.log("🎉 All JitSeeTec frontend data successfully restored & seeded into database!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Error seeding database:", err);
  process.exit(1);
});
