import { Schema, model, models, Document } from "mongoose";

export interface IStat extends Document {
  label: string;
  val: string;
  iconName: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const StatSchema = new Schema<IStat>(
  {
    label: { type: String, required: true, trim: true },
    val: { type: String, required: true, trim: true },
    iconName: { type: String, default: "Rocket" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default models.Stat || model<IStat>("Stat", StatSchema);
