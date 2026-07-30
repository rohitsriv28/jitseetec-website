import { Schema, model, models, Document } from "mongoose";

export interface ICaseStudyMetric {
  val: string;
  label: string;
}

export interface ICaseStudy extends Document {
  title: string;
  slug: string;
  client: string;
  industry: string;
  services: string;
  duration: string;
  year: string;
  coverImage: string;
  liveUrl?: string;
  metrics: ICaseStudyMetric[];
  challenge: string;
  objectives: string[];
  researchText: string;
  researchImage?: string;
  strategyPoints: string[];
  designPoints: string[];
  devPoints: string[];
  keyFeatures: string[];
  techStack: { name: string; iconKey: string }[];
  timeline: { step: string; time: string }[];
  screenshots: { title: string; img: string }[];
  beforeAfter: {
    beforeTitle: string;
    beforePoints: string[];
    afterTitle: string;
    afterPoints: string[];
  };
  resultsText: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
  lessonsLearned: string[];
  status: "published" | "draft";
  createdAt: Date;
  updatedAt: Date;
}

const CaseStudySchema = new Schema<ICaseStudy>(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    client: { type: String, required: true },
    industry: { type: String, required: true },
    services: { type: String, required: true },
    duration: { type: String, default: "4 Months" },
    year: { type: String, default: "2024" },
    coverImage: { type: String, required: true },
    liveUrl: { type: String, default: "" },
    metrics: [
      {
        val: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
    challenge: { type: String, required: true },
    objectives: [{ type: String }],
    researchText: { type: String },
    researchImage: { type: String },
    strategyPoints: [{ type: String }],
    designPoints: [{ type: String }],
    devPoints: [{ type: String }],
    keyFeatures: [{ type: String }],
    techStack: [
      {
        name: { type: String, required: true },
        iconKey: { type: String, required: true },
      },
    ],
    timeline: [
      {
        step: { type: String, required: true },
        time: { type: String, required: true },
      },
    ],
    screenshots: [
      {
        title: { type: String },
        img: { type: String, required: true },
      },
    ],
    beforeAfter: {
      beforeTitle: { type: String, default: "Before (Legacy Process)" },
      beforePoints: [{ type: String }],
      afterTitle: { type: String, default: "After (SwiftCare Platform)" },
      afterPoints: [{ type: String }],
    },
    resultsText: { type: String },
    testimonial: {
      quote: { type: String },
      author: { type: String },
      role: { type: String },
      avatar: { type: String },
    },
    lessonsLearned: [{ type: String }],
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  { timestamps: true },
);

export default models.CaseStudy ||
  model<ICaseStudy>("CaseStudy", CaseStudySchema);
