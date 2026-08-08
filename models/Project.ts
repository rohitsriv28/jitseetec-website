import { Schema, model, models, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  category:
    | "Web Development"
    | "Mobile Apps"
    | "UI/UX Design"
    | "Custom Software";
  industry: string;
  image: string;
  desc: string;
  tags: string[];
  clientName?: string;
  projectUrl?: string;
  caseStudySlug?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        "Web Development",
        "Mobile Apps",
        "UI/UX Design",
        "Custom Software",
      ],
      required: true,
    },
    industry: { type: String, required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true },
    tags: [{ type: String, trim: true }],
    clientName: { type: String },
    projectUrl: { type: String },
    caseStudySlug: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

ProjectSchema.index({ category: 1 });

export default models.Project || model<IProject>("Project", ProjectSchema);
