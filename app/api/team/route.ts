import { TeamService } from "@/services/teamService";
import { getAdminSession } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/apiResponse";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const leadership = searchParams.get("leadership");

    const filter: Record<string, any> = {};
    if (leadership === "true") filter.isLeadership = true;

    const team = await TeamService.getAllTeamMembers(filter);
    return successResponse(team, "Team members retrieved successfully", 200, {
      count: team.length,
    });
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to retrieve team members");
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession(req);
    if (!session) return unauthorizedResponse();

    const body = await req.json();
    if (!body.name || !body.role || !body.initials || !body.linkedin) {
      return errorResponse(
        "Name, role, initials, and linkedin are required.",
        400,
      );
    }

    const member = await TeamService.createTeamMember(body);
    return successResponse(member, "Team member created successfully", 201);
  } catch (error: any) {
    return errorResponse(error, 400, "Failed to create team member");
  }
}
