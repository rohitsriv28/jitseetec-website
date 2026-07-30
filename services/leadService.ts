import { connectToDatabase } from "@/lib/db";
import Lead, { ILead } from "@/models/Lead";

export class LeadService {
  static async getAllLeads(filter: Record<string, any> = {}) {
    await connectToDatabase();
    return Lead.find(filter).sort({ createdAt: -1 }).lean();
  }

  static async createLead(data: Partial<ILead>) {
    await connectToDatabase();
    const lead = new Lead(data);
    return lead.save();
  }

  static async updateLeadStatus(
    id: string,
    status: "new" | "contacted" | "archived",
  ) {
    await connectToDatabase();
    return Lead.findByIdAndUpdate(id, { status }, { new: true }).lean();
  }

  static async deleteLead(id: string) {
    await connectToDatabase();
    return Lead.findByIdAndDelete(id).lean();
  }
}
