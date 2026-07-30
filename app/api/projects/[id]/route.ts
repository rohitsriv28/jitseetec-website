import { ProjectService } from "@/services/projectService";
import { getAdminSession } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/apiResponse";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const project = await ProjectService.getProjectById(id);
    if (!project) return errorResponse("Project not found", 404);
    return successResponse(project, "Project retrieved successfully");
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to retrieve project");
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getAdminSession(req);
    if (!session) return unauthorizedResponse();

    const { id } = await params;
    const body = await req.json();

    const updated = await ProjectService.updateProject(id, body);
    if (!updated) return errorResponse("Project not found", 404);

    return successResponse(updated, "Project updated successfully");
  } catch (error: any) {
    return errorResponse(error, 400, "Failed to update project");
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getAdminSession(req);
    if (!session) return unauthorizedResponse();

    const { id } = await params;
    const deleted = await ProjectService.deleteProject(id);
    if (!deleted) return errorResponse("Project not found", 404);

    return successResponse(deleted, "Project deleted successfully");
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to delete project");
  }
}
