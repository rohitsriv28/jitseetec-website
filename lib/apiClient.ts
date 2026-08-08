/**
 * Standard API Client for fetching dynamic content from Next.js serverless backend
 * with graceful fallback defaults for instant rendering.
 */

export interface BlogItem {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  excerpt: string;
  content: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    linkedin?: string;
    bio?: string;
  };
  tags: string[];
  status?: string;
  publishedAt?: string;
}

export interface CaseStudyItem {
  _id?: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  services: string;
  duration: string;
  year: string;
  coverImage: string;
  liveUrl?: string;
  metrics: { val: string; label: string }[];
  challenge: string;
  objectives: string[];
  researchText?: string;
  researchImage?: string;
  strategyPoints?: string[];
  designPoints?: string[];
  devPoints?: string[];
  keyFeatures?: string[];
  techStack?: { name: string; iconKey: string }[];
  timeline?: { step: string; time: string }[];
  screenshots?: { title: string; img: string }[];
  beforeAfter?: {
    beforeTitle?: string;
    beforePoints: string[];
    afterTitle?: string;
    afterPoints: string[];
  };
  resultsText?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
  lessonsLearned?: string[];
}

export interface ProjectItem {
  _id?: string;
  title: string;
  category:
    | "Web Development"
    | "Mobile Apps"
    | "UI/UX Design"
    | "Custom Software";
  industry: string;
  image: string;
  desc: string;
  tags: string[];
  clientName?: string;
  projectUrl?: string;
  caseStudySlug?: string;
  featured?: boolean;
}

export interface TeamMemberItem {
  _id?: string;
  name: string;
  role: string;
  initials: string;
  avatar?: string;
  bio?: string;
  linkedin: string;
  order?: number;
  isLeadership?: boolean;
}

export interface TestimonialItem {
  _id?: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  rating?: number;
}

export interface StatItem {
  _id?: string;
  label: string;
  val: string;
  iconName?: string;
}

// ----------------------------------------------------
// Default Fallback Data (Ensures zero blank screens)
// ----------------------------------------------------

export const DEFAULT_STATS: StatItem[] = [
  { label: "Projects Delivered", val: "14+", iconName: "Rocket" },
  { label: "Client Satisfaction", val: "95%", iconName: "Smile" },
  { label: "Years of Experience", val: "4+", iconName: "Calendar" },
  { label: "Technologies", val: "10+", iconName: "Code2" },
  { label: "Countries Served", val: "8", iconName: "Globe" },
];

export const DEFAULT_TEAM: TeamMemberItem[] = [
  {
    name: "Aayush Gupta",
    role: "Co-Founder & CEO",
    initials: "AG",
    avatar: "/images/leader_aayush.png",
    bio: "Visionary leader driving strategy, innovation, and client success.",
    linkedin: "https://www.linkedin.com/in/ayush-gupta-5ba1ba220/",
    isLeadership: true,
  },
  {
    name: "Mandip Shah",
    role: "Co-Founder & CTO",
    initials: "MS",
    avatar: "/images/leader_mandip.png",
    bio: "Technology strategist leading architecture and engineering excellence.",
    linkedin: "https://www.linkedin.com/in/mandip-kanu-589790168/",
    isLeadership: true,
  },
  {
    name: "Rohit Srivastava",
    role: "UI/UX Designer & Frontend Developer",
    initials: "RS",
    avatar: "/images/rohit_kumar_author.png",
    bio: "Designing elegant digital experiences and performant web apps.",
    linkedin: "https://www.linkedin.com/in/rohitsriv28/",
    isLeadership: false,
  },
  {
    name: "Deepak Karn",
    role: "DevOps Engineer",
    initials: "DK",
    bio: "Automating cloud infrastructure and CI/CD pipelines.",
    linkedin: "https://www.linkedin.com/in/dipak-karn-b760202b7/",
    isLeadership: false,
  },
];

export const DEFAULT_BLOGS: BlogItem[] = [
  {
    title: "Optimizing Performance in React Applications",
    slug: "optimizing-performance-in-react-applications",
    category: "Web Development",
    coverImage: "/images/blog_hero_laptop.png",
    excerpt:
      "Practical tips and techniques to make your React apps faster and more efficient.",
    content:
      "As React applications grow in complexity, performance becomes a critical factor...",
    readTime: "6 min read",
    author: {
      name: "Rohit Kumar",
      role: "Senior Developer",
      avatar: "/images/rohit_kumar_author.png",
    },
    tags: ["React", "Next.js", "Performance", "Frontend"],
    publishedAt: "2024-05-12",
  },
  {
    title: "Cloud-Native Architecture: Why It Matters",
    slug: "cloud-native-architecture-why-it-matters",
    category: "Web Development",
    coverImage: "/images/services_hero_3d.png",
    excerpt:
      "Explore how cloud-native principles enable scalable, resilient software systems.",
    content:
      "Modern software applications demand high availability and elastic scaling...",
    readTime: "7 min read",
    author: {
      name: "Deepak Karn",
      role: "DevOps Engineer",
      avatar: "/images/rohit_kumar_author.png",
    },
    tags: ["Cloud", "DevOps", "AWS", "Docker"],
    publishedAt: "2024-04-30",
  },
];

// ----------------------------------------------------
// API Client Functions
// ----------------------------------------------------

export async function fetchSectionContent<T = any>(
  sectionKey: string,
  fallback: T,
): Promise<T> {
  try {
    const res = await fetch(`/api/content/${sectionKey}`, {
      cache: "no-store",
    });
    if (!res.ok) return fallback;
    const json = await res.json();
    return json.data ? (json.data as T) : fallback;
  } catch (e) {
    return fallback;
  }
}

export async function fetchStats(): Promise<StatItem[]> {
  try {
    const res = await fetch("/api/stats", { cache: "no-store" });
    if (!res.ok) return DEFAULT_STATS;
    const json = await res.json();
    return json.data && json.data.length > 0 ? json.data : DEFAULT_STATS;
  } catch (e) {
    return DEFAULT_STATS;
  }
}

export async function fetchTeam(): Promise<TeamMemberItem[]> {
  try {
    const res = await fetch("/api/team", { cache: "no-store" });
    if (!res.ok) return DEFAULT_TEAM;
    const json = await res.json();
    return json.data && json.data.length > 0 ? json.data : DEFAULT_TEAM;
  } catch (e) {
    return DEFAULT_TEAM;
  }
}

export async function fetchBlogs(): Promise<BlogItem[]> {
  try {
    const res = await fetch("/api/blogs", { cache: "no-store" });
    if (!res.ok) return DEFAULT_BLOGS;
    const json = await res.json();
    return json.data && json.data.length > 0 ? json.data : DEFAULT_BLOGS;
  } catch (e) {
    return DEFAULT_BLOGS;
  }
}

export async function submitLead(formData: {
  fullName: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
}) {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res.json();
}
