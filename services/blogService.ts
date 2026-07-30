import { connectToDatabase } from "@/lib/db";
import Blog, { IBlog } from "@/models/Blog";

/**
 * Generates a URL-friendly slug from a title string.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export class BlogService {
  /**
   * Retrieves all blog posts (optionally filtered by status or category).
   */
  static async getAllBlogs(filter: Record<string, any> = {}) {
    await connectToDatabase();
    return Blog.find(filter).sort({ publishedAt: -1 }).lean();
  }

  /**
   * Retrieves a single blog post by its unique slug.
   */
  static async getBlogBySlug(slug: string) {
    await connectToDatabase();
    return Blog.findOne({ slug }).lean();
  }

  /**
   * Retrieves a single blog post by its MongoDB ObjectId.
   */
  static async getBlogById(id: string) {
    await connectToDatabase();
    return Blog.findById(id).lean();
  }

  /**
   * Creates a new blog post. Automatically generates a unique slug if not provided.
   */
  static async createBlog(data: Partial<IBlog>) {
    await connectToDatabase();

    if (!data.slug && data.title) {
      data.slug = slugify(data.title);
    }

    // Ensure slug uniqueness
    const existing = await Blog.findOne({ slug: data.slug });
    if (existing) {
      data.slug = `${data.slug}-${Date.now()}`;
    }

    const blog = new Blog(data);
    return blog.save();
  }

  /**
   * Updates an existing blog post by ID.
   */
  static async updateBlog(id: string, data: Partial<IBlog>) {
    await connectToDatabase();

    if (data.title && !data.slug) {
      data.slug = slugify(data.title);
    }

    return Blog.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  /**
   * Deletes a blog post by ID.
   */
  static async deleteBlog(id: string) {
    await connectToDatabase();
    return Blog.findByIdAndDelete(id).lean();
  }
}
