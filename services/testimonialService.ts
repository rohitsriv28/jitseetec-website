import { connectToDatabase } from "@/lib/db";
import Testimonial, { ITestimonial } from "@/models/Testimonial";
import Stat, { IStat } from "@/models/Stat";

export class TestimonialService {
  static async getAllTestimonials(filter: Record<string, any> = {}) {
    await connectToDatabase();
    return Testimonial.find(filter).sort({ order: 1, createdAt: -1 }).lean();
  }

  static async createTestimonial(data: Partial<ITestimonial>) {
    await connectToDatabase();
    const item = new Testimonial(data);
    return item.save();
  }

  static async updateTestimonial(id: string, data: Partial<ITestimonial>) {
    await connectToDatabase();
    return Testimonial.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static async deleteTestimonial(id: string) {
    await connectToDatabase();
    return Testimonial.findByIdAndDelete(id).lean();
  }
}

export class StatService {
  static async getAllStats() {
    await connectToDatabase();
    return Stat.find({}).sort({ order: 1 }).lean();
  }

  static async updateStat(id: string, data: Partial<IStat>) {
    await connectToDatabase();
    return Stat.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static async createStat(data: Partial<IStat>) {
    await connectToDatabase();
    const stat = new Stat(data);
    return stat.save();
  }
}
