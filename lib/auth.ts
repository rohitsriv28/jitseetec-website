import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET =
  process.env.JWT_SECRET || "jitseetec_jwt_secret_key_development_only";
const TOKEN_COOKIE_NAME = "jitseetec_admin_token";

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Hashes a plaintext password securely using bcrypt.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compares a plaintext password with a stored bcrypt hash.
 */
export async function comparePassword(
  plainText: string,
  hashed: string,
): Promise<boolean> {
  return bcrypt.compare(plainText, hashed);
}

/**
 * Generates a signed JWT authentication token (expires in 7 days).
 */
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Verifies a JWT authentication token.
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Extracts and verifies the admin session from HTTP-Only cookies or Authorization header.
 * Used in serverless API routes to protect POST/PUT/DELETE mutations.
 */
export async function getAdminSession(
  req?: Request,
): Promise<JwtPayload | null> {
  // 1. Try to extract token from Authorization Header
  if (req) {
    const authHeader = req.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      const verified = verifyToken(token);
      if (verified) return verified;
    }
  }

  // 2. Try to extract token from HTTP-Only cookie
  try {
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get(TOKEN_COOKIE_NAME)?.value;
    if (cookieToken) {
      const verified = verifyToken(cookieToken);
      if (verified) return verified;
    }
  } catch (e) {
    // Next.js headers/cookies context fallback
  }

  return null;
}

export { TOKEN_COOKIE_NAME };
