import { CaseStudyService } from "@/services/caseStudyService";
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
    let item = await CaseStudyService.getCaseStudyBySlug(id);
    if (!item) {
      item = await CaseStudyService.getCaseStudyById(id);
    }

    if (!item) {
      return errorResponse("Case study not found", 404);
    }

    return successResponse(item, "Case study retrieved successfully");
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to retrieve case study");
  }
}

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

    const updated = await CaseStudyService.updateCaseStudy(id, body);
    if (!updated) {
      return errorResponse("Case study not found", 404);
    }

    return successResponse(updated, "Case study updated successfully");
  } catch (error: any) {
    return errorResponse(error, 400, "Failed to update case study");
  }
}

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
    const deleted = await CaseStudyService.deleteCaseStudy(id);

    if (!deleted) {
      return errorResponse("Case study not found", 404);
    }

    return successResponse(deleted, "Case study deleted successfully");
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to delete case study");
  }
}
