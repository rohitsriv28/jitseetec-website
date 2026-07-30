import { ProjectService } from "@/services/projectService";
import { getAdminSession } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/apiResponse";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const filter: Record<string, any> = {};
    if (category && category !== "All Projects") filter.category = category;
    if (featured === "true") filter.featured = true;

    const projects = await ProjectService.getAllProjects(filter);
    return successResponse(projects, "Projects retrieved successfully", 200, {
      count: projects.length,
    });
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to retrieve projects");
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return unauthorizedResponse();
    }

    const body = await req.json();
    if (
      !body.title ||
      !body.category ||
      !body.industry ||
      !body.image ||
      !body.desc
    ) {
      return errorResponse(
        "Title, category, industry, image, and desc are required.",
        400,
      );
    }

    const project = await ProjectService.createProject(body);
    return successResponse(project, "Project created successfully", 201);
  } catch (error: any) {
    return errorResponse(error, 400, "Failed to create project");
  }
}
