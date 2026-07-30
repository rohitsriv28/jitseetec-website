import { Schema, model, models, Document } from "mongoose";

export interface ITestimonial extends Document {
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  order: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    author: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    quote: { type: String, required: true, trim: true },
    avatar: { type: String, default: "" },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default models.Testimonial ||
  model<ITestimonial>("Testimonial", TestimonialSchema);
