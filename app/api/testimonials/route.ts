import { TestimonialService } from "@/services/testimonialService";
import { getAdminSession } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/apiResponse";

export async function GET() {
  try {
    const list = await TestimonialService.getAllTestimonials({
      featured: true,
    });
    return successResponse(list, "Testimonials retrieved successfully");
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to retrieve testimonials");
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession(req);
    if (!session) return unauthorizedResponse();

    const body = await req.json();
    if (!body.author || !body.role || !body.company || !body.quote) {
      return errorResponse(
        "Author, role, company, and quote are required.",
        400,
      );
    }

    const item = await TestimonialService.createTestimonial(body);
    return successResponse(item, "Testimonial created successfully", 201);
  } catch (error: any) {
    return errorResponse(error, 400, "Failed to create testimonial");
  }
}
