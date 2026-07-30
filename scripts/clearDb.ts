import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// Load .env file natively if present
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  for (const line of envConfig.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts.join("=").trim();
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = value;
      }
    }
  }
}

let MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jitseetec";

if (MONGODB_URI.includes("mongodb://") && MONGODB_URI.includes("mongodb.net")) {
  const match = MONGODB_URI.match(
    /^mongodb:\/\/([^:]+):([^@]+)@(?:[^\.]+\.)+([^\/]+)\/([^?]+)/
  );
  if (match) {
    const [, user, pass, domain, dbName] = match;
    MONGODB_URI = `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${domain}/${dbName}?retryWrites=true&w=majority`;
  }
}

// Collections to clear (all except 'users')
const COLLECTIONS_TO_CLEAR = [
  "blogs",
  "casestudies",
  "leads",
  "projects",
  "sitecontents",
  "stats",
  "teammembers",
  "testimonials",
];

async function clearDb() {
  console.log("🧹 Starting JitSeeTec Database Clear...");
  console.log("⚠️  This will delete ALL data except Admin Users.\n");

  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
    console.log("✅ Connected to MongoDB.\n");
  } catch (err: any) {
    console.error("❌ Connection failed:", err.message);
    process.exit(1);
  }

  const db = mongoose.connection.db;
  if (!db) {
    console.error("❌ No database connection.");
    process.exit(1);
  }

  // List actual collections present in DB
  const existingCollections = await db.listCollections().toArray();
  const existingNames = existingCollections.map((c) => c.name.toLowerCase());

  for (const col of COLLECTIONS_TO_CLEAR) {
    if (existingNames.includes(col.toLowerCase())) {
      const result = await db.collection(col).deleteMany({});
      console.log(`  🗑️  ${col}: deleted ${result.deletedCount} document(s)`);
    } else {
      console.log(`  ⏭️  ${col}: not found, skipping`);
    }
  }

  // Confirm users collection is untouched
  const userCount = await db.collection("users").countDocuments();
  console.log(`\n🔒 users collection: ${userCount} admin user(s) preserved`);

  console.log("\n✅ Database cleared successfully (admin users kept)!");
  await mongoose.disconnect();
  process.exit(0);
}

clearDb().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
