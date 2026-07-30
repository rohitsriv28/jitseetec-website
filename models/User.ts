import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "editor";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false }, // Exclude by default for security
    role: { type: String, enum: ["admin", "editor"], default: "admin" },
    avatar: { type: String, default: "" },
  },
  { timestamps: true },
);

export default models.User || model<IUser>("User", UserSchema);
