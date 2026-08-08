"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  LogOut,
  FileText,
  Briefcase,
  Users,
  MessageSquare,
  BarChart3,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Loader2,
  Globe,
  Heart,
  Mail,
  Shield,
  Upload,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Save,
  Home,
  Info,
  Layers,
  PhoneCall,
  Sparkles,
  X,
  Award,
  HelpCircle,
  Code,
  BookOpen,
  Eye,
  EyeOff,
  ExternalLink,
  Zap,
} from "lucide-react";
import { notifyCmsUpdate } from "@/lib/cmsBus";

export default function JitSeeTecAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Sidebar Tab Navigation
  const [activeTab, setActiveTab] = useState<string>("home_hero");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    home: true,
    services: true,
    portfolio: true,
    about: true,
    resources: true,
    contact: true,
    modules: true,
    settings: true,
  });

  // Password Update State
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const [updatingPass, setUpdatingPass] = useState(false);

  // Admin Profile State
  const [adminUser, setAdminUser] = useState<any>(null);
  const [adminNameInput, setAdminNameInput] = useState("JitSeeTec Admin");
  const [adminEmailInput, setAdminEmailInput] = useState("admin@jitseetec.com");
  const [adminAvatarInput, setAdminAvatarInput] = useState("/images/rohit_kumar_author.png");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  // Section Content Engine State
  const [sectionData, setSectionData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Dynamic Collections State
  const [blogs, setBlogs] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // MODAL STATES
  const [activeModal, setActiveModal] = useState<
    "blog" | "casestudy" | "project" | "team" | "testimonial" | "stat" | null
  >(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  // FORM INPUT STATES FOR MODALS
  const [blogForm, setBlogForm] = useState({
    title: "",
    category: "Web Development",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "/images/blog_hero_laptop.png",
    tags: "React, Next.js, Performance",
    status: "published",
    readTime: "6 min read",
  });

  const [caseStudyForm, setCaseStudyForm] = useState({
    title: "",
    slug: "",
    client: "",
    industry: "Healthcare & Telemedicine",
    services: "Mobile App Development, UI/UX Design",
    duration: "4 Months",
    year: "2024",
    coverImage: "/images/swiftcare_hero_mockup.png",
    liveUrl: "https://swiftcare.com",
    challenge: "",
    objectives: "Build iOS/Android app, Real-time video consultation",
    keyFeatures: "Instant Video Call, Smart Scheduling, E-Prescriptions",
    resultsText: "Launched with over 10,000 monthly patient consultations.",
    status: "published",
  });

  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "Web Development",
    industry: "FinTech",
    image: "/images/finova_dashboard.png",
    desc: "",
    tags: "Next.js, TypeScript, Chart.js",
    clientName: "",
    projectUrl: "",
    caseStudySlug: "",
    featured: true,
  });

  const [teamForm, setTeamForm] = useState({
    name: "",
    role: "Senior Software Engineer",
    initials: "JS",
    avatar: "/images/rohit_kumar_author.png",
    bio: "",
    linkedin: "https://linkedin.com/in/",
    isLeadership: false,
    order: 1,
  });

  const [testimonialForm, setTestimonialForm] = useState({
    author: "",
    role: "CEO",
    company: "",
    quote: "",
    avatar: "/images/dr_ananya_sharma.png",
    rating: 5,
    featured: true,
  });

  const [statForm, setStatForm] = useState({
    label: "Projects Delivered",
    val: "15+",
    iconName: "Rocket",
    order: 1,
  });

  // Check auth session on load
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (
        activeTab.startsWith("home_") ||
        activeTab.startsWith("services_") ||
        activeTab.startsWith("portfolio_") ||
        activeTab.startsWith("about_") ||
        activeTab.startsWith("resources_") ||
        activeTab.startsWith("contact_")
      ) {
        loadSectionData(activeTab);
      } else {
        loadAllCollections();
      }
    }
  }, [isAuthenticated, activeTab]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const json = await res.json();
        setIsAuthenticated(true);
        if (json.data?.user) {
          setAdminUser(json.data.user);
          setAdminNameInput(json.data.user.name || "JitSeeTec Admin");
          setAdminEmailInput(json.data.user.email || "admin@jitseetec.com");
          setAdminAvatarInput(json.data.user.avatar || "/images/rohit_kumar_author.png");
        }
        loadAllCollections();
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        if (data.data?.user) {
          setAdminUser(data.data.user);
          setAdminNameInput(data.data.user.name || "JitSeeTec Admin");
          setAdminEmailInput(data.data.user.email || "admin@jitseetec.com");
          setAdminAvatarInput(data.data.user.avatar || "/images/rohit_kumar_author.png");
        }
        loadAllCollections();
      } else {
        setLoginError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setLoginError("Connection failed. Please check your server connection.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess("");
    setUpdatingProfile(true);

    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: adminNameInput,
          email: adminEmailInput,
          avatar: adminAvatarInput,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProfileSuccess("Admin profile, email & avatar updated successfully!");
        if (data.data?.user) {
          setAdminUser(data.data.user);
        }
        setTimeout(() => setProfileSuccess(""), 4000);
      } else {
        setProfileError(data.error || "Failed to update profile.");
      }
    } catch (err) {
      setProfileError("Network error while updating profile.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      // ignore
    }
    setIsAuthenticated(false);
  };

  const loadAllCollections = async () => {
    try {
      const [resBlogs, resCases, resProjs, resTeam, resLeads, resStats, resTestimonials] =
        await Promise.all([
          fetch("/api/blogs?status=all"),
          fetch("/api/case-studies?status=all"),
          fetch("/api/projects"),
          fetch("/api/team"),
          fetch("/api/leads"),
          fetch("/api/stats"),
          fetch("/api/testimonials"),
        ]);

      if (resBlogs.ok) setBlogs((await resBlogs.json()).data || []);
      if (resCases.ok) setCaseStudies((await resCases.json()).data || []);
      if (resProjs.ok) setProjects((await resProjs.json()).data || []);
      if (resTeam.ok) setTeam((await resTeam.json()).data || []);
      if (resLeads.ok) setLeads((await resLeads.json()).data || []);
      if (resStats.ok) setStats((await resStats.json()).data || []);
      if (resTestimonials.ok) setTestimonials((await resTestimonials.json()).data || []);
    } catch (e) {
      console.error("Error loading collections:", e);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess("");

    if (newPasswordInput !== confirmPasswordInput) {
      setPassError("New passwords do not match.");
      return;
    }

    if (newPasswordInput.length < 6) {
      setPassError("New password must be at least 6 characters long.");
      return;
    }

    setUpdatingPass(true);

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: currentPasswordInput,
          newPassword: newPasswordInput,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPassSuccess("Password updated successfully!");
        setCurrentPasswordInput("");
        setNewPasswordInput("");
        setConfirmPasswordInput("");
        setTimeout(() => setPassSuccess(""), 4000);
      } else {
        setPassError(data.error || "Failed to update password.");
      }
    } catch (err) {
      setPassError("Network error while updating password.");
    } finally {
      setUpdatingPass(false);
    }
  };

  const loadSectionData = async (key: string) => {
    try {
      const res = await fetch(`/api/content/${key}`);
      if (res.ok) {
        const json = await res.json();
        setSectionData(json.data || {});
      }
    } catch (e) {
      console.error("Error loading section:", e);
    }
  };

  const handleSaveSection = async () => {
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/content/${activeTab}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionData),
      });

      if (res.ok) {
        setSaveSuccess(true);
        notifyCmsUpdate(activeTab);
        setTimeout(() => setSaveSuccess(false), 3500);
      }
    } catch (e) {
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUrlReceived: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.data?.url) {
        onUrlReceived(json.data.url);
      } else {
        alert(json.error || "Image upload failed");
      }
    } catch (err) {
      alert("Error uploading image to Cloudinary");
    } finally {
      setUploadingImage(false);
    }
  };

  // -----------------------------------------------------------
  // CRUD MODAL HANDLERS
  // -----------------------------------------------------------
  const openNewBlogModal = () => {
    setEditingItem(null);
    setBlogForm({
      title: "",
      category: "Web Development",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "/images/blog_hero_laptop.png",
      tags: "React, Next.js, Performance",
      status: "published",
      readTime: "6 min read",
    });
    setActiveModal("blog");
  };

  const openEditBlogModal = (item: any) => {
    setEditingItem(item);
    setBlogForm({
      title: item.title,
      category: item.category || "Web Development",
      slug: item.slug || "",
      excerpt: item.excerpt || "",
      content: item.content || "",
      coverImage: item.coverImage || "/images/blog_hero_laptop.png",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
      status: item.status || "published",
      readTime: item.readTime || "6 min read",
    });
    setActiveModal("blog");
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...blogForm,
      tags: blogForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      const url = editingItem ? `/api/blogs/${editingItem._id}` : "/api/blogs";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setActiveModal(null);
        loadAllCollections();
        notifyCmsUpdate("blogs");
      } else {
        const json = await res.json();
        alert(json.error || "Failed to save blog post");
      }
    } catch (e) {
      alert("Network error while saving blog");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadAllCollections();
        notifyCmsUpdate("blogs");
      }
    } catch (e) {
      alert("Failed to delete blog post.");
    }
  };

  // Case Study CRUD
  const openNewCaseStudyModal = () => {
    setEditingItem(null);
    setCaseStudyForm({
      title: "",
      slug: "",
      client: "",
      industry: "Healthcare & Telemedicine",
      services: "Mobile App Development, UI/UX Design",
      duration: "4 Months",
      year: "2024",
      coverImage: "/images/swiftcare_hero_mockup.png",
      liveUrl: "https://swiftcare.com",
      challenge: "",
      objectives: "Build iOS/Android app, Real-time video consultation",
      keyFeatures: "Instant Video Call, Smart Scheduling, E-Prescriptions",
      resultsText: "Launched with over 10,000 monthly patient consultations.",
      status: "published",
    });
    setActiveModal("casestudy");
  };

  const openEditCaseStudyModal = (item: any) => {
    setEditingItem(item);
    setCaseStudyForm({
      title: item.title,
      slug: item.slug || "",
      client: item.client || "",
      industry: item.industry || "Healthcare & Telemedicine",
      services: item.services || "",
      duration: item.duration || "4 Months",
      year: item.year || "2024",
      coverImage: item.coverImage || "/images/swiftcare_hero_mockup.png",
      liveUrl: item.liveUrl || "",
      challenge: item.challenge || "",
      objectives: Array.isArray(item.objectives) ? item.objectives.join(", ") : "",
      keyFeatures: Array.isArray(item.keyFeatures) ? item.keyFeatures.join(", ") : "",
      resultsText: item.resultsText || "",
      status: item.status || "published",
    });
    setActiveModal("casestudy");
  };

  const handleSaveCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...caseStudyForm,
      objectives: caseStudyForm.objectives.split(",").map((o) => o.trim()).filter(Boolean),
      keyFeatures: caseStudyForm.keyFeatures.split(",").map((f) => f.trim()).filter(Boolean),
      metrics: [
        { val: "65%", label: "Consultation Increase" },
        { val: "98%", label: "CSAT Score" },
      ],
    };

    try {
      const url = editingItem ? `/api/case-studies/${editingItem._id}` : "/api/case-studies";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setActiveModal(null);
        loadAllCollections();
        notifyCmsUpdate("case-studies");
      } else {
        const json = await res.json();
        alert(json.error || "Failed to save case study");
      }
    } catch (e) {
      alert("Network error while saving case study");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCaseStudy = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    try {
      const res = await fetch(`/api/case-studies/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadAllCollections();
        notifyCmsUpdate("case-studies");
      }
    } catch (e) {
      alert("Failed to delete case study.");
    }
  };

  // Project CRUD
  const openNewProjectModal = () => {
    setEditingItem(null);
    setProjectForm({
      title: "",
      category: "Web Development",
      industry: "FinTech",
      image: "/images/finova_dashboard.png",
      desc: "",
      tags: "Next.js, TypeScript, Chart.js",
      clientName: "",
      projectUrl: "",
      caseStudySlug: "",
      featured: true,
    });
    setActiveModal("project");
  };

  const openEditProjectModal = (item: any) => {
    setEditingItem(item);
    setProjectForm({
      title: item.title,
      category: item.category || "Web Development",
      industry: item.industry || "FinTech",
      image: item.image || "/images/finova_dashboard.png",
      desc: item.desc || "",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
      clientName: item.clientName || "",
      projectUrl: item.projectUrl || "",
      caseStudySlug: item.caseStudySlug || "",
      featured: item.featured ?? true,
    });
    setActiveModal("project");
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...projectForm,
      tags: projectForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      const url = editingItem ? `/api/projects/${editingItem._id}` : "/api/projects";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setActiveModal(null);
        loadAllCollections();
        notifyCmsUpdate("projects");
      } else {
        const json = await res.json();
        alert(json.error || "Failed to save project");
      }
    } catch (e) {
      alert("Error saving project");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadAllCollections();
        notifyCmsUpdate("projects");
      }
    } catch (e) {
      alert("Failed to delete project.");
    }
  };

  // Team Member CRUD
  const openNewTeamModal = () => {
    setEditingItem(null);
    setTeamForm({
      name: "",
      role: "Senior Engineer",
      initials: "SE",
      avatar: "/images/rohit_kumar_author.png",
      bio: "",
      linkedin: "https://linkedin.com/in/",
      isLeadership: false,
      order: team.length + 1,
    });
    setActiveModal("team");
  };

  const openEditTeamModal = (item: any) => {
    setEditingItem(item);
    setTeamForm({
      name: item.name,
      role: item.role || "",
      initials: item.initials || "SE",
      avatar: item.avatar || "/images/rohit_kumar_author.png",
      bio: item.bio || "",
      linkedin: item.linkedin || "https://linkedin.com/in/",
      isLeadership: item.isLeadership ?? false,
      order: item.order || 1,
    });
    setActiveModal("team");
  };

  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingItem ? `/api/team/${editingItem._id}` : "/api/team";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teamForm),
      });

      if (res.ok) {
        setActiveModal(null);
        loadAllCollections();
        notifyCmsUpdate("team");
      } else {
        const json = await res.json();
        alert(json.error || "Failed to save team member");
      }
    } catch (e) {
      alert("Error saving team member");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTeam = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadAllCollections();
        notifyCmsUpdate("team");
      }
    } catch (e) {
      alert("Failed to delete team member.");
    }
  };

  // Testimonials CRUD
  const openNewTestimonialModal = () => {
    setEditingItem(null);
    setTestimonialForm({
      author: "",
      role: "CEO",
      company: "",
      quote: "",
      avatar: "RS",
      rating: 5,
      featured: true,
    });
    setActiveModal("testimonial");
  };

  const openEditTestimonialModal = (item: any) => {
    setEditingItem(item);
    setTestimonialForm({
      author: item.author,
      role: item.role || "CEO",
      company: item.company || "",
      quote: item.quote || "",
      avatar: item.avatar || "RS",
      rating: item.rating || 5,
      featured: item.featured ?? true,
    });
    setActiveModal("testimonial");
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingItem ? `/api/testimonials/${editingItem._id}` : "/api/testimonials";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialForm),
      });

      if (res.ok) {
        setActiveModal(null);
        loadAllCollections();
        notifyCmsUpdate("testimonials");
      } else {
        const json = await res.json();
        alert(json.error || "Failed to save testimonial");
      }
    } catch (e) {
      alert("Error saving testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadAllCollections();
        notifyCmsUpdate("testimonials");
      }
    } catch (e) {
      alert("Failed to delete testimonial.");
    }
  };

  // Stats CRUD
  const openNewStatModal = () => {
    setEditingItem(null);
    setStatForm({
      label: "Projects Delivered",
      val: "15+",
      iconName: "Rocket",
      order: stats.length + 1,
    });
    setActiveModal("stat");
  };

  const openEditStatModal = (item: any) => {
    setEditingItem(item);
    setStatForm({
      label: item.label,
      val: item.val || "0",
      iconName: item.iconName || "Rocket",
      order: item.order || 1,
    });
    setActiveModal("stat");
  };

  const handleSaveStat = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingItem ? `/api/stats/${editingItem._id}` : "/api/stats";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(statForm),
      });

      if (res.ok) {
        setActiveModal(null);
        loadAllCollections();
        notifyCmsUpdate("stats");
      } else {
        const json = await res.json();
        alert(json.error || "Failed to save stat metric");
      }
    } catch (e) {
      alert("Error saving stat metric");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStat = async (id: string) => {
    if (!confirm("Are you sure you want to delete this stat metric?")) return;
    try {
      const res = await fetch(`/api/stats/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadAllCollections();
        notifyCmsUpdate("stats");
      }
    } catch (e) {
      alert("Failed to delete stat metric.");
    }
  };

  // -----------------------------------------------------------
  // RENDER LOADING SCREEN
  // -----------------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-[#070E17] flex flex-col items-center justify-center text-white">
        <div className="relative flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-[#0E7C86]/30 border-t-[#2CCFD3] animate-spin" />
          <Image
            src="/logo/logo.png"
            alt="JitSeeTec Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain absolute"
            priority
          />
        </div>
        <p className="text-sm font-semibold tracking-wider text-slate-300 animate-pulse">
          Authenticating JitSeeTec Admin...
        </p>
      </div>
    );
  }

  // -----------------------------------------------------------
  // RENDER LOGIN SCREEN (IF NOT AUTHENTICATED)
  // -----------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B1623] bg-grid-pattern flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Glowing Background Auras */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0E7C86]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Logo Brand Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <Image
                src="/logo/logo.png"
                alt="JitSeeTec Logo"
                width={54}
                height={54}
                className="w-14 h-14 object-contain group-hover:scale-105 transition-transform"
                priority
              />
              <span className="text-3xl font-extrabold font-heading tracking-tight text-white">
                JitSeeTec<span className="text-[#2CCFD3]">.</span>
              </span>
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E7C86]/15 border border-[#0E7C86]/40 text-[#2CCFD3] text-xs font-semibold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>CMS Admin Authentication</span>
            </div>
            <p className="text-slate-400 text-xs mt-2">
              Enter credentials to access dynamic website control panel
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-[#0D1B2A]/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-8 shadow-[0_0_50px_rgba(14,124,134,0.2)] relative">
            {loginError && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@jitseetec.com"
                    className="w-full pl-11 pr-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#2CCFD3] focus:ring-1 focus:ring-[#2CCFD3] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
                  Security Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-11 pr-11 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#2CCFD3] focus:ring-1 focus:ring-[#2CCFD3] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#0E7C86]/30 flex items-center justify-center gap-2"
              >
                {loggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <Link
                href="/"
                className="text-xs text-slate-400 hover:text-[#2CCFD3] transition-colors inline-flex items-center gap-1.5 font-medium"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Return to Live Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------
  // MAIN ADMIN DASHBOARD UI
  // -----------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#070E17] text-white flex flex-col font-sans">
      {/* TOP HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#070E17]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo/logo.png"
              alt="JitSeeTec Logo"
              width={42}
              height={42}
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
              priority
            />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold font-heading tracking-tight text-white flex items-center gap-1.5">
                JitSeeTec<span className="text-[#2CCFD3]">.</span>
                <span className="px-2 py-0.5 rounded-full bg-[#0E7C86]/20 border border-[#0E7C86]/40 text-[#2CCFD3] text-[10px] font-mono uppercase tracking-wider font-semibold">
                  CMS Engine
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Live Content Control Center
              </span>
            </div>
          </Link>
        </div>

        {/* Header Right Quick Action Badges */}
        <div className="flex items-center gap-3">
          {/* Live Sync Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0E7C86]/10 border border-[#0E7C86]/30 text-[#2CCFD3] text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2CCFD3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2CCFD3]"></span>
            </span>
            <span>Real-Time Sync Active</span>
          </div>

          {/* Refresh Data Button */}
          <button
            onClick={loadAllCollections}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl border border-slate-700/80 flex items-center gap-2 transition-all"
            title="Refresh database records"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#2CCFD3]" />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>

          {/* Live Website Button */}
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-1.5 bg-[#0E7C86]/20 hover:bg-[#0E7C86]/30 text-[#2CCFD3] text-xs font-bold rounded-xl border border-[#0E7C86]/40 flex items-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Website</span>
          </Link>

          {/* User Sign Out */}
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold rounded-xl border border-rose-500/30 flex items-center gap-1.5 transition-all"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* DASHBOARD BODY LAYOUT */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* SIDEBAR NAVIGATION TABS */}
        <aside className="w-full md:w-64 lg:w-72 bg-[#0B1623] border-r border-slate-800/80 p-4 space-y-6 shrink-0 overflow-y-auto max-h-[calc(100vh-60px)]">
          {/* SECTION TABS GROUP: HOME */}
          <div>
            <button
              onClick={() => toggleGroup("home")}
              className="w-full flex items-center justify-between text-xs font-bold font-mono uppercase text-slate-400 tracking-wider mb-2 px-2 py-1 hover:text-white"
            >
              <div className="flex items-center gap-2 text-[#2CCFD3]">
                <Home className="w-3.5 h-3.5" />
                <span>HOME</span>
              </div>
              {expandedGroups.home ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            {expandedGroups.home && (
              <div className="space-y-1">
                {[
                  { key: "home_hero", label: "Hero Banner", icon: Home },
                  { key: "home_what_we_do", label: "What We Do", icon: Layers },
                  { key: "home_why", label: "Why Choose Us", icon: Sparkles },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isCurrent = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isCurrent
                          ? "bg-[#0E7C86]/20 border-l-4 border-[#2CCFD3] text-[#2CCFD3] font-bold shadow-md"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      <IconComp
                        className={`w-4 h-4 ${
                          isCurrent ? "text-[#2CCFD3]" : "text-slate-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* SECTION TABS GROUP: SERVICES */}
          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={() => toggleGroup("services")}
              className="w-full flex items-center justify-between text-xs font-bold font-mono uppercase text-slate-400 tracking-wider mb-2 px-2 py-1 hover:text-white"
            >
              <div className="flex items-center gap-2 text-[#2CCFD3]">
                <Briefcase className="w-3.5 h-3.5" />
                <span>SERVICES</span>
              </div>
              {expandedGroups.services ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            {expandedGroups.services && (
              <div className="space-y-1">
                {[
                  { key: "services_hero", label: "Services Hero", icon: Briefcase },
                  { key: "services_offerings", label: "What We Offer", icon: Layers },
                  { key: "services_process", label: "Process Steps", icon: Code },
                  { key: "services_why", label: "Why Choose Us", icon: Sparkles },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isCurrent = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isCurrent
                          ? "bg-[#0E7C86]/20 border-l-4 border-[#2CCFD3] text-[#2CCFD3] font-bold shadow-md"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      <IconComp
                        className={`w-4 h-4 ${
                          isCurrent ? "text-[#2CCFD3]" : "text-slate-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* SECTION TABS GROUP: PORTFOLIO */}
          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={() => toggleGroup("portfolio")}
              className="w-full flex items-center justify-between text-xs font-bold font-mono uppercase text-slate-400 tracking-wider mb-2 px-2 py-1 hover:text-white"
            >
              <div className="flex items-center gap-2 text-[#2CCFD3]">
                <Award className="w-3.5 h-3.5" />
                <span>PORTFOLIO</span>
              </div>
              {expandedGroups.portfolio ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            {expandedGroups.portfolio && (
              <div className="space-y-1">
                {[
                  { key: "portfolio_hero", label: "Portfolio Hero", icon: Award },
                  { key: "portfolio_brands", label: "Brand Strip", icon: Globe },
                  { key: "portfolio_cta", label: "CTA Banner", icon: Zap },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isCurrent = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isCurrent
                          ? "bg-[#0E7C86]/20 border-l-4 border-[#2CCFD3] text-[#2CCFD3] font-bold shadow-md"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      <IconComp
                        className={`w-4 h-4 ${
                          isCurrent ? "text-[#2CCFD3]" : "text-slate-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* SECTION TABS GROUP: ABOUT */}
          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={() => toggleGroup("about")}
              className="w-full flex items-center justify-between text-xs font-bold font-mono uppercase text-slate-400 tracking-wider mb-2 px-2 py-1 hover:text-white"
            >
              <div className="flex items-center gap-2 text-[#2CCFD3]">
                <Info className="w-3.5 h-3.5" />
                <span>ABOUT</span>
              </div>
              {expandedGroups.about ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            {expandedGroups.about && (
              <div className="space-y-1">
                {[
                  { key: "about_hero", label: "Hero & Office", icon: Info },
                  { key: "about_mission_vision", label: "Mission, Vision & Values", icon: Shield },
                  { key: "about_milestones", label: "Journey Milestones", icon: BarChart3 },
                  { key: "about_culture", label: "Remote Culture", icon: Heart },
                  { key: "about_cta", label: "CTA Banner", icon: Zap },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isCurrent = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isCurrent
                          ? "bg-[#0E7C86]/20 border-l-4 border-[#2CCFD3] text-[#2CCFD3] font-bold shadow-md"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      <IconComp
                        className={`w-4 h-4 ${
                          isCurrent ? "text-[#2CCFD3]" : "text-slate-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* SECTION TABS GROUP: RESOURCES */}
          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={() => toggleGroup("resources")}
              className="w-full flex items-center justify-between text-xs font-bold font-mono uppercase text-slate-400 tracking-wider mb-2 px-2 py-1 hover:text-white"
            >
              <div className="flex items-center gap-2 text-[#2CCFD3]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>RESOURCES</span>
              </div>
              {expandedGroups.resources ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            {expandedGroups.resources && (
              <div className="space-y-1">
                {[
                  { key: "resources_hero", label: "Resources Hero", icon: BookOpen },
                  { key: "resources_faqs", label: "FAQs", icon: HelpCircle },
                  { key: "resources_tech_stack", label: "Tech Stack", icon: Layers },
                  { key: "resources_cta", label: "CTA Banner", icon: Zap },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isCurrent = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isCurrent
                          ? "bg-[#0E7C86]/20 border-l-4 border-[#2CCFD3] text-[#2CCFD3] font-bold shadow-md"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      <IconComp
                        className={`w-4 h-4 ${
                          isCurrent ? "text-[#2CCFD3]" : "text-slate-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* SECTION TABS GROUP: CONTACT */}
          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={() => toggleGroup("contact")}
              className="w-full flex items-center justify-between text-xs font-bold font-mono uppercase text-slate-400 tracking-wider mb-2 px-2 py-1 hover:text-white"
            >
              <div className="flex items-center gap-2 text-[#2CCFD3]">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>CONTACT</span>
              </div>
              {expandedGroups.contact ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            {expandedGroups.contact && (
              <div className="space-y-1">
                {[
                  { key: "contact_hero", label: "Hero Banner", icon: BookOpen },
                  { key: "contact_info", label: "Info, Maps & Socials", icon: PhoneCall },
                  { key: "contact_offices", label: "Our Locations", icon: Globe },
                  { key: "contact_faqs", label: "FAQs", icon: HelpCircle },
                  { key: "contact_cta", label: "CTA Banner", icon: Zap },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isCurrent = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isCurrent
                          ? "bg-[#0E7C86]/20 border-l-4 border-[#2CCFD3] text-[#2CCFD3] font-bold shadow-md"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      <IconComp
                        className={`w-4 h-4 ${
                          isCurrent ? "text-[#2CCFD3]" : "text-slate-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* SECTION TABS GROUP: DYNAMIC MODULES */}
          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={() => toggleGroup("modules")}
              className="w-full flex items-center justify-between text-xs font-bold font-mono uppercase text-slate-400 tracking-wider mb-2 px-2 py-1 hover:text-white"
            >
              <div className="flex items-center gap-2 text-[#2CCFD3]">
                <Layers className="w-3.5 h-3.5" />
                <span>DYNAMIC MODULES</span>
              </div>
              {expandedGroups.modules ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            {expandedGroups.modules && (
              <div className="space-y-1">
                {[
                  { key: "blogs_module", label: "Blog Posts", icon: FileText, count: blogs.length },
                  { key: "cases_module", label: "Case Studies", icon: Award, count: caseStudies.length },
                  { key: "projects_module", label: "Portfolio Projects", icon: Briefcase, count: projects.length },
                  { key: "team_module", label: "Leaders & Team", icon: Users, count: team.length },
                  { key: "testimonials_module", label: "Testimonials", icon: MessageSquare, count: testimonials.length },
                  { key: "stats_module", label: "Counter Metrics", icon: BarChart3, count: stats.length },
                  { key: "leads_module", label: "Client Inquiries", icon: Mail, count: leads.length },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isCurrent = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isCurrent
                          ? "bg-[#0E7C86]/20 border-l-4 border-[#2CCFD3] text-[#2CCFD3] font-bold shadow-md"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp
                          className={`w-4 h-4 ${
                            isCurrent ? "text-[#2CCFD3]" : "text-slate-400"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400 font-mono">
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* SECTION TABS GROUP: ADMIN SETTINGS */}
          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={() => toggleGroup("settings")}
              className="w-full flex items-center justify-between text-xs font-bold font-mono uppercase text-slate-400 tracking-wider mb-2 px-2 py-1 hover:text-white"
            >
              <div className="flex items-center gap-2 text-[#2CCFD3]">
                <Lock className="w-3.5 h-3.5" />
                <span>ADMIN SECURITY</span>
              </div>
              {expandedGroups.settings ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            {expandedGroups.settings && (
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab("security_settings")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeTab === "security_settings"
                      ? "bg-[#0E7C86]/20 border-l-4 border-[#2CCFD3] text-[#2CCFD3] font-bold shadow-md"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  }`}
                >
                  <Shield className="w-4 h-4 text-[#2CCFD3]" />
                  <span>Admin Security & Account Settings</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN WORKSPACE CONTENT CONTAINER */}
        <main className="flex-1 bg-[#070E17] p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-60px)] relative">
          {/* FLOATING SUCCESS NOTIFICATION TOAST */}
          {saveSuccess && (
            <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-[#0E7C86] text-white font-bold text-xs shadow-2xl flex items-center gap-3 animate-bounce border border-[#2CCFD3]">
              <CheckCircle2 className="w-5 h-5 text-[#2CCFD3]" />
              <div className="flex flex-col">
                <span>Changes saved to database!</span>
                <span className="text-[10px] text-teal-100 font-mono font-normal">
                  ⚡ Live real-time synced to website
                </span>
              </div>
            </div>
          )}

          {/* PAGE SECTION EDITOR ENGINE */}
          {activeTab.startsWith("home_") ||
          activeTab.startsWith("services_") ||
          activeTab.startsWith("portfolio_") ||
          activeTab.startsWith("about_") ||
          activeTab.startsWith("resources_") ||
          activeTab.startsWith("contact_") ? (
            <div className="w-full space-y-6">
              <div className="bg-[#0D1B2A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-[#2CCFD3] text-[10px] font-mono font-bold uppercase tracking-wider">
                      JITSEETEC CONTENT CONTROL
                    </div>
                    <h2 className="text-2xl font-extrabold font-heading text-white capitalize">
                      {activeTab.replace(/_/g, " ")} Section
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Update section copy or image assets below and click &quot;Save Changes&quot; to apply.
                    </p>
                  </div>
                  <button
                    onClick={handleSaveSection}
                    disabled={saving}
                    className="px-6 py-3 bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] hover:brightness-110 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-[#0E7C86]/30 transition-all shrink-0"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-5">
                  {Object.keys(sectionData).length === 0 ? (
                    <div className="text-xs text-slate-400 py-6 text-center">
                      Loading section content from database...
                    </div>
                  ) : (
                    Object.entries(sectionData).map(([fieldKey, val]: [string, any]) => {
                      const isImage = fieldKey.toLowerCase().includes("image");
                      const isLongText =
                        fieldKey.toLowerCase().includes("desc") ||
                        fieldKey.toLowerCase().includes("mission") ||
                        fieldKey.toLowerCase().includes("vision");
                      const isArray = Array.isArray(val);

                      if (isArray) {
                        const isObjectArray =
                          val.length > 0 && typeof val[0] === "object" && val[0] !== null;

                        if (isObjectArray) {
                          return (
                            <div key={fieldKey} className="space-y-3 pt-2">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                                  {fieldKey.replace(/([A-Z])/g, " $1")} ({val.length} items)
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const template = { ...val[0] };
                                    Object.keys(template).forEach(
                                      (k) => (template[k] = k === "stepNumber" ? val.length + 1 : "")
                                    );
                                    setSectionData({
                                      ...sectionData,
                                      [fieldKey]: [...val, template],
                                    });
                                  }}
                                  className="px-3 py-1 bg-[#0E7C86]/20 text-[#2CCFD3] border border-[#0E7C86]/40 hover:bg-[#0E7C86]/30 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add Sub-Item</span>
                                </button>
                              </div>

                              <div className="grid grid-cols-1 gap-3">
                                {val.map((itemObj: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className="bg-[#0B1623] p-4 rounded-2xl border border-slate-800 space-y-3"
                                  >
                                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                                      <span className="text-[11px] font-bold text-[#2CCFD3] font-mono">
                                        Item #{idx + 1}{" "}
                                        {itemObj.title || itemObj.q || itemObj.year
                                          ? `— ${itemObj.title || itemObj.q || itemObj.year}`
                                          : ""}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newArr = [...val];
                                          newArr.splice(idx, 1);
                                          setSectionData({
                                            ...sectionData,
                                            [fieldKey]: newArr,
                                          });
                                        }}
                                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      {Object.entries(itemObj).map(
                                        ([subKey, subVal]: [string, any]) => {
                                          const isSubLong =
                                            subKey.toLowerCase().includes("desc") ||
                                            subKey.toLowerCase().includes("a") ||
                                            subKey === "quote";
                                          return (
                                            <div
                                              key={subKey}
                                              className={
                                                isSubLong
                                                  ? "sm:col-span-2 space-y-1"
                                                  : "space-y-1"
                                              }
                                            >
                                              <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono">
                                                {subKey}
                                              </label>
                                              {isSubLong ? (
                                                <textarea
                                                  rows={2}
                                                  value={subVal || ""}
                                                  onChange={(e) => {
                                                    const newArr = [...val];
                                                    newArr[idx] = {
                                                      ...newArr[idx],
                                                      [subKey]: e.target.value,
                                                    };
                                                    setSectionData({
                                                      ...sectionData,
                                                      [fieldKey]: newArr,
                                                    });
                                                  }}
                                                  className="w-full px-3 py-2 bg-[#070E17] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#2CCFD3] leading-relaxed"
                                                />
                                              ) : (
                                                <input
                                                  type="text"
                                                  value={subVal || ""}
                                                  onChange={(e) => {
                                                    const newArr = [...val];
                                                    newArr[idx] = {
                                                      ...newArr[idx],
                                                      [subKey]: e.target.value,
                                                    };
                                                    setSectionData({
                                                      ...sectionData,
                                                      [fieldKey]: newArr,
                                                    });
                                                  }}
                                                  className="w-full px-3 py-2 bg-[#070E17] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#2CCFD3]"
                                                />
                                              )}
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }

                        // Array of strings (e.g. values, techList)
                        return (
                          <div key={fieldKey} className="space-y-2">
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                              {fieldKey.replace(/([A-Z])/g, " $1")} (Comma-separated List)
                            </label>
                            <textarea
                              rows={3}
                              value={Array.isArray(val) ? val.join(", ") : val || ""}
                              onChange={(e) => {
                                const arr = e.target.value
                                  .split(",")
                                  .map((s) => s.trim())
                                  .filter(Boolean);
                                setSectionData({ ...sectionData, [fieldKey]: arr });
                              }}
                              className="w-full px-4 py-3 bg-[#0B1623] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#2CCFD3]"
                            />
                          </div>
                        );
                      }

                      return (
                        <div key={fieldKey} className="space-y-2">
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                            {fieldKey.replace(/([A-Z])/g, " $1")}
                          </label>

                          {isImage ? (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#0B1623] p-3 rounded-2xl border border-slate-800">
                              {val && (
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#070E17] border border-slate-700 shrink-0">
                                  <Image
                                    src={val}
                                    alt="Preview"
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1 w-full space-y-2">
                                <input
                                  type="text"
                                  value={val || ""}
                                  onChange={(e) =>
                                    setSectionData({
                                      ...sectionData,
                                      [fieldKey]: e.target.value,
                                    })
                                  }
                                  placeholder="https://res.cloudinary.com/... or /images/..."
                                  className="w-full px-4 py-2.5 bg-[#070E17] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#2CCFD3]"
                                />
                                <div className="flex items-center gap-2">
                                  <label className="px-4 py-2 bg-[#0E7C86]/20 hover:bg-[#0E7C86]/30 border border-[#0E7C86]/40 text-[#2CCFD3] text-xs font-bold rounded-xl cursor-pointer flex items-center gap-2 transition-all">
                                    {uploadingImage ? (
                                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                      <Upload className="w-3.5 h-3.5" />
                                    )}
                                    <span>Upload Image Asset</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) =>
                                        handleImageUpload(e, (url) =>
                                          setSectionData({
                                            ...sectionData,
                                            [fieldKey]: url,
                                          })
                                        )
                                      }
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          ) : isLongText ? (
                            <textarea
                              rows={4}
                              value={val || ""}
                              onChange={(e) =>
                                setSectionData({
                                  ...sectionData,
                                  [fieldKey]: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-[#0B1623] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#2CCFD3] leading-relaxed"
                            />
                          ) : (
                            <input
                              type="text"
                              value={val || ""}
                              onChange={(e) =>
                                setSectionData({
                                  ...sectionData,
                                  [fieldKey]: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-[#0B1623] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#2CCFD3]"
                            />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {/* DYNAMIC MODULE: BLOG POSTS */}
          {activeTab === "blogs_module" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold font-heading text-white">
                    Blog Posts Management
                  </h2>
                  <p className="text-xs text-slate-400">
                    Publish and update articles across Web Development, DevOps & Design
                  </p>
                </div>
                <button
                  onClick={openNewBlogModal}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Blog Post</span>
                </button>
              </div>

              <div className="bg-[#0D1B2A] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0B1623] text-slate-400 font-mono uppercase border-b border-slate-800">
                      <tr>
                        <th className="py-4 px-6">Post Title</th>
                        <th className="py-4 px-6">Category</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {blogs.map((b) => (
                        <tr key={b._id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6 font-semibold text-white flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-700">
                              <Image src={b.coverImage} alt={b.title} fill className="object-cover" sizes="40px" />
                            </div>
                            <span>{b.title}</span>
                          </td>
                          <td className="py-4 px-6 text-slate-300">{b.category}</td>
                          <td className="py-4 px-6">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase">
                              {b.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right space-x-2">
                            <button
                              onClick={() => openEditBlogModal(b)}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b._id)}
                              className="px-3 py-1.5 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 rounded-lg"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC MODULE: CASE STUDIES */}
          {activeTab === "cases_module" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold font-heading text-white">
                    Case Studies Management
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage real client project transformations and case study details
                  </p>
                </div>
                <button
                  onClick={openNewCaseStudyModal}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Case Study</span>
                </button>
              </div>

              <div className="bg-[#0D1B2A] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0B1623] text-slate-400 font-mono uppercase border-b border-slate-800">
                      <tr>
                        <th className="py-4 px-6">Client & Title</th>
                        <th className="py-4 px-6">Industry</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {caseStudies.map((cs) => (
                        <tr key={cs._id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6 font-semibold text-white">
                            <div className="text-white font-bold">{cs.title}</div>
                            <div className="text-slate-400 text-[11px]">{cs.client}</div>
                          </td>
                          <td className="py-4 px-6 text-slate-300">{cs.industry}</td>
                          <td className="py-4 px-6">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase">
                              {cs.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right space-x-2">
                            <button
                              onClick={() => openEditCaseStudyModal(cs)}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCaseStudy(cs._id)}
                              className="px-3 py-1.5 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 rounded-lg"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC MODULE: PROJECTS */}
          {activeTab === "projects_module" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold font-heading text-white">
                    Portfolio Projects
                  </h2>
                  <p className="text-xs text-slate-400">
                    Add or update projects featured across the Portfolio and Home pages
                  </p>
                </div>
                <button
                  onClick={openNewProjectModal}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Project</span>
                </button>
              </div>

              <div className="bg-[#0D1B2A] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0B1623] text-slate-400 font-mono uppercase border-b border-slate-800">
                      <tr>
                        <th className="py-4 px-6">Project Name</th>
                        <th className="py-4 px-6">Category</th>
                        <th className="py-4 px-6">Featured</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {projects.map((p) => (
                        <tr key={p._id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6 font-semibold text-white flex items-center gap-3">
                            <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-700">
                              <Image src={p.image} alt={p.title} fill className="object-cover" sizes="48px" />
                            </div>
                            <div>
                              <div className="text-white font-bold">{p.title}</div>
                              <div className="text-slate-400 text-[11px]">{p.clientName}</div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-slate-300">{p.category}</td>
                          <td className="py-4 px-6">
                            {p.featured ? (
                              <span className="px-2.5 py-1 rounded-full bg-[#0E7C86]/20 text-[#2CCFD3] border border-[#0E7C86]/40 text-[10px] font-bold uppercase">
                                Featured
                              </span>
                            ) : (
                              <span className="text-slate-500 font-mono text-[10px]">Standard</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right space-x-2">
                            <button
                              onClick={() => openEditProjectModal(p)}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p._id)}
                              className="px-3 py-1.5 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 rounded-lg"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC MODULE: LEADERS & TEAM */}
          {activeTab === "team_module" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold font-heading text-white">
                    Leaders & Core Team
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage executive leadership profiles and team members
                  </p>
                </div>
                <button
                  onClick={openNewTeamModal}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Member</span>
                </button>
              </div>

              <div className="bg-[#0D1B2A] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0B1623] text-slate-400 font-mono uppercase border-b border-slate-800">
                      <tr>
                        <th className="py-4 px-6">Member Name</th>
                        <th className="py-4 px-6">Role</th>
                        <th className="py-4 px-6">Type</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {team.map((t) => (
                        <tr key={t._id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6 font-semibold text-white flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#0E7C86]/20 text-[#2CCFD3] flex items-center justify-center font-bold font-heading border border-[#0E7C86]/40 shrink-0">
                              {t.initials || "TM"}
                            </div>
                            <span>{t.name}</span>
                          </td>
                          <td className="py-4 px-6 text-slate-300">{t.role}</td>
                          <td className="py-4 px-6">
                            {t.isLeadership ? (
                              <span className="px-2.5 py-1 rounded-full bg-[#0E7C86]/20 text-[#2CCFD3] border border-[#0E7C86]/40 text-[10px] font-bold uppercase">
                                Executive Leadership
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Core Team</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right space-x-2">
                            <button
                              onClick={() => openEditTeamModal(t)}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTeam(t._id)}
                              className="px-3 py-1.5 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 rounded-lg"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC MODULE: TESTIMONIALS */}
          {activeTab === "testimonials_module" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold font-heading text-white">
                    Client Testimonials
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage client reviews and feedback recommendations
                  </p>
                </div>
                <button
                  onClick={openNewTestimonialModal}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Testimonial</span>
                </button>
              </div>

              <div className="bg-[#0D1B2A] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0B1623] text-slate-400 font-mono uppercase border-b border-slate-800">
                      <tr>
                        <th className="py-4 px-6">Author & Role</th>
                        <th className="py-4 px-6">Rating</th>
                        <th className="py-4 px-6">Quote Excerpt</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {testimonials.map((t) => (
                        <tr key={t._id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6 font-semibold text-white">
                            <div className="text-white font-bold">{t.author}</div>
                            <div className="text-slate-400 text-[11px]">{t.role}</div>
                          </td>
                          <td className="py-4 px-6 text-amber-400 font-bold">★ {t.rating}/5</td>
                          <td className="py-4 px-6 text-slate-300 truncate max-w-xs">{t.quote}</td>
                          <td className="py-4 px-6 text-right space-x-2">
                            <button
                              onClick={() => openEditTestimonialModal(t)}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTestimonial(t._id)}
                              className="px-3 py-1.5 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 rounded-lg"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC MODULE: STATS COUNTERS */}
          {activeTab === "stats_module" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold font-heading text-white">
                    Counter Statistics
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage key metric numbers displayed across the Home and About pages
                  </p>
                </div>
                <button
                  onClick={openNewStatModal}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Metric</span>
                </button>
              </div>

              <div className="bg-[#0D1B2A] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0B1623] text-slate-400 font-mono uppercase border-b border-slate-800">
                      <tr>
                        <th className="py-4 px-6">Label</th>
                        <th className="py-4 px-6">Value</th>
                        <th className="py-4 px-6">Icon</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {stats.map((s) => (
                        <tr key={s._id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6 font-semibold text-white">{s.label}</td>
                          <td className="py-4 px-6 font-bold text-[#2CCFD3]">{s.val}</td>
                          <td className="py-4 px-6 text-slate-400 font-mono">{s.iconName}</td>
                          <td className="py-4 px-6 text-right space-x-2">
                            <button
                              onClick={() => openEditStatModal(s)}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteStat(s._id)}
                              className="px-3 py-1.5 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 rounded-lg"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC MODULE: CLIENT INQUIRIES LEADS */}
          {activeTab === "leads_module" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold font-heading text-white">
                  Client Contact Inquiries
                </h2>
                <p className="text-xs text-slate-400">
                  Submissions submitted via the Consultation modal and Contact Form
                </p>
              </div>

              <div className="bg-[#0D1B2A] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                {leads.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400">
                    No client contact inquiries received yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0B1623] text-slate-400 font-mono uppercase border-b border-slate-800">
                        <tr>
                          <th className="py-4 px-6">Name & Email</th>
                          <th className="py-4 px-6">Company / Phone</th>
                          <th className="py-4 px-6">Message</th>
                          <th className="py-4 px-6">Received</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {leads.map((l) => (
                          <tr key={l._id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-4 px-6 font-semibold text-white">
                              <div className="text-white font-bold">{l.name}</div>
                              <div className="text-[#2CCFD3] text-[11px]">{l.email}</div>
                            </td>
                            <td className="py-4 px-6 text-slate-300">
                              <div>{l.company || "N/A"}</div>
                              <div className="text-slate-500 text-[11px]">{l.phone || ""}</div>
                            </td>
                            <td className="py-4 px-6 text-slate-300 max-w-xs leading-relaxed">
                              {l.message}
                            </td>
                            <td className="py-4 px-6 text-slate-400 font-mono text-[11px]">
                              {new Date(l.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DYNAMIC MODULE: SECURITY & ACCOUNT SETTINGS (ALL ADMIN EDITABLE FIELDS) */}
          {activeTab === "security_settings" && (
            <div className="w-full space-y-8 max-w-5xl">
              <div>
                <div className="text-[#2CCFD3] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Shield className="w-4 h-4" />
                  <span>UNIFIED ADMIN CONTROL PANEL</span>
                </div>
                <h2 className="text-3xl font-extrabold font-heading text-white">
                  Admin Security & Account Settings
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage your display name, login email address, profile avatar image, and security password in one single place.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* SECTION 1: ADMIN PROFILE & IDENTITY */}
                <div className="bg-[#0D1B2A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold font-heading text-white">
                          Profile & Identity
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          Personal information and avatar image
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#0E7C86]/20 border border-[#0E7C86]/40 text-[#2CCFD3] text-[10px] font-mono uppercase font-bold">
                        {adminUser?.role || "admin"}
                      </span>
                    </div>

                    {profileError && (
                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                        <Shield className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{profileError}</span>
                      </div>
                    )}

                    {profileSuccess && (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{profileSuccess}</span>
                      </div>
                    )}

                    <form id="profile-form" onSubmit={handleUpdateProfile} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
                          Admin Account Identity
                        </label>
                        <div className="w-full px-4 py-3 bg-[#0B1623]/80 border border-slate-800 rounded-xl text-white text-xs font-bold font-mono flex items-center justify-between">
                          <span>JitSeeTec Admin</span>
                          <span className="text-[10px] text-slate-500 font-sans font-normal uppercase">(System Account)</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
                          Admin Login Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={adminEmailInput}
                          onChange={(e) => setAdminEmailInput(e.target.value)}
                          placeholder="admin@jitseetec.com"
                          className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#2CCFD3]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
                          Profile Avatar Image
                        </label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#0B1623] p-4 rounded-2xl border border-slate-800">
                          {adminAvatarInput && (
                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#070E17] border-2 border-[#2CCFD3] shrink-0 shadow-md">
                              <Image
                                src={adminAvatarInput}
                                alt="Admin Avatar Preview"
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 w-full space-y-2">
                            <input
                              type="text"
                              value={adminAvatarInput}
                              onChange={(e) => setAdminAvatarInput(e.target.value)}
                              placeholder="https://res.cloudinary.com/... or /images/..."
                              className="w-full px-4 py-2 bg-[#070E17] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#2CCFD3]"
                            />
                            <div>
                              <label className="px-3.5 py-1.5 bg-[#0E7C86]/20 hover:bg-[#0E7C86]/30 border border-[#0E7C86]/40 text-[#2CCFD3] text-[11px] font-bold rounded-xl cursor-pointer inline-flex items-center gap-2 transition-all">
                                {uploadingImage ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Upload className="w-3.5 h-3.5" />
                                )}
                                <span>Upload Avatar Image</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleImageUpload(e, (url) => setAdminAvatarInput(url))
                                  }
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80">
                    <button
                      type="submit"
                      form="profile-form"
                      disabled={updatingProfile}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      {updatingProfile ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving Profile Details...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save Profile & Avatar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* SECTION 2: SECURITY & PASSWORD UPDATE */}
                <div className="bg-[#0D1B2A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                      <h3 className="text-lg font-bold font-heading text-white">
                        Security Password
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Update password credentials for system access
                      </p>
                    </div>

                    {passError && (
                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                        <Shield className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{passError}</span>
                      </div>
                    )}

                    {passSuccess && (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{passSuccess}</span>
                      </div>
                    )}

                    <form id="password-form" onSubmit={handleUpdatePassword} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                          <input
                            type={showCurrentPass ? "text" : "password"}
                            required
                            value={currentPasswordInput}
                            onChange={(e) => setCurrentPasswordInput(e.target.value)}
                            placeholder="Enter current password"
                            className="w-full pl-11 pr-11 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#2CCFD3]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPass(!showCurrentPass)}
                            className="absolute right-4 top-3.5 text-slate-400 hover:text-white"
                          >
                            {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
                          New Password (Min 6 chars)
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                          <input
                            type={showNewPass ? "text" : "password"}
                            required
                            minLength={6}
                            value={newPasswordInput}
                            onChange={(e) => setNewPasswordInput(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full pl-11 pr-11 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#2CCFD3]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPass(!showNewPass)}
                            className="absolute right-4 top-3.5 text-slate-400 hover:text-white"
                          >
                            {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                          <input
                            type={showConfirmPass ? "text" : "password"}
                            required
                            minLength={6}
                            value={confirmPasswordInput}
                            onChange={(e) => setConfirmPasswordInput(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full pl-11 pr-11 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#2CCFD3]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                            className="absolute right-4 top-3.5 text-slate-400 hover:text-white"
                          >
                            {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80">
                    <button
                      type="submit"
                      form="password-form"
                      disabled={updatingPass}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      {updatingPass ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Updating Password...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Update Security Password</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* MODAL DIALOG POPUPS FOR CREATING / EDITING */}
      {/* ----------------------------------------------------------- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D1B2A] border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold font-heading text-white capitalize">
                {editingItem ? "Edit" : "Add New"}{" "}
                {activeModal === "casestudy" ? "Case Study" : activeModal}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MODAL FORM: BLOG */}
            {activeModal === "blog" && (
              <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                      Category
                    </label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={blogForm.readTime}
                      onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                    Cover Image URL
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={blogForm.coverImage}
                      onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                      className="flex-1 px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                    />
                    <label className="px-4 py-3 bg-[#0E7C86]/20 border border-[#0E7C86]/40 text-[#2CCFD3] font-bold rounded-xl cursor-pointer">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, (url) => setBlogForm({ ...blogForm, coverImage: url }))
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                    Excerpt Summary
                  </label>
                  <textarea
                    rows={2}
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                    Full Content (Markdown/HTML)
                  </label>
                  <textarea
                    rows={6}
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3] font-mono text-[11px]"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] text-white font-bold rounded-xl"
                  >
                    Save Blog Post
                  </button>
                </div>
              </form>
            )}

            {/* MODAL FORM: PROJECT */}
            {activeModal === "project" && (
              <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                      Category
                    </label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Apps">Mobile Apps</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Custom Software">Custom Software</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={projectForm.industry}
                      onChange={(e) => setProjectForm({ ...projectForm, industry: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                    Image URL
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      className="flex-1 px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                    />
                    <label className="px-4 py-3 bg-[#0E7C86]/20 border border-[#0E7C86]/40 text-[#2CCFD3] font-bold rounded-xl cursor-pointer">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, (url) => setProjectForm({ ...projectForm, image: url }))
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.desc}
                    onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] text-white font-bold rounded-xl"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            )}

            {/* MODAL FORM: TEAM */}
            {activeModal === "team" && (
              <form onSubmit={handleSaveTeam} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={teamForm.name}
                    onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                      Role / Position
                    </label>
                    <input
                      type="text"
                      value={teamForm.role}
                      onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                      Initials
                    </label>
                    <input
                      type="text"
                      value={teamForm.initials}
                      onChange={(e) => setTeamForm({ ...teamForm, initials: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                    Avatar Image URL
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={teamForm.avatar}
                      onChange={(e) => setTeamForm({ ...teamForm, avatar: e.target.value })}
                      className="flex-1 px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                    />
                    <label className="px-4 py-3 bg-[#0E7C86]/20 border border-[#0E7C86]/40 text-[#2CCFD3] font-bold rounded-xl cursor-pointer">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, (url) => setTeamForm({ ...teamForm, avatar: url }))
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                    Short Bio
                  </label>
                  <textarea
                    rows={3}
                    value={teamForm.bio}
                    onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isLeadership"
                    checked={teamForm.isLeadership}
                    onChange={(e) => setTeamForm({ ...teamForm, isLeadership: e.target.checked })}
                    className="w-4 h-4 accent-[#0E7C86]"
                  />
                  <label htmlFor="isLeadership" className="text-xs text-slate-300 font-medium">
                    Executive Leadership Roster
                  </label>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] text-white font-bold rounded-xl"
                  >
                    Save Member
                  </button>
                </div>
              </form>
            )}

            {/* MODAL FORM: TESTIMONIAL */}
            {activeModal === "testimonial" && (
              <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.author}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                      Role & Company
                    </label>
                    <input
                      type="text"
                      value={testimonialForm.role}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                      Rating (1 to 5)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={testimonialForm.rating}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                    Testimonial Quote
                  </label>
                  <textarea
                    rows={4}
                    value={testimonialForm.quote}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] text-white font-bold rounded-xl"
                  >
                    Save Testimonial
                  </button>
                </div>
              </form>
            )}

            {/* MODAL FORM: STAT */}
            {activeModal === "stat" && (
              <form onSubmit={handleSaveStat} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                    Metric Label
                  </label>
                  <input
                    type="text"
                    required
                    value={statForm.label}
                    onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                      Display Value (e.g. 15+, 95%)
                    </label>
                    <input
                      type="text"
                      required
                      value={statForm.val}
                      onChange={(e) => setStatForm({ ...statForm, val: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold uppercase font-mono mb-1">
                      Icon Name (Rocket, Smile, Globe, etc.)
                    </label>
                    <input
                      type="text"
                      value={statForm.iconName}
                      onChange={(e) => setStatForm({ ...statForm, iconName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0B1623] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#2CCFD3]"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#0E7C86] to-[#2CCFD3] text-white font-bold rounded-xl"
                  >
                    Save Metric
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
