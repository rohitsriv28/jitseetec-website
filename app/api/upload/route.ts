import { getAdminSession } from "@/lib/auth";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/apiResponse";

export async function POST(req: Request) {
  try {
    const session = await getAdminSession(req);
    if (!session) return unauthorizedResponse();

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "JitSeeTec";

    if (!file) {
      return errorResponse("No file uploaded", 400);
    }

    // Validate file type (image only)
    if (!file.type.startsWith("image/")) {
      return errorResponse("Uploaded file must be an image", 400);
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary CDN
    const uploadResult = await uploadBufferToCloudinary(buffer, folder);

    return successResponse(
      {
        url: uploadResult.url,
        public_id: uploadResult.public_id,
        filename: file.name,
        size: file.size,
      },
      "Image uploaded to Cloudinary successfully",
      201,
    );
  } catch (error: any) {
    return errorResponse(error, 500, "Failed to upload image to Cloudinary");
  }
}
