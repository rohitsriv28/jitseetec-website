import { connectToDatabase } from "@/lib/db";
import TeamMember, { ITeamMember } from "@/models/TeamMember";

export class TeamService {
  static async getAllTeamMembers(filter: Record<string, any> = {}) {
    await connectToDatabase();
    return TeamMember.find(filter).sort({ order: 1, createdAt: 1 }).lean();
  }

  static async getTeamMemberById(id: string) {
    await connectToDatabase();
    return TeamMember.findById(id).lean();
  }

  static async createTeamMember(data: Partial<ITeamMember>) {
    await connectToDatabase();
    const member = new TeamMember(data);
    return member.save();
  }

  static async updateTeamMember(id: string, data: Partial<ITeamMember>) {
    await connectToDatabase();
    return TeamMember.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static async deleteTeamMember(id: string) {
    await connectToDatabase();
    return TeamMember.findByIdAndDelete(id).lean();
  }
}
