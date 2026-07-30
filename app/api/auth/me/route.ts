import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { getAdminSession } from "@/lib/auth";
import { successResponse, unauthorizedResponse } from "@/lib/apiResponse";

export async function GET(req: Request) {
  const session = await getAdminSession(req);
  if (!session) {
    return unauthorizedResponse("No active session found");
  }

  await connectToDatabase();
  const user = await User.findOne({
    $or: [{ _id: session.userId }, { email: session.email.toLowerCase() }],
  });

  return successResponse(
    {
      session,
      user: user
        ? {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
          }
        : null,
    },
    "Session verified"
  );
}
