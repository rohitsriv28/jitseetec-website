import { BlogService } from "@/services/blogService";
import { getAdminSession } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/apiResponse";

// GET /api/blogs/[id] - Fetch single blog post by ID or slug
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    let blog = await BlogService.getBlogBySlug(id);
    if (!blog) {
      blog = await BlogService.getBlogById(id);
    }

    if (!blog) {
      return errorResponse("Blog post not found", 404);
    }

    return successResponse(blog, "Blog post retrieved successfully");
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to retrieve blog post");
  }
}

// PUT /api/blogs/[id] - Protected API to update blog post
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return unauthorizedResponse();
    }

    const { id } = await params;
    const body = await req.json();

    const updatedBlog = await BlogService.updateBlog(id, body);
    if (!updatedBlog) {
      return errorResponse("Blog post not found", 404);
    }

    return successResponse(updatedBlog, "Blog post updated successfully");
  } catch (error: any) {
    return errorResponse(error, 400, "Failed to update blog post");
  }
}

// DELETE /api/blogs/[id] - Protected API to delete blog post
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return unauthorizedResponse();
    }

    const { id } = await params;
    const deletedBlog = await BlogService.deleteBlog(id);

    if (!deletedBlog) {
      return errorResponse("Blog post not found", 404);
    }

    return successResponse(deletedBlog, "Blog post deleted successfully");
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to delete blog post");
  }
}
