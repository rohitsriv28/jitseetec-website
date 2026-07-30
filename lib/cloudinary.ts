import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary SDK credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/**
 * Uploads a Buffer (from Next.js FormData file upload) directly to Cloudinary.
 * All uploads target the specific folder named "JitSeeTec".
 *
 * @param buffer - File contents buffer
 * @param folder - Destination folder name inside Cloudinary (default: "JitSeeTec")
 * @returns Promise resolving to the uploaded Cloudinary secure URL and public_id
 */
export async function uploadBufferToCloudinary(
  buffer: Buffer,
  folder = "JitSeeTec",
): Promise<{ url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        transformation: [
          { quality: "auto", fetch_format: "auto" }, // Automatic optimization & WebP conversion
        ],
      },
      (error, result) => {
        if (error || !result) {
          return reject(
            error || new Error("Failed to upload image to Cloudinary"),
          );
        }
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );

    uploadStream.end(buffer);
  });
}

/**
 * Deletes an image from Cloudinary using its public_id.
 *
 * @param publicId - Cloudinary asset public ID
 */
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    return res.result === "ok";
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return false;
  }
}
