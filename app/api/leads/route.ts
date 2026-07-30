import { LeadService } from "@/services/leadService";
import { getAdminSession } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/apiResponse";

// POST /api/leads - Public API for contact form submissions
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.fullName || !body.email || !body.message) {
      return errorResponse("Full name, email, and message are required.", 400);
    }

    const lead = await LeadService.createLead(body);
    return successResponse(
      lead,
      "Thank you for contacting JitSeeTec! We will get back to you shortly.",
      201,
    );
  } catch (error: any) {
    return errorResponse(error, 400, "Failed to submit message.");
  }
}

// GET /api/leads - Protected API for admin to view lead submissions
export async function GET(req: Request) {
  try {
    const session = await getAdminSession(req);
    if (!session) return unauthorizedResponse();

    const leads = await LeadService.getAllLeads();
    return successResponse(leads, "Leads retrieved successfully", 200, {
      count: leads.length,
    });
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to retrieve leads");
  }
}
