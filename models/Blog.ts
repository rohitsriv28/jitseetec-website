import { Schema, model, models, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  excerpt: string;
  content: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    linkedin?: string;
    bio?: string;
  };
  tags: string[];
  status: "published" | "draft";
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: { type: String, required: true, default: "Web Development" },
    coverImage: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    readTime: { type: String, default: "5 min read" },
    author: {
      name: { type: String, default: "Rohit Kumar" },
      role: { type: String, default: "Senior Developer" },
      avatar: { type: String, default: "/images/rohit_kumar_author.png" },
      linkedin: { type: String, default: "https://linkedin.com" },
      bio: {
        type: String,
        default: "Passionate full-stack developer & tech writer.",
      },
    },
    tags: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

BlogSchema.index({ category: 1 });

export default models.Blog || model<IBlog>("Blog", BlogSchema);
