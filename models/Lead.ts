import { Schema, model, models, Document } from "mongoose";

export interface ILead extends Document {
  fullName: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  status: "new" | "contacted" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: "" },
    service: { type: String, default: "General Inquiry" },
    budget: { type: String, default: "Not specified" },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "contacted", "archived"],
      default: "new",
    },
  },
  { timestamps: true },
);

LeadSchema.index({ createdAt: -1 });

export default models.Lead || model<ILead>("Lead", LeadSchema);
