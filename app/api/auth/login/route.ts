import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import {
  comparePassword,
  hashPassword,
  generateToken,
  TOKEN_COOKIE_NAME,
} from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/apiResponse";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    if (!email || !password) {
      return errorResponse("Email and password are required", 400);
    }

    const inputEmail = email.trim().toLowerCase();

    // Find user by email and select password field
    let user = await User.findOne({ email: inputEmail }).select("+password");

    // Auto-seed admin user if User collection is completely empty and ADMIN_PASSWORD env var is set
    if (!user && process.env.ADMIN_PASSWORD) {
      const totalUsers = await User.countDocuments();
      if (totalUsers === 0) {
        const defaultAdminEmail = (
          process.env.ADMIN_EMAIL || "admin@jitseetec.com"
        ).toLowerCase();
        const adminPasswordFromEnv = process.env.ADMIN_PASSWORD;

        if (
          inputEmail === defaultAdminEmail &&
          password === adminPasswordFromEnv
        ) {
          const hashedPassword = await hashPassword(adminPasswordFromEnv);
          user = await User.create({
            name: "JitSeeTec Admin",
            email: defaultAdminEmail,
            password: hashedPassword,
            role: "admin",
            avatar: "/images/rohit_kumar_author.png",
          });
          console.log(
            "🌱 Auto-created initial admin user from ADMIN_PASSWORD environment variable.",
          );
        }
      }
    }

    if (!user) {
      return errorResponse("Invalid email or password", 401);
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return errorResponse("Invalid email or password", 401);
    }

    // Generate JWT Token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const response = successResponse(
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        token,
      },
      "Login successful",
    );

    // Set secure HTTP-Only cookie
    response.cookies.set({
      name: TOKEN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("❌ Login Route Error:", error);
    return errorResponse(
      error?.message || error,
      500,
      "Login failed. Check server database connection.",
    );
  }
}
