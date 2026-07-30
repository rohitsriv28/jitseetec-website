import { TeamService } from "@/services/teamService";
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
    const member = await TeamService.getTeamMemberById(id);
    if (!member) return errorResponse("Team member not found", 404);
    return successResponse(member, "Team member retrieved successfully");
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to retrieve team member");
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

    const updated = await TeamService.updateTeamMember(id, body);
    if (!updated) return errorResponse("Team member not found", 404);

    return successResponse(updated, "Team member updated successfully");
  } catch (error: any) {
    return errorResponse(error, 400, "Failed to update team member");
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
    const deleted = await TeamService.deleteTeamMember(id);
    if (!deleted) return errorResponse("Team member not found", 404);

    return successResponse(deleted, "Team member deleted successfully");
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to delete team member");
  }
}
