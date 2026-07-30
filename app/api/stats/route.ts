import { StatService } from "@/services/testimonialService";
import { getAdminSession } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/apiResponse";

export async function GET() {
  try {
    const stats = await StatService.getAllStats();
    return successResponse(stats, "Counter statistics retrieved successfully");
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to retrieve statistics");
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession(req);
    if (!session) return unauthorizedResponse();

    const body = await req.json();
    if (!body.label || !body.val) {
      return errorResponse("Label and val are required.", 400);
    }

    const stat = await StatService.createStat(body);
    return successResponse(stat, "Statistic metric created successfully", 201);
  } catch (error: any) {
    return errorResponse(error, 400, "Failed to create statistic");
  }
}
