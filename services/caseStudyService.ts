import { connectToDatabase } from "@/lib/db";
import CaseStudy, { ICaseStudy } from "@/models/CaseStudy";
import { slugify } from "./blogService";

export class CaseStudyService {
  /**
   * Retrieves all case studies (optionally filtered by status).
   */
  static async getAllCaseStudies(filter: Record<string, any> = {}) {
    await connectToDatabase();
    return CaseStudy.find(filter).sort({ createdAt: -1 }).lean();
  }

  /**
   * Retrieves a single case study by slug.
   */
  static async getCaseStudyBySlug(slug: string) {
    await connectToDatabase();
    return CaseStudy.findOne({ slug }).lean();
  }

  /**
   * Retrieves a single case study by ID.
   */
  static async getCaseStudyById(id: string) {
    await connectToDatabase();
    return CaseStudy.findById(id).lean();
  }

  /**
   * Creates a new case study.
   */
  static async createCaseStudy(data: Partial<ICaseStudy>) {
    await connectToDatabase();

    if (!data.slug && data.title) {
      data.slug = slugify(data.title);
    }

    const existing = await CaseStudy.findOne({ slug: data.slug });
    if (existing) {
      data.slug = `${data.slug}-${Date.now()}`;
    }

    const caseStudy = new CaseStudy(data);
    return caseStudy.save();
  }

  /**
   * Updates an existing case study by ID.
   */
  static async updateCaseStudy(id: string, data: Partial<ICaseStudy>) {
    await connectToDatabase();

    return CaseStudy.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  /**
   * Deletes a case study by ID.
   */
  static async deleteCaseStudy(id: string) {
    await connectToDatabase();
    return CaseStudy.findByIdAndDelete(id).lean();
  }
}
