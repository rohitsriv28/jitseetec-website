import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { getAdminSession, comparePassword, hashPassword } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/apiResponse";

export async function PUT(req: Request) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return unauthorizedResponse("No active session found");
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return errorResponse(
        "Both current password and new password are required",
        400,
      );
    }

    if (newPassword.length < 6) {
      return errorResponse(
        "New password must be at least 6 characters long",
        400,
      );
    }

    await connectToDatabase();

    // Explicitly include +password field since User model has select: false on password
    const user = await User.findOne({
      $or: [{ _id: session.userId }, { email: session.email.toLowerCase() }],
    }).select("+password");

    if (!user || !user.password) {
      return errorResponse("Admin account not found in database", 404);
    }

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return errorResponse("Current password is incorrect", 400);
    }

    const newHashedPassword = await hashPassword(newPassword);
    user.password = newHashedPassword;
    await user.save();

    return successResponse(null, "Password updated successfully");
  } catch (err: any) {
    console.error("Error updating password:", err);
    return errorResponse("Failed to update password", 500);
  }
}
