import { connectToDatabase } from "@/lib/db";
import SiteContent from "@/models/SiteContent";
import { getAdminSession } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/apiResponse";

// GET /api/content/[sectionKey] - Public API to get page section content
export async function GET(
  req: Request,
  { params }: { params: Promise<{ sectionKey: string }> },
) {
  try {
    await connectToDatabase();
    const { sectionKey } = await params;

    const content = await SiteContent.findOne({ sectionKey }).lean();
    if (!content) {
      return successResponse(
        null,
        `No custom content found for section '${sectionKey}'. Using default fallbacks.`,
        200,
      );
    }

    return successResponse(
      content.data,
      "Section content retrieved successfully",
    );
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to retrieve section content");
  }
}

// PUT /api/content/[sectionKey] - Protected API to save page section content
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ sectionKey: string }> },
) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return unauthorizedResponse();
    }

    await connectToDatabase();
    const { sectionKey } = await params;
    const body = await req.json();

    const updated = await SiteContent.findOneAndUpdate(
      { sectionKey },
      { sectionKey, data: body },
      { upsert: true, new: true, runValidators: true },
    ).lean();

    return successResponse(
      updated.data,
      `Section '${sectionKey}' saved successfully!`,
    );
  } catch (error: any) {
    return errorResponse(error, 400, "Failed to save section content");
  }
}
