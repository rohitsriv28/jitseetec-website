import { BlogService } from "@/services/blogService";
import { getAdminSession } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/apiResponse";

// GET /api/blogs - Public API to list blogs
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status") || "published";

    const filter: Record<string, any> = {};
    if (status !== "all") filter.status = status;
    if (category) filter.category = category;

    const blogs = await BlogService.getAllBlogs(filter);
    return successResponse(blogs, "Blogs retrieved successfully", 200, {
      count: blogs.length,
    });
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to retrieve blogs");
  }
}

// POST /api/blogs - Protected API to create a new blog
export async function POST(req: Request) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return unauthorizedResponse();
    }

    const body = await req.json();
    if (!body.title || !body.excerpt || !body.content || !body.coverImage) {
      return errorResponse(
        "Title, excerpt, content, and coverImage are required.",
        400,
      );
    }

    const blog = await BlogService.createBlog(body);
    return successResponse(blog, "Blog post created successfully", 201);
  } catch (error: any) {
    return errorResponse(error, 400, "Failed to create blog post");
  }
}
