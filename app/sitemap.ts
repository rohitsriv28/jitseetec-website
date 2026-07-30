import { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog";
import CaseStudy from "@/models/CaseStudy";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://jitseetec-website.vercel.app";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/resources",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  let blogUrls: MetadataRoute.Sitemap = [];
  let caseStudyUrls: MetadataRoute.Sitemap = [];

  try {
    await connectToDatabase();
    const blogs = await Blog.find({ status: "published" })
      .select("slug updatedAt")
      .lean();
    const caseStudies = await CaseStudy.find({ status: "published" })
      .select("slug updatedAt")
      .lean();

    blogUrls = blogs.map((b: any) => ({
      url: `${baseUrl}/resources/blog/${b.slug}`,
      lastModified: b.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    caseStudyUrls = caseStudies.map((cs: any) => ({
      url: `${baseUrl}/resources/case-studies/${cs.slug}`,
      lastModified: cs.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error("Error generating dynamic sitemap entries:", err);
  }

  return [...staticRoutes, ...blogUrls, ...caseStudyUrls];
}
