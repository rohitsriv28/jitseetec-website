import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { getAdminSession } from "@/lib/auth";
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

    const { email, avatar } = await req.json();

    if (!email) {
      return errorResponse("Admin email address is required", 400);
    }

    await connectToDatabase();

    const user = await User.findOne({
      $or: [{ _id: session.userId }, { email: session.email.toLowerCase() }],
    });

    if (!user) {
      return errorResponse("Admin account not found in database", 404);
    }

    // Check if email is being changed and if it is already taken
    if (email.toLowerCase() !== user.email.toLowerCase()) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return errorResponse(
          "Email address is already used by another account",
          400,
        );
      }
    }

    user.name = "JitSeeTec Admin";
    user.email = email.toLowerCase();
    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    await user.save();

    return successResponse(
      {
        user: {
          id: user._id,
          name: "JitSeeTec Admin",
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      },
      "Admin settings updated successfully",
    );
  } catch (err: any) {
    console.error("Error updating admin profile:", err);
    return errorResponse("Failed to update profile", 500);
  }
}
