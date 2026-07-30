import { CaseStudyService } from "@/services/caseStudyService";
import { getAdminSession } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/apiResponse";

// GET /api/case-studies - Public API to list case studies
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "published";

    const filter: Record<string, any> = {};
    if (status !== "all") filter.status = status;

    const caseStudies = await CaseStudyService.getAllCaseStudies(filter);
    return successResponse(
      caseStudies,
      "Case studies retrieved successfully",
      200,
      {
        count: caseStudies.length,
      },
    );
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to retrieve case studies");
  }
}

// POST /api/case-studies - Protected API to create a new case study
export async function POST(req: Request) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return unauthorizedResponse();
    }

    const body = await req.json();
    if (!body.title || !body.client || !body.challenge || !body.coverImage) {
      return errorResponse(
        "Title, client, challenge, and coverImage are required.",
        400,
      );
    }

    const caseStudy = await CaseStudyService.createCaseStudy(body);
    return successResponse(caseStudy, "Case study created successfully", 201);
  } catch (error: any) {
    return errorResponse(error, 400, "Failed to create case study");
  }
}
