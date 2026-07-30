import { NextResponse } from "next/server";
import { TOKEN_COOKIE_NAME } from "@/lib/auth";
import { successResponse } from "@/lib/apiResponse";

export async function POST() {
  const response = successResponse(null, "Logged out successfully");
  response.cookies.delete(TOKEN_COOKIE_NAME);
  return response;
}
