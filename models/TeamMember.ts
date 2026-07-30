import { Schema, model, models, Document } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  role: string;
  initials: string;
  avatar?: string;
  bio?: string;
  linkedin: string;
  order: number;
  isLeadership: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    initials: { type: String, required: true, trim: true },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    linkedin: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isLeadership: { type: Boolean, default: false },
  },
  { timestamps: true },
);

TeamMemberSchema.index({ order: 1 });

export default models.TeamMember ||
  model<ITeamMember>("TeamMember", TeamMemberSchema);
