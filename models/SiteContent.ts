import { Schema, model, models, Document } from "mongoose";

export interface ISiteContent extends Document {
  sectionKey: string;
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    sectionKey: { type: String, required: true, unique: true, trim: true },
    data: { type: Schema.Types.Mixed, required: true, default: {} },
  },
  { timestamps: true }
);

export default models.SiteContent || model<ISiteContent>("SiteContent", SiteContentSchema);
